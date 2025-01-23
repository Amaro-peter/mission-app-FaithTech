import { createContext,useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({authUser, children}) => {
    return (
        <AuthContext.Provider value={authUser}>
            {children}	
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};