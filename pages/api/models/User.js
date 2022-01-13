import jwt from 'jsonwebtoken'
 class User {
     static users= [
        {
            name: "abcd",
            email: "p@p",
            password: "abcd",
            Id:0
    
        }
    ]
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
        return this.this.this.userList.filter(user => user.email == email && user.password == password)[0]
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
        if (!this.userList.filter(user => user.email == email).length) {
            var newUser = {
                email: email,
                password: password,
                Id: this.userList.length
            }
            this.this.userList.push(newUser)
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