import Nodemailer from 'nodemailer'

export const sendMail = (option) => {
    let transporter = Nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dangkhanh.dev@gmail.com',
            pass: 'khjmhonpsrlonqvd'
        }
    })
    transporter.sendMail(option, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}
