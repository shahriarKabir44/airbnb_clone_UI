import Link from "next/link";

export default function House({ type, town, title, picture, Id }) {
    return (
        <div className="houseBody" >
            <Link href="/houses/[Id]" as={'/houses/' + Id}>
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