const { UserRepository } = require('../repositories/userRepository');

class UserService {

  handleRepositoryError(err) {
    throw err;
  }

  async delete(id) {
    try {
      const user = await UserRepository.delete(id);
      return user;
    } catch (err) {
      this.handleRepositoryError(err);
    }
    
  }

  async update(id, dataToUpdate) {
    try {
      const user = await UserRepository.update(id, dataToUpdate);
      return user;
    } catch (err) {
      this.handleRepositoryError(err);
    }
    
  }

  async create(data) {
    try {
      const user = await UserRepository.create(data);
      return user;
    } catch (err) {
      this.handleRepositoryError(err);
    }
    
  }

  async searchAll() {
    try {
      const users = await UserRepository.getAll()
      return users;
    } catch (err) {
      this.handleRepositoryError(err);
    }
    
  }

  async searchById(id) {
    try {
      const user = await UserRepository.getOneById(id);
      return user;
    } catch (err) {
      this.handleRepositoryError(err);
    }
  }

  async search(search) {
    try {
      const user = await UserRepository.getOne(search);
      return user;
    } catch (err) {
      this.handleRepositoryError(err);
    }
  }
}

module.exports = new UserService();