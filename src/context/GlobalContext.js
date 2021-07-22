import { createContext } from "react";


const initialState = {
    isAdmin: false
}

const GlobalContext = createContext(initialState);


export default GlobalContext;




