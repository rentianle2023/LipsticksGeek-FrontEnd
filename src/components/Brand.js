import { Link } from "react-router-dom"

export default function Brand(props) {

    return (
        <div className="bg-slate-200 w-4/5 mx-auto text-center m-5 p-4 text-indigo-100 shadow-lg">

            <div>
                <img src={props.brand.logoImage} className='h-20 mx-auto my-3' />
            </div>
            <div className="bg-gray-700 rounded-lg mt-5 mx-auto p-2 text-sm hover:bg-red-700 cursor-pointer">
                <Link to={`/brand/${props.brand.id}`} >查看 {props.brand.name} 的口红色号</Link>
            </div>

            <div className="mt-2">
                <a href={props.brand.websiteUrl} className='border-b border-gray-700 text-xs text-gray-700 '>进入官网</a>
            </div>

        </div>
    )
}