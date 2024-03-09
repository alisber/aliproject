import { createContext, useState } from "react";

export let CounterContext = createContext()

export default function UserContextProvider(props){
    const [userToken, setUserToken] = useState(null)

    return<CounterContext.Provider value={{count, changeCount}}>
        {props.children}
    </CounterContext.Provider>
}