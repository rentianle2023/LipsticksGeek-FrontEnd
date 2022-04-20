import React, { useState } from "react"

const UserContext = React.createContext()

function UserContextProvider(props) {

    const [login, setLogin] = useState(false)
    const [user, setUser] = useState({
        username: 'tyler'
    })

    return (
        <UserContext.Provider value={{ user, setUser, login, setLogin}}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContextProvider, UserContext }