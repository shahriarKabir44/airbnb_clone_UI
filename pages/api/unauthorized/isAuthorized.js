import verifyAuthToken from "./jwtHandler"

function isAuthorized(req, res) {
    res.setStatus(200).send({ data: req, user })
}

export default verifyAuthToken(isAuthorized)