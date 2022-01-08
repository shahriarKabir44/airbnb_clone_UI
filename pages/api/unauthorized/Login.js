import User from '../models/User'
export default function login(req, res) {
     res.send({data:User.login(req.body)})

}