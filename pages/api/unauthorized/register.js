import User from "../models/User"
export default function register(req, res) {
    res.send(User.register(req.body))
}