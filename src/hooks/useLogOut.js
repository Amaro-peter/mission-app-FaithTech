import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useToast } from '@chakra-ui/react';
import { useState } from "react";
import useAuthStore from '../store/authStore';

function useLogout() {
    const toast = useToast();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const logoutUser = useAuthStore((state) => state.logout);

    const handleLogout = async (setPostsData) => {
        setIsLoggingOut(true);
        try{
            localStorage.removeItem("user-info");
            localStorage.removeItem("postCount");
            localStorage.removeItem("hasVisitedMeuFeed");
            localStorage.removeItem("loadMoreData");
            localStorage.removeItem("hasMore");
            localStorage.removeItem("noPosts");
            localStorage.removeItem("lastDocId");
            logoutUser();
            setPostsData([]);
            await signOut(auth);
            
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
                positiion: "top",
              })
        } finally {
            setIsLoggingOut(false);
        }
    }

    return {handleLogout, isLoggingOut};
}

export default useLogout;
