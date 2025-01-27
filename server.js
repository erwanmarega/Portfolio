import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Configuration de CORS
app.use(
  cors({
    origin: [
      "https://www.ewmdev.com", // URL de votre front-end
      "http://localhost:5173", // Front-end en mode développement
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // Si vous utilisez des cookies ou des sessions
  })
);

// Middleware pour parser le JSON
app.use(express.json());

// Endpoint racine
app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur d'envoi d'emails !");
});

// Endpoint pour envoyer un email
app.post("/send-email", async (req, res) => {
  const { nom, prenom, email, message } = req.body;

  // Validation des champs
  if (!nom || !prenom || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  try {
    // Configuration du transporteur Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // Utilisation de Gmail
      auth: {
        user: process.env.USER, // Adresse email configurée dans vos variables d'environnement
        pass: process.env.PASS, // Mot de passe ou App Password
      },
    });

    // Options pour l'email
    const mailOptions = {
      from: process.env.USER, // Expéditeur
      to: process.env.USER, // Destinataire (votre propre adresse email)
      subject: `Nouveau message de ${prenom} ${nom}`,
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

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
