import Link from "next/link";

export default function House({ type, town, title, picture, _id }) {
    return (
        <div className="houseBody" >
            <Link href="/houses/[_id]" as={'/houses/' + _id}>
                <a>
                    <img src={picture} width="100%" alt="House picture" />
                    <p>
                        {type} - {town}
                    </p>
                    <p>{title}</p>
                </a>
            </Link>


        </div>
    )
}