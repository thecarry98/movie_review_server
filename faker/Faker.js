import Showtime from "./Showtime.js";

export const Faker = {
    fakeShowTime: function (cinemaId, date, types, movieId) {
        let count = Math.round(Math.random() * (6 - 3) + 3)
        return Array.from(new Array(count)).map(() => {
            return new Showtime(types, movieId, cinemaId, date)
        })
    }
}
