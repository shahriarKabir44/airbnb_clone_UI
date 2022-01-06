import verifyAuthToken from "./jwtHandler"

function isAuthorized(req, res) {
    res.status(200).send({ data: req.user })
}

export default verifyAuthToken(isAuthorized)