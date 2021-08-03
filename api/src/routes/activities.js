const { Router } = require('express');
const activityController = require('../controllers/activity');
const router = Router();


router.get('/', activityController.getAll);

router.get('/:id', activityController.getById);

router.post('/', activityController.createActivityAndAddToCountries);

router.put('/:id', activityController.update);

router.delete('/:id', activityController.delete);

module.exports = router;