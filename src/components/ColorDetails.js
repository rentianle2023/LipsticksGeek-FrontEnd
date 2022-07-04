import { Link } from "react-router-dom"

export default function ColorDetails(props) {

    const { index, color } = props

    return (
        <div className="mt-5 flex gap-2">
            <span className="font-bold text-lg text-red-500">#{index + 1}</span>
            <div>
                <div>
                    <div>{color.brandName}</div>
                    <div>{color.lipstickName} - {color.lipstickPrice}</div>
                    <div>{color.name}</div>

                </div>
                <div className="w-full h-10 rounded-md shrink-0 place-self-end" style={{ backgroundColor: color.hexColor }} />
                <Link
                    to={`/lipstick/${color.lipstickId}?color=${color.id}`}
                >
                    <div className='text-gray-500 underline'>查看详情</div>
                </Link>
            </div>
        </div>
    )
}