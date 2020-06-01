const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { fighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.get('/', (req, res, next) => {
  const fighters = FighterService.searchAll();
  res.data = fighters;
  res.status = 200;
  next();
}, responseMiddleware);


router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const fighter = FighterService.search({ id });
  if (fighter) {
    res.data = fighter;
    res.status = 200;
  } else {
    res.err = { error: true, message: 'Fighter not found' }
    res.status = 404;
  }
  next();
}, responseMiddleware);

router.post('/', fighterValid, (req, res, next) => {
  const fighter = FighterService.create(req.body);
  res.data = fighter;
  res.status = 201;
  next();
}, responseMiddleware);

router.put('/:id', fighterValid, (req, res, next) => {
  const fighter = FighterService.update(req.params.id, req.body);
  res.data = fighter;
  res.status = 204;
  next();
}, responseMiddleware);

router.delete(':/id', (req, res, next) => {
  const fighter = FighterService.delete(id);
  if (fighter) {
    res.data = fighter;
    res.status = 204;
  } else {
    res.err = { error: true, message: 'Fighter not found' };
    res.status = 404;
  }
  next();
}, responseMiddleware);

module.exports = router;