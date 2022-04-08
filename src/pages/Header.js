import {
    Link
} from "react-router-dom";
import lip from '../images/lip.png'

export default function Header() {
    return (
        <div className="relative">
            <nav className="flex items-center py-2 px-5 bg-gray-700 text-sm shadow-md shadow-gray-800 text-indigo-100 ">

                <h1 className="font-bold">
                    <Link to="/">
                        <svg className="h-10 w-10 fill-white inline-block" t="1649234406400" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3874"><path d="M443.6 560.9H208.5V120.1c0-31.8 30.3-54.9 61-46.5l29.6 8.1c85.3 23.4 144.5 101 144.5 189.4v289.8z" fill="#FF4F5C" p-id="3875"></path><path d="M388 952.1H264c-46.7 0-84.5-37.8-84.5-84.5V448.2h293v419.4c0.1 46.7-37.8 84.5-84.5 84.5zM759.9 448.2H636c-46.7 0-84.5 37.8-84.5 84.5v419.4h293V532.7c0-46.7-37.9-84.5-84.6-84.5z" p-id="3876"></path></svg>
                        <span>LipstickGeeks</span>
                    </Link>
                </h1>
                
                <div className="flex gap-1 mx-4 ml-auto">
                    <button className="">
                        <Link to="/recommendation" className="focus-button">推荐</Link>
                    </button>
                    <button className="">
                        <Link to="/encyclopedia" className="focus-button">百科</Link>
                    </button>
                    <button className="">
                        <Link to="/community" className="focus-button">社区</Link>
                    </button>
                </div>

                <a href="https://www.w3schools.com" className="border-b-2 border-b-red-500">Github</a>
            </nav>

        </div>
    )
}