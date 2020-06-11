const { BaseRepository } = require('./baseRepository');

class UserRepository extends BaseRepository {
    constructor() {
        super('gamers');
    }
}

exports.UserRepository = new UserRepository();