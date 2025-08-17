const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/contacto', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.CORREO_RECEPTOR, // Variable de entorno
      pass: process.env.CORREO_PASS      // Variable de entorno
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.CORREO_RECEPTOR,
    subject: 'Nuevo mensaje de contacto',
    text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ ok: true, mensaje: 'Mensaje enviado correctamente' });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al enviar el mensaje' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Backend escuchando en puerto', PORT)); 