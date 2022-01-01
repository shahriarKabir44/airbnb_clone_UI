import Image from "next/image"
export default function House({ type, town, title, picture }) {
    return (
        <div>
            <img src={picture} width="100%" alt="House picture" />
            <p>
                {type} - {town}
            </p>
            <p>{title}</p>
        </div>
    )
}