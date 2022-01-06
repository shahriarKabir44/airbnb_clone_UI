import jwt from 'jsonwebtoken'
class User {
    static isAuthorized(token) {
        if (!token) return false
        jwt.verify(token, process.env.jwtSecret)
    }
}