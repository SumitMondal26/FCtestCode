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


const createNews = async params => {
    const { news, sportId, tourId, matchId } = params;
    
    [res] = await mysql.query("select id , tourId from matches where id = ?", [matchId])

    if (!res) {
        return { status: "invalid id given for match" }
    }

    if (res.tourId != tourId) {
        return { status: "invalid tour id given for match" }
    }

    [res] = await mysql.query("select sportId from tours where id = ?", [tourId])

    if (res.sportId != sportId) {
        return { status: "invalid sport id given for tour" }
    }

    const statement = 'INSERT INTO news (news, sportId, tourId, matchId) VALUES (?,?,?,?);';
    const parameters = [news, sportId, tourId, matchId];

    return mysql.query(statement, parameters)
        .then(res => { return { status: "successfull" } })
        .catch(err => { return { status: err } });

}

module.exports = {
    getAllNews: getAllNews,
    createNews: createNews,
    getAllNewsBySport: getAllNewsBySport,
    getAllNewsByTour: getAllNewsByTour,
    getAllNewsByMatch: getAllNewsByMatch
}