import jwt from "jsonwebtoken"

export default function verifyAuthToken(handler) {
    return async function (req, res) {
        var authHeader = req.headers['authorization']
        var token = authHeader && authHeader.split(' ')[1]
        if (!token) res.send({ data: null })
        else {
            try {
                req.user = (jwt.verify(token, process.env.jwtSecret))
                return handler(req, res)
            } catch (error) {
                res.send({
                    data: {
                        unauthorized: true
                    }
                })
            }

        }
    }

}


