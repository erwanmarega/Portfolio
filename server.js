import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['https://localhost:5173', 'https://portfolio-j2wv9px5i-erwanmaregas-projects.vercel.app/'], 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur d\'envoi d\'emails !');
});

app.post('/send-email', async (req, res) => {
    const { nom, prenom, email, message } = req.body;

    if (!nom || !prenom || !email || !message) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        }
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
        console.error('Erreur lors de l\'envoi de l\'email:', error.message);

        if (process.env.NODE_ENV === 'production') {
            res.status(500).json({ error: 'Erreur interne du serveur.' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
