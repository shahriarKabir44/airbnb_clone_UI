import House from "../models/House";

 
export default function getAllHouses(req, res) {
    res.status(200).send({ data: House.getAll() })
}