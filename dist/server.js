var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_dotenv = __toESM(require("dotenv"));
var import_express = __toESM(require("express"));
var import_nodemailer = __toESM(require("nodemailer"));
var import_body_parser = __toESM(require("body-parser"));
var import_cors = __toESM(require("cors"));
import_dotenv.default.config();
var app = (0, import_express.default)();
var port = process.env.PORT || 3001;
app.use((0, import_cors.default)());
app.use(import_body_parser.default.json());
app.use(import_body_parser.default.urlencoded({ extended: true }));
var createTransporter = () => {
  return import_nodemailer.default.createTransport({
    host: "smtp-mail.outlook.com",
    // Servidor SMTP do Outlook
    port: 587,
    // Porta do servidor SMTP do Outlook
    secure: false,
    // true para TLS, false para outra coisa
    auth: {
      user: process.env.EMAIL_USER,
      // Seu endereço de e-mail do Outlook
      pass: process.env.EMAIL_PASS
      // Sua senha do Outlook
    }
  });
};
var sendEmailWithDelay = (transporter, mailOptions, res) => {
  setTimeout(async () => {
    try {
      await transporter.sendMail(mailOptions);
      res.send("Email enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      res.status(500).send("Erro ao enviar email.");
    }
  }, 5 * 60 * 1e3);
};
app.post("/send-email-lg", async (req, res) => {
  const { name, email, phone, aparelho } = req.body;
  const transporter = createTransporter();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.DESTINATION_EMAIL,
    // Seu e-mail de destino
    subject: "Novo Agendamento LG",
    text: `Nome: ${name}
E-mail: ${email}
Telefone: ${phone}
Aparelho: ${aparelho}`
  };
  sendEmailWithDelay(transporter, mailOptions, res);
});
app.post("/complete-appointment-lg", async (req, res) => {
  const {
    idNumber,
    cep,
    address,
    complement,
    number,
    neighborhood,
    city,
    defect,
    usage,
    visitDate,
    visitPeriod
  } = req.body;
  const transporter = createTransporter();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.DESTINATION_EMAIL,
    // Seu e-mail de destino
    subject: "Dados do Atendimento LG",
    text: `N\xFAmero de Atendimento: ${idNumber}
CEP: ${cep}
Endere\xE7o: ${address}
Complemento: ${complement}
N\xFAmero: ${number}
Bairro: ${neighborhood}
Cidade: ${city}
Defeito: ${defect}
Uso: ${usage}
Data da Visita: ${visitDate}
Per\xEDodo da Visita: ${visitPeriod}`
  };
  sendEmailWithDelay(transporter, mailOptions, res);
});
app.post("/send-email-samsung", async (req, res) => {
  const { name, email, phone, aparelho } = req.body;
  const transporter = createTransporter();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.DESTINATION_EMAIL,
    // Seu e-mail de destino
    subject: "Novo Agendamento Samsung",
    text: `Nome: ${name}
E-mail: ${email}
Telefone: ${phone}
Aparelho: ${aparelho}`
  };
  sendEmailWithDelay(transporter, mailOptions, res);
});
app.post("/complete-appointment-samsung", async (req, res) => {
  const {
    idNumber,
    cep,
    address,
    complement,
    number,
    neighborhood,
    city,
    defect,
    usage,
    visitDate,
    visitPeriod
  } = req.body;
  const transporter = createTransporter();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.DESTINATION_EMAIL,
    // Seu e-mail de destino
    subject: "Dados do Atendimento Samsung",
    text: `N\xFAmero de Atendimento: ${idNumber}
CEP: ${cep}
Endere\xE7o: ${address}
Complemento: ${complement}
N\xFAmero: ${number}
Bairro: ${neighborhood}
Cidade: ${city}
Defeito: ${defect}
Uso: ${usage}
Data da Visita: ${visitDate}
Per\xEDodo da Visita: ${visitPeriod}`
  };
  sendEmailWithDelay(transporter, mailOptions, res);
});
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
