import User from '../models/User'
export default function login(req, res) {

    var data = User.login(req.body)
    res.send(data)

}