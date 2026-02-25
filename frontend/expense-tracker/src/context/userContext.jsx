import Reat,{ createContext, useState } from "react"
export const UserContext = createContext();

const Userprovider = ({children})=>{
    const [user,setUser] = useState(null); 

    // Function to update user date
    const updateUser = (userData)=>{
        setUser(userData);
    };

    // Function to clear user data on logout
    const clearUser =()=>{
        setUser(null);
    };

    return(
        <UserContext.Provider 
        value={{
            user, 
            updateUser, 
            clearUser
            }}
            >
            {children}
        </UserContext.Provider>
    );
}

export default Userprovider;
