import { UserContext } from "../context/UserContextProvider";
import { useContext, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useNavigate, Link } from "react-router-dom";

export default function UserDropDown() {
    const { user, setUser} = useContext(UserContext)

    const [showDropDown, setShowDropDown] = useState(false)
    const nevigate = useNavigate()

    function toggleDropDown() {
        setShowDropDown(prevState => !prevState)
    }

    function handleLogout(){
        localStorage.setItem('token','')
        setUser('')
        nevigate(0)
    }

    return (
        <div className="relative">
            <div className="flex items-center gap-1 cursor-pointer" onClick={toggleDropDown}>
                <img src={user.avatar} className='rounded-full w-5 h-5 ml-1' />
                <ChevronDownIcon className="w-3 h-3" />
            </div>
            {
                showDropDown && <div className="mt-3 p-1 bg-gray-600 flex flex-col w-20 static sm:absolute sm:mt-5">
                        <Link to={`/user/${user.username}`}>个人空间</Link>
                        <div className="h-0.5 my-1 bg-gray-400"></div>
                        <div onClick={handleLogout} className='cursor-pointer'>退出</div>
                    </div>
            }
        </div>
    )
}