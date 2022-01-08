import jwt from 'jsonwebtoken'
import userList from '../mock_db/users'
 class User {
    static isAuthorized(token) {
        if (!token) return null
        try {
            var user = jwt.verify(token, process.env.jwtSecret)
            return user
        } catch (error) {
            return null
        }

    }
    static findOne({ email, password }) {
        return userList.filter(user => user.email == email && user.password == password)[0]
    }
    static login({ email, password }) {
        var user = this.findOne({ email: email, password: password })
         if (user) {
            var token = jwt.sign(JSON.stringify(user), process.env.jwtSecret)
            var payload = { ...user, password: null }
            console.log(payload);
            return {
                token: token,
                user: payload
            }
        }
        else return null
    }
    static register({ email, password }) {
        if (!userList.filter(user => user.email == email).length) {
            var newUser = {
                email: email,
                password: password,
                id: userList.length
            }
            userList.push(newUser)
            var token = jwt.sign(JSON.stringify(newUser), process.env.jwtSecret)
            var payload = { ...newUser, password: null }
            return {
                token: token,
                user: payload
            }
        }
        else {
            return null
        }
    }
}

export default User