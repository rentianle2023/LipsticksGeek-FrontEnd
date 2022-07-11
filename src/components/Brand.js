import { Link } from "react-router-dom"

export default function Brand(props) {

    return (
        <div >
            <div className="bg-slate-200 py-2 px-5 m-5 shadow-lg">

                <div className="h-28 pt-10">
                    <img src={props.brand.logoImage} className=' mx-auto' alt='brand logo' />
                </div>
                <Link to={`/wiki/brand/${props.brand.id}`} >
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