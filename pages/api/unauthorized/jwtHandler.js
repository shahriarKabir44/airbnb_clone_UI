import jwt from "jsonwebtoken"

export default function verifyAuthToken(handler) {
    return async function (req, res) {
        var authHeader = req.headers['authorization']
        var token = authHeader && authHeader.split(' ')[1]
        if (!token) res.send({ data: null })
        else {
            jwt.verify(token, process.env.jwtSecret, (err, user) => {
                if (err) {
                    res.send({
                        data: {
                            unauthorized: true
                        }
                    })
                }
                else {
                    req.user = user
                    return handler(req, res)
                }
            })
        }
    }

}


