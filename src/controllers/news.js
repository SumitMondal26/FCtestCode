const News = require('../models/news');

const getAllNews = async () => {
    return await News.getAllNews();
}


const createNews = async params => {

    const { title, description, tourId, matchId } = params;

    if (!title) {
        throw new Error('Missing required parameter: title');
    }
    if (!description) {
        throw new Error('Missing required parameter: description');
    }

    if (!tourId && !matchId) {
        throw new Error('Missing required parameter: tourId / matchId');
    }
    return await News.createNews(params);
}

const getAllNewsByMatch = async params => {

    const { matchId } = params;
    if (!matchId) {
        throw new Error('Missing required parameter: matchId');
    }
    return await News.getAllNewsByMatch(params);
}

const getAllNewsByTour = async params => {

    const { tourId } = params;
    if (!tourId) {
        throw new Error('Missing required parameter: tourId');
    }
    return await News.getAllNewsByTour(params);
}


const getAllNewsBySport = async params => {

    const { sportId } = params;
    if (!sportId) {
        throw new Error('Missing required parameter: sportId');
    }
    return await News.getAllNewsBySport(params);
}

const purgeAllNews = async params => {
    return await News.purgeAllNews();
}

module.exports = {
    getAllNews: getAllNews,
    createNews: createNews,
    getAllNewsByMatch: getAllNewsByMatch,
    getAllNewsBySport: getAllNewsBySport,
    getAllNewsByTour: getAllNewsByTour,
    purgeAllNews: purgeAllNews
}