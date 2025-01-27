import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(
  cors({
    origin: [
      "https://www.ewmdev.com",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur d'envoi d'emails !");
});

app.post("/send-email", async (req, res) => {
  const { nom, prenom, email, message } = req.body;

  if (!nom || !prenom || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"${prenom} ${nom} <${email}>"`,
    to: "maregaerwan@gmail.com",
    subject: `Message de ${prenom} ${nom}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email envoyé par ${prenom} ${nom} (${email})`);
    res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error.message);
    res
      .status(500)
      .json({ error: "Erreur interne du serveur. Veuillez réessayer plus tard." });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
