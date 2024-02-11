const News = require('../models/news');

const getAllNews = async () => {
    return await News.getAllNews();
}


const createNews = async params => {

    const { news, sportId, tourId, matchId } = params;

    if (!news) {
        throw new Error('Missing required parameter: news');
    }
    if (!sportId) {
        throw new Error('Missing required parameter: sportId');
    }
    if (!tourId) {
        throw new Error('Missing required parameter: tourId');
    }
    if (!matchId) {
        throw new Error('Missing required parameter: matchId');
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


module.exports = {
    getAllNews: getAllNews,
    createNews: createNews,
    getAllNewsByMatch: getAllNewsByMatch,
    getAllNewsBySport: getAllNewsBySport,
    getAllNewsByTour: getAllNewsByTour
}