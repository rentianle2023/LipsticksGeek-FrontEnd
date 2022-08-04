import { useEffect, useState } from "react"
import tags from "../../api/tags"
import ColorDetails from "../../components/ColorDetails"

export default function MasterRecommandation(){
    const [colors, setColors] = useState([])
    const TAG_TITLE = "MASTER"

    useEffect(() => {
        tags.get(`${TAG_TITLE}/colors`)
            .then(res => setColors(res.data))
    }, [])

    return (
        <div >
            <div className="font-bold text-xl">
                From YicenShen, Not the programmer, 请放心食用
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