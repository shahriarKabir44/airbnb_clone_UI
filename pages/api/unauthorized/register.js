import User from "../models/User"
export default function register(req, res) {
    res.send({data:User.register(req.body)})
}