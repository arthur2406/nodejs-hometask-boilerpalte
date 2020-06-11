const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {

  handleRepositoryError(err) {
    throw err;
  }

  async searchAll() {
    try {
      const fighters = await FighterRepository.getAll();
      return fighters;
    } catch (err) {
      this.handleRepositoryError(err);
    }
    
  }

  async create(data) {
    try {
      const fighter = await FighterRepository.create(data);
      return fighter;
    } catch (err) {
      this.handleRepositoryError(err);
    }
  }

  async searchById(id) {
    try {
      const fighter = await FighterRepository.getOneById(id);
      return fighter;
    } catch (err) {
      this.handleRepositoryError(err);
    }
  }

  async update(id, dataToUpdate) {
    try {
      const fighter = await FighterRepository.update(id, dataToUpdate);
      return fighter;
    } catch (err) {
      this.handleRepositoryError(err);
    }
    
  }

  async delete(id) {
    try {
      const fighter = await FighterRepository.delete(id);
      return fighter;
    } catch (err) {
      this.handleRepositoryError(err);
    }
    
  }
}

module.exports = new FighterService();