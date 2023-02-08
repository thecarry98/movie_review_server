import {faker} from "@faker-js/faker";

export default class Showtime {

    constructor(type, movieId, cinemaId, date) {
        let stillDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate()
        this.id = faker.datatype.uuid();
        this.time = faker.date.soon(stillDay);
        this.hours = this.time.getUTCHours() < 7 ? this.time.getUTCHours() + 12 : this.time.getUTCHours();
        this.minute = this.time.getMinutes()
        this.type = type
        this.movieId = movieId
        this.cinameId = cinemaId
        this.date = date
    }
}