import { useEffect, useState, useContext } from "react"
import lipsticksApi from "../api/lipsticks"
import colorApi from "../api/colors"
import ReactPaginate from 'react-paginate';
import LipstickManagement from "../components/LipstickManagement";
import { UserContext } from "../context/UserContextProvider";
import SearchModal from "../components/SearchModal"

export default function Management() {

    const { user } = useContext(UserContext)
    const [pageCount, setPageCount] = useState(20)
    const [currentPage, setCurrentPage] = useState(0)
    const [lipsticks, setLipsticks] = useState([])
    const pageSize = 10

    const [showSearchModal, setShowSearchModal] = useState(false)

    useEffect(() => {
        if (user && user.roles.some(role => role.role === "ADMIN")) {
            fetchLipsticksPagination()
        }
    }, [currentPage, user])

    const fetchLipsticksPagination = () => {
        lipsticksApi.get(`/${currentPage}/${pageSize}`)
            .then(res => {
                const totalCount = res.headers["x-total-count"]
                if (pageCount != Math.ceil(totalCount / pageSize)) {
                    setPageCount(Math.ceil(totalCount / pageSize))
                }
                setLipsticks(res.data)
            })
    }

    const updateLipstick = (newLipstick) => {
        console.log(newLipstick)
        lipsticksApi.put("", { ...newLipstick })
            .then(() => {
                console.log("updatefinish")
                setLipsticks(lipsticks.map(lipstick => (
                    lipstick.id === newLipstick.id
                        ? newLipstick
                        : lipstick
                )))
            })
    }

    const handlePageClick = (pageIndex) => {
        console.log(pageIndex)
        setCurrentPage(pageIndex.selected)
    }

    const handleSearchClick = (result) => {
        if (result.isColor) {
            colorApi.get(`${result.id}/lipstick`)
                .then(res => lipsticksApi.get(`${res.data.id}`))
                .then(res => setLipsticks([res.data]))
                .then(setShowSearchModal(false))
        } else {
            lipsticksApi.get(`${result.id}`)
                .then(res => setLipsticks([res.data]))
                .then(setShowSearchModal(false))
        }
    }

    const pageItem = "w-8 h-8 flex justify-center items-center mx-1 bg-gray-600 rounded-lg text-white"
    const pageChange = "w-20 h-8 flex justify-center items-center mx-1 bg-gray-600 rounded-lg text-white"
    const active = "mx-1 bg-gray-400 rounded-lg px-2 py-1 text-black"

    return <div className="py-10">
        <div className="search-btn-flex mx-auto" onClick={() => setShowSearchModal(true)}>搜索</div>
        {showSearchModal && <SearchModal closeModal={() => setShowSearchModal(false)} handleClick={handleSearchClick} />}
        <div className="m-5">
            {lipsticks.map((lipstick) => (
                <LipstickManagement lipstick={lipstick} updateLipstick={updateLipstick} />
            ))}
        </div>
        <ReactPaginate
            className="flex justify-center"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< 上一页"
            pageClassName={pageItem}
            previousClassName={pageChange}
            nextLabel="下一页 >"
            nextClassName={pageChange}
            breakLabel="..."
            breakClassName={pageItem}
            activeClassName={active}
            renderOnZeroPageCount={null}
        />
    </div>
}