const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { errorHandlingMiddleware } = require('../middlewares/error.handling.middleware');
const { fighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const fighters = await FighterService.searchAll();
    res.data = fighters;
    res.status(200);
  } catch (err) {
    next(err);
  }
  next();
}, responseMiddleware);


router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const fighter = await FighterService.search({ id });
    if (fighter) {
      res.data = fighter;
      res.status(200);
    } else {
      res.status(404);
      next(new Error('Fighter not found'));
    }
  } catch (err) {
    next(err);
  }
  
  next();
}, responseMiddleware);

router.post('/', fighterValid, async (req, res, next) => {
  try {
    const fighter = await FighterService.create(req.body);
    res.data = fighter;
    res.status(201);
  } catch (err) {
    next(err);
  }
  
  next();
}, responseMiddleware);

router.put('/:id', fighterValid, async (req, res, next) => {
  try {
    const fighter = await FighterService.update(req.params.id, req.body);
    if (fighter) {
      res.data = fighter;
      res.status(200);
    } else {
      res.status(404);
      next(new Error('Fighter not found'));
    }
  } catch (err) {
    next(err);
  }
  
  next();
}, responseMiddleware);

router.delete('/:id', async (req, res, next) => {
  try {
    const fighter = await FighterService.delete(req.params.id);
    if (fighter) {
      res.data = fighter;
      res.status(200);
    } else {
      res.status(404);
      next(new Error('Fighter not found'));
    }
  } catch (err) {
    next(err);
  }
  
  next();
}, responseMiddleware);

router.use(errorHandlingMiddleware);

module.exports = router;