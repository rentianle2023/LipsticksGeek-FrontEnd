import RecommandTag from "../components/RecommandTag"

export default function Recommendation(){
    return (
        <div className="mx-5 p-5">
            <div className="text-red-500 text-xl font-bold">功能已完成，即将填充推荐信息，尽情期待</div>
            <div className="text-gray-800 font-extrabold text-xl">品牌经典推荐</div>
            <RecommandTag name={"经典"} title={"CLASSIC"}/>
            <div className="text-gray-800 font-extrabold text-xl mt-5">根据肤色推荐</div>
            <RecommandTag name={"白皮"} title={"WHITE"}/>
            <RecommandTag name={"黄皮"} title={"YELLOW"}/>
            <RecommandTag name={"黑皮"} title={"BLACK"}/>
        </div>  
    )
}