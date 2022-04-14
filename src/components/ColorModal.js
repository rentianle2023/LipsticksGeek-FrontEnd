import { useState } from 'react';
import { BlockPicker    } from 'react-color';

export default function ColorPicker(){

    const colors = ['#B71C1C','#D32F2F','#F44336','#E57373','#E65100','#F57C00','#C2185B','#E91E63']
    const [color,setColor] = useState("#B71C1C")

    function handleChange(color){
        console.log(color)
        setColor(color)
    }

    return (
            <div className='flex justify-center'>
                <BlockPicker colors={colors} triangle ={"hide"} color={color} onChange={handleChange} width={1000}/>
            </div>
    )
}