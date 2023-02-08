import JsonServer from 'json-server'
import {Faker} from "./faker/Faker.js";
import {faker} from "@faker-js/faker";
import cors from 'cors'
import {otpGenerator} from "./helper/opt_generator.js";
import {sendMail} from "./helper/email_sender.js";
import {emailConfig} from "./mail_config.js";

const server = JsonServer.create()
const router = JsonServer.router('db.json')
const middlewares = JsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/showtime/:movieId/:cinemaId/:date', (req, res) => {
    let types = ['2D', 'Max']
    let [movieId, cinemaId, date] = [req.params.movieId, req.params.cinemaId, req.params.date]
    let showTimes = Faker.fakeShowTime(cinemaId, date, types[0], movieId).concat(Faker.fakeShowTime(cinemaId, date, types[1], movieId))
    res.jsonp(showTimes)
})

server.get('/mail/verify/:to', (req, res) => {
    const [to] = [req.params.to]
    const otp = otpGenerator(6)
    let subject = "[Kan Movie] Your email valid otp!"
    let title = `Hi ${to},\n Your otp is  ${otp}.\n Thank!`
    let option = emailConfig(to,title,subject)
    sendMail(option)
    res.jsonp({opt: otp})
})

server.get("/date", (req, res) => {
    let stillDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate()
    let dates = [{
        id: faker.datatype.uuid(),
        date: new Date(new Date().setDate(new Date().getDate())).toString(),
        day: new Date(new Date().setDate(new Date().getDate())).getDate()
    }]
    Array.from(new Array(stillDate)).forEach((val, index) => {
        dates.push({
            id: faker.datatype.uuid(),
            date: new Date(new Date().setDate(new Date().getDate() + index + 1)).toString(),
            day: new Date(new Date().setDate(new Date().getDate() + index + 1)).getDate(),
        })
    })
    res.jsonp(dates)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(JsonServer.bodyParser)
server.use(cors())
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})
