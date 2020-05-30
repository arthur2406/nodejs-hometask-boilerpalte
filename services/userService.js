const { UserRepository } = require('../repositories/userRepository');

class UserService {

  // TODO: Implement methods to work with user
  delete(id) {
    const user = UserRepository.delete(id);
    return user;
  }

  update(id, dataToUpdate) {
    const user = UserRepository.update(id, dataToUpdate);
    return user;
  }

  create(data) {
    const user = UserRepository.create(data);
    return user;
  }

  searchAll() {
    const items = UserRepository.getAll()
    return items;
  }

  search(search) {
    const item = UserRepository.getOne(search);
    return item;
  }
}

module.exports = new UserService();