import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

interface EmailRequest {
    name: string;
    email: string;
    phone: string;
    aparelho: string;
}

app.post('/send-email', async (req: Request, res: Response) => {
    const { name, email, phone, aparelho } = req.body as EmailRequest;

    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', // Servidor SMTP do Outlook
        port: 587, // Porta do servidor SMTP do Outlook
        secure: false, // true para TLS, false para outra coisa
        auth: {
            user: process.env.EMAIL_USER, // Seu endereço de e-mail do Outlook
            pass: process.env.EMAIL_PASS // Sua senha do Outlook
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.DESTINATION_EMAIL, // Seu e-mail de destino
        subject: 'Novo Agendamento',
        text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nAparelho: ${aparelho}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Email enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).send('Erro ao enviar email.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
