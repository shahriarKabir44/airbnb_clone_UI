
export default function login(req, res) {
    console.log(req.body);
    res.status(200).send({ response: "yo" })
}