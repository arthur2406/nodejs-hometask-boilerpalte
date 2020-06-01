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
    const users = UserRepository.getAll()
    return users;
  }

  search(search) {
    const user = UserRepository.getOne(search);
    return user;
  }
}

module.exports = new UserService();