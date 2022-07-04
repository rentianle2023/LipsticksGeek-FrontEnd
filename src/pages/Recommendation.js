import RecommandTag from "../components/RecommandTag"
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ClassicRecommendation from "./recommendation/ClassicRecommendation";
import SkinRecommendation from "./recommendation/SkinRecommendation";
import MasterRecommandation from "./recommendation/MasterRecommendation";
import { useState } from "react";


export default function Recommendation() {

    const [pages, setPages] = useState([
        { path: ['/recommendation/classic','/recommendation'], name: '经典推荐' },
        { path: ['/recommendation/skin'], name: '肤色推荐' },
        { path : ['/recommendation/master'], name : '站长推荐'}
    ])
    const { pathname } = useLocation()

    const focus = "text-md p-2 border-2 border-gray-300 w-40 rounded-lg text-center"
    const nonForcus = "text-md p-2 bg-gray-700 border-2 border-gray-700 w-40 text-indigo-100 rounded-lg text-center"

    const pageElement = pages.map(page => (
        <Link
            to={page.path[0]}
            className={page.path.includes(pathname) ? focus : nonForcus}
        >
            {page.name}
        </Link>
    ))

    return (
        <div className="mx-5 p-5">
            {/* <div className="text-red-500 text-xl font-bold">功能已完成，即将填充推荐信息，尽情期待</div>
            <div className="text-gray-800 font-extrabold text-xl">品牌经典推荐</div>
            <RecommandTag name={"经典"} title={"CLASSIC"} />
            <div className="text-gray-800 font-extrabold text-xl mt-5">根据肤色推荐</div>
            <RecommandTag name={"白皮"} title={"WHITE"} />
            <RecommandTag name={"黄皮"} title={"YELLOW"} />
            <RecommandTag name={"黑皮"} title={"BLACK"} /> */}

            <div className="flex gap-2">
                {pageElement}
            </div>

            <div className="mt-10">
                <Routes>
                    <Route path="classic" element={<ClassicRecommendation />} />
                    <Route path="skin" element={<SkinRecommendation />} />
                    <Route path="master" element={<MasterRecommandation />} />
                    <Route path="*" element={<ClassicRecommendation />} />
                </Routes>
            </div>
        </div>
    )
}