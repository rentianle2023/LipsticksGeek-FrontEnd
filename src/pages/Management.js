import { useEffect, useState, useContext } from "react"
import lipsticksApi from "../api/lipsticks"
import ReactPaginate from 'react-paginate';
import LipstickManagement from "../components/LipstickManagement";
import { UserContext } from "../context/UserContextProvider";

export default function Management() {

    const { user } = useContext(UserContext)
    const [pageCount, setPageCount] = useState(20)
    const [currentPage, setCurrentPage] = useState(0)
    const [lipsticks, setLipsticks] = useState([])
    const pageSize = 10

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
        lipsticksApi.put("",{...newLipstick,colors:[]})
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

    const pageItem = "w-8 h-8 flex justify-center items-center mx-1 bg-blue-800 rounded-lg text-white"
    const pageChange = "w-20 h-8 flex justify-center items-center mx-1 bg-blue-800 rounded-lg text-white"
    const active = "mx-1 bg-blue-200 rounded-lg px-2 py-1 text-black"

    return <div className="py-10">
        <div className="m-5">
            {lipsticks.map((lipstick) => (
                <LipstickManagement lipstick={lipstick} updateLipstick={updateLipstick}/>
            ))}
        </div>
        <ReactPaginate
            className="flex justify-center"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName={pageItem}
            previousClassName={pageChange}
            nextLabel="next >"
            nextClassName={pageChange}
            breakLabel="..."
            breakClassName={pageItem}
            activeClassName={active}
            renderOnZeroPageCount={null}
        />
    </div>
}