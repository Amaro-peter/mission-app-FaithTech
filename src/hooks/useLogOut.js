import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useToast } from '@chakra-ui/react';
import { useState } from "react";
import useAuthStore from '../store/authStore';

function useLogout() {
    const toast = useToast();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const logoutUser = useAuthStore((state) => state.logout)

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try{
            await signOut(auth);
            localStorage.removeItem("user-info")
            logoutUser();
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

    return {handleLogout, isLoggingOut}
}

export default useLogout