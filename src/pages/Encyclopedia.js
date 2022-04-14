import { useEffect, useState } from "react"
import api from '../api/brands'
import Brand from "../components/Brand"
import SearchModal from "../components/SearchModal"
import ColorModal from "../components/ColorModal"
import Modal from "../components/Modal"
import { SearchIcon } from "@heroicons/react/outline"
import { ColorSwatchIcon } from '@heroicons/react/solid'

export default function Encyclopedia() {

    const [brands, setBrands] = useState()
    const [showSearchModal, setShowSearchModal] = useState(false)
    const [showColorModal, setShowColorModal] = useState(false)

    useEffect(() => {
        api.get()
            .then(res => setBrands(res.data))
    }, [])

    function onModalClick(e) {
        e.stopPropagation()
    }

    return (
        <div>
            {
                showSearchModal &&
                <Modal onModalClick={onModalClick} onOverlayClick={() => setShowSearchModal(false)}>
                    <SearchModal /> 
                </Modal>
            }
            {
                showColorModal &&
                <Modal onModalClick={onModalClick} onOverlayClick={() => setShowColorModal(false)}>
                    <ColorModal /> 
                </Modal>
            }
            <div className="flex justify-center mt-8 gap-4">
                <div className="flex items-center w-1/3 p-2 text-gray-400 border-2 shadow-md rounded-lg" onClick={() => setShowSearchModal(true)}>
                    <SearchIcon className="w-5 h-5 mr-1" />
                    <span>全站搜索</span>
                </div>
                <div className="flex items-center w-1/3 p-2 text-gray-400 border-2 shadow-md rounded-lg" onClick={() => setShowColorModal(true)}>
                    <ColorSwatchIcon className="w-5 h-5 fill-red-500 mr-1" />
                    <span>颜色匹配</span>
                </div>
            </div>
            {brands && brands.map(brand =>
                (<Brand brand={brand} key={brand.id} />)
            )
            }
        </div>
    )
}