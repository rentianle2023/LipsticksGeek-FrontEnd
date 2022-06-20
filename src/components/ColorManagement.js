import { useState } from "react"
import ColorManagementModal from "./ColorManagementModal"
import colorApi from '../api/colors'

export default function ColorManagement(props) {



    const style = {
        "backgroundColor": props.color.hexColor
    }

    const [showColorModal, setShowColorModal] = useState(false)

    return (
        <div>
            <div
                className='w-20 h-20 text-sm text-gray-200'
                style={style}
                onClick={() => setShowColorModal(true)}>{props.color.name}</div>
            {
                showColorModal && <ColorManagementModal
                    closeModal={() => setShowColorModal(false)}
                    color={props.color}
                    updateColor={props.updateColor} />
            }
        </div>
    )
}