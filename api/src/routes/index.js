const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const CountrieRoute = require('./countries');
const ActivityRoute = require('./activities');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', CountrieRoute);
router.use('/activities', ActivityRoute);



module.exports = router;
