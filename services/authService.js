const UserService = require('./userService');

class AuthService {
    async login(userData) {
        const user = await UserService.search(userData);
        if(!user) {
            throw Error('User not found');
        }
        return user;
    }
}

module.exports = new AuthService();