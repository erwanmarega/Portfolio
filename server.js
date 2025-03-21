import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

const allowedOrigins = [
  "https://www.ewmdev.com", 
  "http://localhost:5173", 
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
    credentials: true, 
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur d'envoi d'emails !");
});

app.post("/send-email", async (req, res) => {
  const { nom, prenom, email, message } = req.body;

  if (!nom || !prenom || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS, 
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: process.env.USER, 
      subject: "Nouveau message de contact",
      text: `Nom: ${nom}\nPrénom: ${prenom}\nEmail: ${email}\nMessage: ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé: " + info.response);
    res.status(200).json({ message: "Email envoyé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }
});

app.use((err, req, res, next) => {
  if (err.message === "Origine non autorisée par CORS") {
    console.error(err.message);
    res.status(403).json({ error: "Accès refusé par CORS." });
  } else {
    next(err);
  }
});


app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
