import { useState } from "react"
import Modal from "./Modal"

export default function LipstickManagementModal(props) {

    const [formData, setFormData] = useState(props.lipstick)

    const handleChange = (event) =>  {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const update = () => {
        //axios update lipstick
        props.updateLipstick(formData)
        props.closeModal()
        console.log("modal closed")
    }

    return (
        <Modal closeModal={props.closeModal}>
            <label>名称：
                <input value={formData.name} name="name" onChange={handleChange} className="input"/>
            </label>
            <label>价格：
                <input value={formData.price} name="price" onChange={handleChange} className="input"/>
            </label>
            <label>图片地址：
                <input value={formData.imageUrl} name="imageUrl" onChange={handleChange} className="input"/>
            </label>

            <div className="button bg-green-600 mt-5 w-20" onClick={update}>确认更改</div>
        </Modal>

    )
}