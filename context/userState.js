import { useState } from "react";
import userContext from "./userContext.js";

const UserState = ({children}) => {

    const [userID , setUserID] = useState('');

    return(
        <userContext.Provider value={{userID , setUserID}} >
            {children}
        </userContext.Provider>
    )
}

export default UserState;