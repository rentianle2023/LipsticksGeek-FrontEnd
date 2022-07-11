import { Link } from "react-router-dom"

export default function ColorDetails(props) {

    const { index, color } = props

    return (
        <div className="mt-2 flex gap-2 shrink-0 p-3 pl-0 text-center">
            <span className="font-bold text-lg text-red-500 italic sm:hidden">NO.{index + 1}</span>
            <div className="w-full flex flex-col gap-2">
                <div className="font-bold text-lg">
                    <span className="font-bold text-lg text-red-500 italic hidden sm:inline sm:mr-2">NO.{index + 1}</span>
                    {color.brandName}
                </div>
                <div className="w-10 h-10  rounded-full shrink-0 mx-auto" style={{ backgroundColor: color.hexColor }} />

                <div>{color.name}</div>

                <div>{color.lipstickName} - {color.lipstickPrice}</div>
                <Link
                    to={`/lipstick/${color.lipstickId}?color=${color.id}`}
                >
                    <div className='text-gray-400 underline text-sm'>查看详情</div>
                </Link>

            </div>
        </div>
    )
}