import User from '../models/User'
export default function verifyAuthToken(handler) {
    return async function (req, res) {
        var authHeader = req.headers['authorization']
        var token = authHeader && authHeader.split(' ')[1]
        if (!token) res.send({ data: null })
        else {
            var user = User.isAuthorized(token)
            if (!user) res.send({
                data: {
                    unauthorized: true
                }
            })
            else {
                req.user = user
                return handler(req, res)
            }
        }
    }

}


