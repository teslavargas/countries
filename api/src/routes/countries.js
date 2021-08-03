const { Router } = require('express');
const countryController = require('../controllers/country');
const router = Router();

router.get('/', countryController.getAll);

router.get('/:id', countryController.getByIdComplete);

router.get('/:name', countryController.getByName); 

router.post('/', countryController.add);

router.put('/:id', countryController.update);

router.delete('/:id', countryController.delete);


module.exports = router;
