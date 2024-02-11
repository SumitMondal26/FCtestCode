const News = require('../controllers/news');

module.exports = function (app) {

    app.get("/news", async (req, res, next) => {
        try {
            return res.json(await News.getAllNews());
        } catch (err) {
            return next(err)
        }
    })

    app.get("/news/match", async (req, res, next) => {
        let params = req.query;

        try {
            return res.json(await News.getAllNewsByMatch(params));
        } catch (err) {
            return next(err)
        }
    })
    app.get("/news/sport", async (req, res, next) => {
        let params = req.query;

        try {
            return res.json(await News.getAllNewsBySport(params));
        } catch (err) {
            return next(err)
        }
    })
    app.get("/news/tour", async (req, res, next) => {
        let params = req.query;

        try {
            return res.json(await News.getAllNewsByTour(params));
        } catch (err) {
            return next(err)
        }
    })

    app.post("/news/create", async (req, res, next) => {

        try {
            res.setHeader('Content-Type', 'application/json');

            return res.json(await News.createNews(req.body));


        } catch (err) {
            return next(err)

        }
    })
}