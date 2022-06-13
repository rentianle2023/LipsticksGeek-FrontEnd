import PropTypes from 'prop-types';
import { useState } from 'react';
import LipstickManagementModal from './LipstickManagementModal';

export default function LipstickManagement(props) {

    const { id, name, price, imageUrl, colors, active } = props.lipstick
    const [showLipstickModal, setShowLipstickModal] = useState(false)
    const [showColorModal, setShowColorModal] = useState(false)

    const editLipstick = () => {
        setShowLipstickModal(true)
    }

    const deleteLipstick = () => {
        //axios delete
        props.updateLipstick({...props.lipstick,active:false})
    }

    const recoverLipstick = () => {
        props.updateLipstick({...props.lipstick,active:true})
    }

    return (
        <div className='border-2 bordeer-gray-600 rounded-lg p-2 mt-2'>
            <div className='flex justify-between'>
                <div>{id} - {name} - {price}</div>
                <div className='flex gap-2 shrink-0 h-7 '>
                    {active ? 
                    <div className='button bg-green-600 text-white' onClick={editLipstick}>编辑</div> 
                    : <div className='button bg-green-600 text-white' onClick={recoverLipstick}>已删除-恢复</div> 
                    }
                    {active && <div className='button bg-red-600 text-white' onClick={deleteLipstick}>删除</div>}
                </div>
            </div>
            <div className='flex gap-1 flex-wrap mt-2'>
                {
                    colors.map(color => {
                        const style = {
                            "backgroundColor": color.hexColor
                        }
                        return (
                            <div className='w-20 h-20 text-sm text-gray-200' style={style}>{color.name}</div>
                        )
                    })
                }
            </div>

            {
                showLipstickModal && <LipstickManagementModal closeModal={() => setShowLipstickModal(false)} lipstick={props.lipstick} updateLipstick={props.updateLipstick} />
            }
        </div>
    )
}

LipstickManagement.propType = {
    lipstick: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        price: PropTypes.string,
        imageUrl: PropTypes.string,
        colors: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string,
            hexColor: PropTypes.string,
        })
    })
}