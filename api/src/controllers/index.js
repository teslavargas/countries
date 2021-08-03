const { v4: uuidv4 } = require('uuid');
const {countries_activities} = require('../db');

 
class ModelCrud {

    constructor(model,modeltwo){
        this.modeltwo = modeltwo; 
        this.model = model
    }

    getAll = (req, res, next) => {
        return this.model.findAll()
            .then(results => res.send(results))
            .catch((error) =>  next(error))
    }

    getById = (req, res, next) => {
        const id = req.params.id;
        return this.model.findByPk(id)
            .then(result => res.send(result))
            .catch((error) => next(error))
    }

    getByName = (req, res, next) => {
        const name = req.query.name;
        return this.model.findOne(name)
            .then(result => res.send(result))
            .catch((error) => next(error))
       
    }

    add = (req, res, next) => {
        const body = req.body;
        console.log(body);
        return this.model.create({
            ...body,
            id: uuidv4()
        })
        .then(createdElement => res.send(createdElement))
        .catch((error) => next(error)) 
    }

    update = (req, res, next) => {
        const id = req.params.id;
        const body = req.body;
        return this.model.update(body, {
            where: {
                id,
            },
        })
    
        .then((updatedElement) => {
            res.send(updatedElement)
        })
        .catch((error) => next(error))
    }

    delete = (req, res, next) => {
        const id = req.params.id;
        return this.model.destroy({
            where: {
                id,
            },
        })
    
        .then(() => {
            res.sendStatus(200)
        })
        .catch((error) => next(error))
    }

    createActivityAndAddToCountries = async (req, res) => {
		const body = req.body;
        const { country } = req.body
		const createdActivitie = await this.model.create({ ...body, id: uuidv4() });
        const existingCountry = await this.modeltwo.findOne({
			where:{
				id:country[0]
			}
		})
        await countries_activities.create({
            countryId: existingCountry.dataValues.id,
            activityId: createdActivitie.dataValues.id
        })
        
        const finalActivity = await this.model.findByPk(createdActivitie.id);

		res.status(200).send(finalActivity);
	};

    
}

module.exports = ModelCrud;