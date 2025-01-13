import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000; // Render attribue automatiquement le port via process.env.PORT

// Configuration de CORS
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://portfolio-j2wv9px5i-erwanmaregas-projects.vercel.app'], // Autoriser uniquement les domaines spécifiques
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

// Middleware pour analyser le JSON dans les requêtes
app.use(express.json());

// Route de test pour vérifier si le serveur fonctionne
app.get('/', (req, res) => {
  res.send("Bienvenue sur le serveur d'envoi d'emails !");
});

// Route pour envoyer un email
app.post('/send-email', async (req, res) => {
  const { nom, prenom, email, message } = req.body;

  // Validation des champs
  if (!nom || !prenom || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  // Configuration de Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER, // Adresse Gmail
      pass: process.env.PASS, // Mot de passe ou mot de passe d'application
    },
  });

  const mailOptions = {
    from: email,
    to: 'maregaerwan@gmail.com',
    subject: `Message de ${prenom} ${nom}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email envoyé avec succès !' });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error.message);
    res.status(500).json({ error: "Erreur interne du serveur. Veuillez réessayer plus tard." });
  }
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
