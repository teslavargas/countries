const { Activity } = require('../../src/db');
const { Country } = require('../../src/db');
const ModelCrud = require('./index'); 


const activityController = new ModelCrud(Activity, Country)


module.exports = activityController; 