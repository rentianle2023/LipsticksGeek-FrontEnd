import { useEffect, useState } from "react"
import tags from "../../api/tags"
import ColorDetails from "../../components/ColorDetails"

export default function ClassicRecommandation() {

    const [colors, setColors] = useState([])
    const TAG_TITLE = "CLASSIC"

    useEffect(() => {
        tags.get(`${TAG_TITLE}/colors`)
            .then(res => setColors(res.data))
    }, [])

    return (
        <div >
            <div className="font-bold text-xl">
                <span className="text-red-500">
                    HOT10&nbsp;
                </span>
                    Lipsticks 推荐
            </div>

            <div className=" text-sm text-gray-500 mt-1">
                *该推荐参考自各品牌 TaoBao 销量及评价
            </div>

            <div className="sm:flex sm:flex-wrap">
                {
                    colors.map((color, index) => (
                        <div className="lg:basis-1/5 sm:basis-1/4">
                            <ColorDetails index={index} color={color} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}