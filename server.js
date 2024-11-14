import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;




app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur d\'envoi d\'emails !');
});

app.post('/send-email', async (req, res) => {
    const { nom, prenom, email, message } = req.body;

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
        res.status(200).send('Email envoyé avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error.message);
        res.status(500).send('Erreur lors de l\'envoi de l\'e-mail.');
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
