require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Yandex',
    auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_SECRET,
    },
});

const createUserConfirmationOrderEmail = async ({ _id, email }) => {

    const mail = await transporter.sendMail({
        from: `"IGWT delivery" <shop@mygameshop.ru>`,
        to: `${email}`,
        subject: "Подтверждение заказа",
        text: `Ваш заказ с номером  ${_id} подтвержден`,
        html: `
      <ul class="list-group">
        <li class="list-group-item"> Ghost of Fuji - 59$ </li>
        <li class="list-group-item"> Last of Them 7 - 49$ </li>
      </ul>
    `,
    });

    return mail

}

const createAdminConfirmationOrderEmail = async ({ _id, address, fullname, phone }, adminEmail = 'ararat@incodewetrust.ru',) => {

    const mail = await transporter.sendMail({
        from: `"IGWT delivery" <shop@mygameshop.ru>`,
        to: `${adminEmail}`,
        subject: "У вас новый заказ",
        text: `Создан заказ с номером  ${_id}`,
        html: `
      <h2>Новый заказ с номером ${_id}</h2>

      <ul>
        <li> Имя - ${fullname}  </li>
        <li> Адрес - ${address}  </li>
        <li> Телефон - ${phone}  </li>
      </ul>
    `,
    });

    return mail

}

module.exports = {
    createUserConfirmationOrderEmail,
    createAdminConfirmationOrderEmail
}