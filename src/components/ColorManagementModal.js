import { useEffect, useState } from "react"
import Modal from "./Modal"
import colorApi from '../api/colors'
import tagApi from '../api/tags'

export default function ColorManagementModal(props) {

    const [formData, setFormData] = useState(props.color)
    const [tags, setTags] = useState([])
    const [tagSelections, setTagSelections] = useState([])

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    useEffect(() => {
        colorApi.get(`/${props.color.id}/tags`)
            .then(res => setTags(res.data))

        tagApi.get()
            .then(res => setTagSelections(res.data))
    }, [])

    const toggleTag = (tag) => {
        if(tags.some(t => t.id === tag.id)) {
            setTags(prevTags => prevTags.filter(prevTag => prevTag.id !== tag.id))
        } else {
            setTags(prevTags => [...prevTags,tag])
        }
    }

    const update = () => {
        props.updateColor({
            ...formData,
            tags
        })
        props.closeModal()
    }

    return (
        <Modal closeModal={props.closeModal}>
            <label>名称：
                <input value={formData.name} name="name" onChange={handleChange} className="input" />
            </label>
            <label>色号：
                <input value={formData.hexColor} name="hexColor" onChange={handleChange} className="input" />
            </label>

            <div>标签:</div>
            <div className="flex gap-2">
                {tagSelections.map(tag => (
                    <div 
                    className={` ${tags.some(t => t.id === tag.id) ? 'bg-green-400' : 'bg-gray-400'} rounded-lg p-1`}
                    onClick={() => toggleTag(tag)}>
                        {tag.title}</div>
                ))}
            </div>

            <div className="button bg-green-600 mt-5 w-20" onClick={update}>确认更改</div>
        </Modal>

    )
}