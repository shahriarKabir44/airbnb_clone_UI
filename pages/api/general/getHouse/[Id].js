import House from '../../models/House'
export default function getHouse(req, res) {
    var { Id } = (req.query);
    res.status(200).send({ data: House.findOne(Id) })
}