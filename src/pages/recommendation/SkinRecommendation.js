import { useEffect, useState } from "react"
import tags from "../../api/tags"
import ColorDetails from "../../components/ColorDetails"

export default function SkinRecommandation() {

    const [whiteColors, setWhiteColors] = useState([])
    const [yellowColors, setYellowColors] = useState([])
    const [blackColors, setBlackColors] = useState([])

    const WHITE_TAG_TITLE = "WHITE"
    const YELLOW_TAG_TITLE = "YELLOW"
    const BLACK_TAG_TITLE = "BLACK"

    useEffect(() => {
        tags.get(`${WHITE_TAG_TITLE}/colors`)
            .then(res => setWhiteColors(res.data))
        tags.get(`${YELLOW_TAG_TITLE}/colors`)
            .then(res => setYellowColors(res.data))
        tags.get(`${BLACK_TAG_TITLE}/colors`)
            .then(res => setBlackColors(res.data))
    }, [])


    return (
        <div>
            <div className="font-bold text-lg mt-5">白皮</div>
            <div className="sm:flex">
                {
                    whiteColors.map((color, index) => (
                        <div className="sm:basis-1/4">
                            <ColorDetails index={index} color={color} />
                        </div>
                    ))
                }
            </div>
            <div className="font-bold text-lg mt-5">黄皮</div>
            <div className="sm:flex">
                {
                    yellowColors.map((color, index) => (
                        <div className="sm:basis-1/4">
                            <ColorDetails index={index} color={color} />
                        </div>
                    ))
                }
            </div>
            <div className="font-bold text-lg mt-5">黑皮</div>
            <div className="sm:flex">
                {
                    blackColors.map((color, index) => (
                        <div className="sm:basis-1/4">
                            <ColorDetails index={index} color={color} />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}