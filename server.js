import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const PORT = process.env.PORT || 10000;

// Backward-compatible: prefer GMAIL_* but fall back to old USER/PASS.
const GMAIL_USER = process.env.GMAIL_USER || process.env.USER;
const GMAIL_PASS = process.env.GMAIL_PASS || process.env.PASS;

if (!GMAIL_USER || !GMAIL_PASS) {
  console.error("Erreur: GMAIL_USER / GMAIL_PASS manquants dans l'environnement.");
  process.exit(1);
}

const allowedOrigins = [
  "https://www.ewmdev.com",
  "http://localhost:5173",
];

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

const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de requêtes. Réessayez plus tard." },
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur d'envoi d'emails !");
});

app.post("/send-email", emailLimiter, async (req, res) => {
  const nom = String(req.body?.nom ?? "").trim();
  const prenom = String(req.body?.prenom ?? "").trim();
  const email = String(req.body?.email ?? "").trim();
  const message = String(req.body?.message ?? "").trim();

  if (!nom || !prenom || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "Adresse email invalide." });
  }
  if (nom.length > 100 || prenom.length > 100 || email.length > 254 || message.length > 5000) {
    return res.status(400).json({ error: "Un ou plusieurs champs sont trop longs." });
  }

  try {
    const info = await transporter.sendMail({
      from: GMAIL_USER,
      to: GMAIL_USER,
      replyTo: email,
      subject: `Nouveau message de contact — ${prenom} ${nom}`,
      text: `Nom: ${nom}\nPrénom: ${prenom}\nEmail: ${email}\nMessage: ${message}`,
    });
    console.log("Email envoyé:", info.messageId);
    res.status(200).json({ message: "Email envoyé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }
});

app.use((err, req, res, next) => {
  if (err.message === "Origine non autorisée par CORS") {
    console.error(err.message);
    return res.status(403).json({ error: "Accès refusé par CORS." });
  }
  console.error(err);
  res.status(500).json({ error: "Erreur serveur." });
});

const server = app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
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
