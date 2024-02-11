const mysql = require('../lib/mysql');

const getAllTours = async () => {
    const statement = 'select * from tours;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getTourDetails = async params => {
    
    const statement = 'select * from tours where tours.name = ?';
    const parameters = [params.name];
    return await mysql.query(statement, parameters);
}

const getMatchesByTourName = async params => {

    return getTourDetails(params).then(async res => {
        const [tour] = res
        const statement = 'select * from matches where matches.tourId = ?';
        const parameters = [tour.id];
        return await mysql.query(statement, parameters);
    })

}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName
}