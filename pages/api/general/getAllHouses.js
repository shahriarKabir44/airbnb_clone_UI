import houses from '../houses'

export default function getAllHouses(req, res) {
    res.status(200).send({ data: houses })
}