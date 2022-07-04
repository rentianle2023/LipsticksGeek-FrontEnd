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
            <div className="font-bold text-lg">经典推荐</div>
            <div className="sm:flex">
                {
                    colors.map((color, index) => (
                        <div className="sm:basis-1/4">
                            <ColorDetails index={index} color={color} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}