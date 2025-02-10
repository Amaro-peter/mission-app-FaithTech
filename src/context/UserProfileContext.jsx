import { createContext, useContext } from "react";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ userProfile, children }) => {
    return (
        <UserProfileContext.Provider value={userProfile}>
            {children}
        </UserProfileContext.Provider>
    );
};

export const useUserProfile = () => {
    return useContext(UserProfileContext);
};