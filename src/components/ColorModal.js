import { useState, useEffect } from 'react';
import { BlockPicker } from 'react-color';
import { useNavigate } from "react-router-dom";
import Modal from './Modal';
import searchApi from '../api/search'
import colorApi from '../api/colors'

export default function ColorPicker(props) {

    const colors = ['#B71C1C', '#D32F2F', '#F44336', '#E57373', '#E65100', '#C2185B']
    const [color, setColor] = useState({
        "hex": "#cccccc"
    })
    const [queryResults, setQueryResults] = useState([])
    const navigate = useNavigate()

    function handleChange(color) {
        setColor(color)
    }

    function handleRidirect(result) {
        colorApi.get(`${result.id}/lipstick`)
            .then(res =>
                navigate(`/lipstick/${res.data.id}?color=${result.id}`))
    }

    useEffect(() => {
        if (color) {
            searchApi.post('/color', {
                "hexColor": color.hex
            })
                .then(res => setQueryResults(res.data))
        }
    }, [color])

    return (
        <Modal closeModal={props.closeModal}>
            <div className='flex justify-center'>
                <BlockPicker colors={colors} triangle={"hide"} color={color} onChange={handleChange} width={1000} />
            </div>
            <div className='mt-5'>
                {Object.entries(queryResults).map(([key, value]) => (
                    <div>
                        <div className='font-bold'>{key}</div>
                        {
                            value.map(val => (
                                <div className='flex items-center p-1 rounded-lg hover:bg-gray-200 gap-1' onClick={() => handleRidirect(val)}>
                                    <div className='h-4 w-4 rounded-full shrink-0' style={{ "backgroundColor": val.hexColor }}></div>
                                    <div >{val.name}</div>
                                </div>
                            ))
                        }
                    </div>
                ))}
            </div>
        </Modal>
    )
}