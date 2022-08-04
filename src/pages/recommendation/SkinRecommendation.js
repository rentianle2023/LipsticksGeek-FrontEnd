import { useEffect, useState } from "react"
import tags from "../../api/tags"
import ColorDetails from "../../components/ColorDetails"
import skin from '../../images/skin.jpg'

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

            <div className="flex flex-col gap-1 border-2 border-gray-300 rounded-lg p-4 w-full md:w-3/5 xl:w-2/5">
                <div className="font-bold">Q:如何只用一步分辨女友肤色？</div>
                <div className="font-bold">A:看手腕血管颜色！</div>
                <div className="sm:flex sm:gap-5 mt-2">
                    <img src={skin} className='h-32 w-32 rounded-lg' />

                    <div className="text-sm font-light flex flex-col gap-2 mt-2">
                        <div>1）血管呈蓝紫色，肤色属于冷色调（可参考白皮口红推荐）。</div>
                        <div>2）血管呈蓝绿色，肤色属于暖色调（可参考黄皮口红推荐）。</div>
                        <div>3）血管呈纯绿色，肤色属于中性色调（可同时参考白、黄皮口红推荐，友情提示选择黄皮口红推荐更不会出错哦）。</div>
                    </div>
                </div>
            </div>

            <div className="font-bold text-lg mt-5">白皮推荐</div>
            <div className="sm:flex sm:flex-wrap">
                {
                    whiteColors.map((color, index) => (
                        <div className="lg:basis-1/5 sm:basis-1/3">
                            <ColorDetails index={index} color={color} />
                        </div>
                    ))
                }
            </div>
            <div className="font-bold text-lg mt-5">黄皮推荐</div>
            <div className="sm:flex sm:flex-wrap">
                {
                    yellowColors.map((color, index) => (
                        <div className="lg:basis-1/5 sm:basis-1/3">
                            <ColorDetails index={index} color={color} />
                        </div>
                    ))
                }
            </div>
            <div className="font-bold text-lg mt-5">黑皮推荐</div>
            <div className="sm:flex sm:flex-wrap">
                {
                    blackColors.map((color, index) => (
                        <div className="lg:basis-1/5 sm:basis-1/3">
                            <ColorDetails index={index} color={color} />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}