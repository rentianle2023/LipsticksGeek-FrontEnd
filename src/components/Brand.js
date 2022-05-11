import { Link } from "react-router-dom"

export default function Brand(props) {

    return (
        <div className="w-full sm:w-1/2">
            <div className="bg-slate-200 p-5 m-5 shadow-lg ">

                <div>
                    <img src={props.brand.logoImage} className='h-20 mx-auto my-3' alt='brand logo' />
                </div>
                <Link to={`/brand/${props.brand.id}`} >
                    <div className="bg-gray-700 rounded-lg mt-5 mx-auto p-2 text-sm hover:bg-red-700 cursor-pointer">
                        查看 {props.brand.name} 的口红色号
                    </div>
                </Link>
                <div className="mt-2">
                    <a href={props.brand.websiteUrl} className='border-b border-gray-700 text-xs text-gray-700 '>进入官网</a>
                </div>

            </div>
        </div>
    )
}