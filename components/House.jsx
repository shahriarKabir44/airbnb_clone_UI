import Link from "next/link";
import Layout from "./Layout";

export default function House({ type, town, title, picture, id }) {
    return (
        <Layout content={<div>
            <Link href="/houses/[id]" as={'/houses/' + id}>

                <img src={picture} width="100%" alt="House picture" />
                <p>
                    {type} - {town}
                </p>
                <p>{title}</p>


            </Link>

        </div>} />




    )
}