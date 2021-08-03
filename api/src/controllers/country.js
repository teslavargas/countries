const axios = require('axios');
const {
    Country,
    Activity
} = require('../../src/db');
const {
    COUNTRY_URL
} = require('../../constans');
const ModelCrud = require('./index');



class CountryModel extends ModelCrud {
    constructor(model) {
        super(model)
    }

    getAll = async(req, res, next) => {
        const apiCountries = await axios.get(COUNTRY_URL)
        const myCountriesPrev = await this.model.findAll()
        if(myCountriesPrev.length === 0){
            apiCountries.data.map(async (country) => {
                await this.model.create(country);  
            })
        }
        const myCountries = await this.model.findAll({include: [
            {
                model: Activity,
                as: 'activityId'
            },
            
        ]})
        res.status(200).send(myCountries); 
    };

    getByIdComplete = async(req,res,next)=>{
        const id = req.params.id;
        return this.model.findOne({where:{id}, include: [
            {
                model: Activity,
                as: 'activityId'
            },
            
        ]})
            .then(result => res.send(result))
            .catch((error) => next(error))
    }

    getByName = async(req, res, next) => {
        const name = req.params.name;
        return this.model.findOne({
            where: {name}, include: [{
                model: Country,
                as: 'name'
            }]
        })
            .then(result => res.send(result))
            .catch((error) => next(error))
    }

}

const countryController = new CountryModel(Country)


module.exports = countryController;