import nodemailer = require('nodemailer')
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'proyectobocho@gmail.com', // generated ethereal user
        pass: 'yplegsocboxiqiaz', // generated ethereal password
    },
});

transporter.verify().then(() => {
    console.log('Listo para enviar emails');
})