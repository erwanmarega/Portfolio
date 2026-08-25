import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Charge les variables d'environnement AVANT toute autre initialisation.
dotenv.config();

const PORT = process.env.PORT || 10000;
const NODE_ENV = process.env.NODE_ENV || "development";

// ---------------------------------------------------------------------------
// Configuration SMTP
// ---------------------------------------------------------------------------

// Rétrocompatibilité : préfère GMAIL_* mais accepte les anciens USER/PASS.
const GMAIL_USER = process.env.GMAIL_USER || process.env.USER;
const GMAIL_PASS = process.env.GMAIL_PASS || process.env.PASS;

if (!GMAIL_USER || !GMAIL_PASS) {
  console.error("Erreur: GMAIL_USER / GMAIL_PASS manquants dans l'environnement.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Origines autorisées
// ---------------------------------------------------------------------------

const allowedOrigins = [
  "https://www.ewmdev.com",
  "http://localhost:5173",
  "http://localhost:5174",
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

// ---------------------------------------------------------------------------
// Transporter Nodemailer
// ---------------------------------------------------------------------------

const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.error("Connexion SMTP échouée:", err.message);
  } else {
    console.log("Serveur SMTP prêt.");
  }
});

// ---------------------------------------------------------------------------
// Express & middlewares
// ---------------------------------------------------------------------------

const app = express();

app.disable("x-powered-by");
app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origine non autorisée par CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));

