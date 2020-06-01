const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
  searchAll() {
    const fighters = FighterRepository.getAll();
    return fighters;
  }

  create(data) {
    const fighter = FighterRepository.create(data);
    return fighter;
  }

  search(id) {
    const fighter = FighterRepository.getOne(id);
    return fighter;
  }

  update(id, dataToUpdate) {
    const fighter = FighterRepository.update(id, dataToUpdate);
    return fighter;
  }

  delete(id) {
    const fighter = FighterRepository.delete(id);
    return fighter;
  }
}

module.exports = new FighterService();