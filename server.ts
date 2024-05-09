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

// Função para criar um novo transporte de e-mail
const createTransporter = () => {
    return nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', // Servidor SMTP do Outlook
        port: 587, // Porta do servidor SMTP do Outlook
        secure: false, // true para TLS, false para outra coisa
        auth: {
            user: process.env.EMAIL_USER, // Seu endereço de e-mail do Outlook
            pass: process.env.EMAIL_PASS // Sua senha do Outlook
        }
    });
};

interface EmailRequest {
    name: string;
    email: string;
    phone: string;
    aparelho: string;
}

interface EmailRequestFinalStep {
    idNumber: string;
    cep: string;
    address: string;
    complement: string;
    number: string;
    neighborhood: string;
    city: string;
    defect: string;
    usage: string; // 'sim' ou 'nao', assumindo que esses são os valores possíveis
    visitDate: string;
    visitPeriod: string;
}

// Função para enviar e-mail com um atraso de 5 minutos
const sendEmailWithDelay = (transporter: any, mailOptions: any, res: Response) => {
    setTimeout(async () => {
        try {
            await transporter.sendMail(mailOptions);
            res.send('Email enviado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            res.status(500).send('Erro ao enviar email.');
        }
    }, 5 * 60 * 1000); // 5 minutos em milissegundos
};

// Endpoint para enviar e-mail
app.post('/send-email-lg', async (req: Request, res: Response) => {
    const { name, email, phone, aparelho } = req.body as EmailRequest;

    const transporter = createTransporter(); // Criar um novo transporte de e-mail

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.DESTINATION_EMAIL, // Seu e-mail de destino
        subject: 'Novo Agendamento LG',
        text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nAparelho: ${aparelho}`
    };

    // Enviar e-mail com um atraso de 5 minutos
    sendEmailWithDelay(transporter, mailOptions, res);
});

// Endpoint para completar agendamento
app.post('/complete-appointment-lg', async (req: Request, res: Response) => {
    const {
        idNumber, cep, address, complement, number, neighborhood, city,
        defect, usage, visitDate, visitPeriod
    } = req.body as EmailRequestFinalStep;

    const transporter = createTransporter(); // Criar um novo transporte de e-mail

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.DESTINATION_EMAIL, // Seu e-mail de destino
        subject: 'Dados do Atendimento LG',
        text: `Número de Atendimento: ${idNumber}\nCEP: ${cep}\nEndereço: ${address}\nComplemento: ${complement}\nNúmero: ${number}\nBairro: ${neighborhood}\nCidade: ${city}\nDefeito: ${defect}\nUso: ${usage}\nData da Visita: ${visitDate}\nPeríodo da Visita: ${visitPeriod}`
    };

    // Enviar e-mail com um atraso de 5 minutos
    sendEmailWithDelay(transporter, mailOptions, res);
});

app.post('/send-email-samsung', async (req: Request, res: Response) => {
    const { name, email, phone, aparelho } = req.body as EmailRequest;

    const transporter = createTransporter(); // Criar um novo transporte de e-mail

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.DESTINATION_EMAIL, // Seu e-mail de destino
        subject: 'Novo Agendamento Samsung',
        text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nAparelho: ${aparelho}`
    };

    // Enviar e-mail com um atraso de 5 minutos
    sendEmailWithDelay(transporter, mailOptions, res);
});

// Endpoint para completar agendamento
app.post('/complete-appointment-samsung', async (req: Request, res: Response) => {
    const {
        idNumber, cep, address, complement, number, neighborhood, city,
        defect, usage, visitDate, visitPeriod
    } = req.body as EmailRequestFinalStep;

    const transporter = createTransporter(); // Criar um novo transporte de e-mail

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.DESTINATION_EMAIL, // Seu e-mail de destino
        subject: 'Dados do Atendimento Samsung',
        text: `Número de Atendimento: ${idNumber}\nCEP: ${cep}\nEndereço: ${address}\nComplemento: ${complement}\nNúmero: ${number}\nBairro: ${neighborhood}\nCidade: ${city}\nDefeito: ${defect}\nUso: ${usage}\nData da Visita: ${visitDate}\nPeríodo da Visita: ${visitPeriod}`
    };

    // Enviar e-mail com um atraso de 5 minutos
    sendEmailWithDelay(transporter, mailOptions, res);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
