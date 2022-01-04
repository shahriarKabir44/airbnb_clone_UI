import houses from '../../../houses'

export default function getHouse(req, res) {
    var { Id } = (req.query);
    res.status(200).send({ house: houses.filter(house => house.id == Id)[0] })
}