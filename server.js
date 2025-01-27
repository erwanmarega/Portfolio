import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware CORS avec vérification des origines
const allowedOrigins = [
  "https://www.ewmdev.com", // Domaine de production
  "http://localhost:5173", // Domaine pour les tests locaux
];

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
    credentials: true, // Autorise les cookies et les sessions si nécessaire
  })
);

app.use(express.json());

// Route par défaut
app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur d'envoi d'emails !");
});

// Route pour envoyer un email
app.post("/send-email", async (req, res) => {
  const { nom, prenom, email, message } = req.body;

  // Validation des champs
  if (!nom || !prenom || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  try {
    // Configuration du transporteur Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER, // Votre email
        pass: process.env.PASS, // Mot de passe ou App Password
      },
    });

    // Options de l'email
    const mailOptions = {
      from: process.env.USER, // Email de l'expéditeur
      to: process.env.USER, // Email du destinataire
      subject: "Nouveau message de contact",
      text: `Nom: ${nom}\nPrénom: ${prenom}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Envoi de l'email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé: " + info.response);
    res.status(200).json({ message: "Email envoyé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }
});

// Middleware pour gérer les erreurs CORS
app.use((err, req, res, next) => {
  if (err.message === "Origine non autorisée par CORS") {
    console.error(err.message);
    res.status(403).json({ error: "Accès refusé par CORS." });
  } else {
    next(err);
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
