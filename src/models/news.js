const mysql = require('../lib/mysql');

const getAllNews = async () => {
    const statement = 'select * from news;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getAllNewsBySport = async (params) => {
    const { sportId } = params;
    const statement = 'select * from news where sportId = ?;';
    const parameters = [sportId];
    return await mysql.query(statement, parameters);
}

const getAllNewsByTour = async (params) => {
    const { tourId } = params;
    const statement = 'select * from news where tourId = ?;';
    const parameters = [tourId];
    return await mysql.query(statement, parameters);
}

const getAllNewsByMatch = async (params) => {
    const { matchId } = params;
    const statement = 'select * from news where matchId = ?;';
    const parameters = [matchId];
    return await mysql.query(statement, parameters);
}

const purgeAllNews = async () => {
    const statement = 'truncate news';
    const parameters = [];
    return mysql.query(statement, parameters)
    .then(res => { return { status: "purged all news" } })
    .catch(err => { return { status: err } });
}


const createNews = async params => {
    const { title, description, tourId, matchId } = params;

    if (tourId != undefined && matchId != undefined) {


        const [res] = await mysql.query("select id , tourId from matches where id = ?", [matchId])
        if (!res) {
            return { status: "invalid id given for match" }
        }

        if (res.tourId != tourId) {
            return { status: "invalid tour id given for match" }
        }

        const [res2] = await mysql.query("select sportId from tours where id = ?", [tourId])

        const statement = 'INSERT INTO news (title, description, sportId, tourId, matchId) VALUES (?,?,?,?,?);';
        const parameters = [title, description, res2.sportId, tourId, matchId];

        return mysql.query(statement, parameters)
            .then(res => { return { status: "successfull" } })
            .catch(err => { return { status: err } });
    }


    if (matchId) {

        const [res] = await mysql.query("select id , tourId from matches where id = ?", [matchId])

        if (!res) {
            return { status: "invalid id given for match" }
        }

        const [res2] = await mysql.query("select sportId from tours where id = ?", [res.tourId])

        const statement = 'INSERT INTO news (title, description, sportId, tourId, matchId) VALUES (?,?,?,?,?);';
        const parameters = [title, description, res2.sportId, res.tourId, matchId];
        return mysql.query(statement, parameters)
            .then(res => { return { status: "successfull" } })
            .catch(err => { return { status: err } });

    }


    if (tourId) {

        const [res] = await mysql.query("select id , sportId from tours where id = ?", [tourId])

        if (!res) {
            return { status: "invalid id given for tour" }
        }

        const statement = 'INSERT INTO news (title, description, sportId, tourId) VALUES (?,?,?,?);';
        const parameters = [title, description, res.sportId, tourId];
        return mysql.query(statement, parameters)
            .then(res => { return { status: "successfull" } })
            .catch(err => { return { status: err } });

    }
}

module.exports = {
    getAllNews: getAllNews,
    createNews: createNews,
    getAllNewsBySport: getAllNewsBySport,
    getAllNewsByTour: getAllNewsByTour,
    getAllNewsByMatch: getAllNewsByMatch,
    purgeAllNews: purgeAllNews
}