// Simple logging des requêtes entrantes.
app.use((req, _res, next) => {
  const ip = req.ip || req.socket.remoteAddress || "inconnu";
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} — IP: ${ip}`);
  next();
});

// ---------------------------------------------------------------------------
// Rate limiting
// ---------------------------------------------------------------------------

// Limiter global par IP : 5 emails / 15 min.
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip || req.socket.remoteAddress || "global",
  handler: (_req, res) => {
    res.status(429).json({ error: "Trop de requêtes. Réessayez dans 15 minutes." });
  },
});

// Stockage en mémoire pour le rate limiting par email (10 emails / heure).
const emailSendTracker = new Map();
const EMAIL_RATE_WINDOW_MS = 60 * 60 * 1000;
const EMAIL_RATE_MAX = 10;

const checkEmailRateLimit = (email) => {
  const now = Date.now();
  const record = emailSendTracker.get(email);

  if (!record || now - record.firstAttempt > EMAIL_RATE_WINDOW_MS) {
    emailSendTracker.set(email, { count: 1, firstAttempt: now });
    return { allowed: true };
  }

  if (record.count >= EMAIL_RATE_MAX) {
    const retryAfterMs = EMAIL_RATE_WINDOW_MS - (now - record.firstAttempt);
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
    };
  }

  record.count += 1;
  emailSendTracker.set(email, record);
  return { allowed: true };
};

// ---------------------------------------------------------------------------
// Validation & sanitization
// ---------------------------------------------------------------------------

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Supprime les caractères dangereux pour les headers et tronque proprement.
const sanitizeString = (value, maxLength) => {
  let cleaned = String(value ?? "")
    .replace(/[\r\n]/g, " ") // empêche l'injection de headers
    .replace(/[<>]/g, "") // retire < > pour éviter le HTML brut
    .trim();
  return cleaned.slice(0, maxLength);
};

const validateContactPayload = (body) => {
  const nom = sanitizeString(body?.nom, 100);
  const prenom = sanitizeString(body?.prenom, 100);
  const email = sanitizeString(body?.email, 254).toLowerCase();
  const message = sanitizeString(body?.message, 5000);

  const errors = [];

  if (!nom) errors.push("Le nom est obligatoire.");
  if (!prenom) errors.push("Le prénom est obligatoire.");
  if (!email) {
    errors.push("L'email est obligatoire.");
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push("L'adresse email n'est pas valide.");
  }
  if (!message) errors.push("Le message est obligatoire.");
  if (message.length < 10) errors.push("Le message doit contenir au moins 10 caractères.");

  return { nom, prenom, email, message, errors };
};

// ---------------------------------------------------------------------------
// Templates d'emails
// ---------------------------------------------------------------------------

const escapeHtml = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const ownerEmailTemplate = ({ prenom, nom, email, message, ip, userAgent }) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau message de contact</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #f3f2ff; margin: 0; padding: 40px 20px; color: #111827; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
    .header { background: linear-gradient(135deg, #2563eb, #9333ea); padding: 32px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; }
    .content { padding: 32px; }
    .field { margin-bottom: 20px; }
    .field-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 6px; font-weight: 600; }
    .field-value { font-size: 16px; color: #111827; line-height: 1.5; }
    .message-box { background: #f9fafb; border-left: 4px solid #2563eb; padding: 16px; border-radius: 8px; white-space: pre-wrap; }
    .meta { margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nouveau message de contact</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="field-label">Nom</div>
        <div class="field-value">${escapeHtml(nom)} ${escapeHtml(prenom)}</div>
      </div>
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value">${escapeHtml(email)}</div>
      </div>
      <div class="field">
        <div class="field-label">Message</div>
        <div class="message-box">${escapeHtml(message)}</div>
      </div>
      <div class="meta">
        <div>IP : ${escapeHtml(ip)}</div>
        <div>User-Agent : ${escapeHtml(userAgent)}</div>
      </div>
    </div>
  </div>
</body>
</html>
`;

const senderConfirmationTemplate = ({ prenom }) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message bien reçu</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #f3f2ff; margin: 0; padding: 40px 20px; color: #111827; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); text-align: center; }
    .header { background: linear-gradient(135deg, #2563eb, #9333ea); padding: 40px 32px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
    .content { padding: 40px 32px; }
    .content p { font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 16px; }
    .footer { padding: 24px; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Message bien reçu</h1>
    </div>
    <div class="content">
      <p>Bonjour ${escapeHtml(prenom)},</p>
      <p>Merci pour votre message. Je l'ai bien reçu et je vous répondrai dans les plus brefs délais.</p>
      <p>À très bientôt,<br><strong>Erwan Marega</strong></p>
    </div>
    <div class="footer">
      Ce message est une confirmation automatique. Merci de ne pas y répondre directement.
    </div>
  </div>
</body>
</html>
`;

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

app.get("/", (_req, res) => {
  res.json({ status: "ok", env: NODE_ENV, timestamp: new Date().toISOString() });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", smtp: transporter.isIdle ? "idle" : "busy" });
});

app.post("/send-email", emailLimiter, async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || "inconnu";
  const userAgent = req.headers["user-agent"] || "inconnu";

  const { nom, prenom, email, message, errors } = validateContactPayload(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(" ") });
  }

  const emailRate = checkEmailRateLimit(email);
  if (!emailRate.allowed) {
    return res.status(429).json({
      error: `Trop de messages envoyés depuis cette adresse. Réessayez dans ${emailRate.retryAfterSeconds} secondes.`,
    });
  }

  try {
    // Email reçu par le propriétaire du portfolio.
    const ownerMail = await transporter.sendMail({
      from: `"Portfolio Erwan Marega" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: `"${prenom} ${nom}" <${email}>`,
      subject: `Nouveau message de contact — ${prenom} ${nom}`,
      text: `Nom: ${nom}\nPrénom: ${prenom}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: ownerEmailTemplate({ prenom, nom, email, message, ip, userAgent }),
    });

    // Accusé de réception à l'expéditeur.
    await transporter.sendMail({
      from: `"Erwan Marega" <${GMAIL_USER}>`,
      to: email,
      subject: "Votre message a bien été envoyé",
      text: `Bonjour ${prenom},\n\nMerci pour votre message. Je l'ai bien reçu et je vous répondrai dans les plus brefs délais.\n\nÀ très bientôt,\nErwan Marega`,
      html: senderConfirmationTemplate({ prenom }),
    });

    console.log(`Email envoyé par ${email} — ID: ${ownerMail.messageId}`);
    res.status(200).json({ message: "Email envoyé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);

    // En cas d'erreur SMTP, on réinitialise le compteur pour permettre un nouvel essai.
    const record = emailSendTracker.get(email);
    if (record) {
      record.count = Math.max(0, record.count - 1);
      emailSendTracker.set(email, record);
    }

    res.status(500).json({ error: "Erreur lors de l'envoi de l'email. Veuillez réessayer plus tard." });
  }
});

// ---------------------------------------------------------------------------
// Gestion des erreurs
// ---------------------------------------------------------------------------

app.use((err, _req, res, _next) => {
  if (err.message === "Origine non autorisée par CORS") {
    console.error(err.message);
    return res.status(403).json({ error: "Accès refusé par CORS." });
  }
  console.error(err);
  res.status(500).json({ error: "Erreur serveur." });
});

// ---------------------------------------------------------------------------
// Démarrage
// ---------------------------------------------------------------------------

const server = app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT} (${NODE_ENV})`);
});

const shutdown = () => {
  console.log("Arrêt du serveur...");
  server.close(() => {
    transporter.close();
    process.exit(0);
  });
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
