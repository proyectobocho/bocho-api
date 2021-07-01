"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
var nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'proyectobocho@gmail.com',
        pass: 'yplegsocboxiqiaz',
    },
});
exports.transporter.verify().then(function () {
    console.log('Listo para enviar emails');
});
//# sourceMappingURL=mailer.js.map