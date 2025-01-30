import { useState, useEffect } from "react";
import useUserProfileStore from "../store/useProfileStore";
import { useToast } from "@chakra-ui/react";
import { db } from "../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouteError } from "react-router-dom";

function useGetUserProfileByUsername(username) {
    const [isLoading, setIsLoading] = useState(true);
    const { userProfile, setUserProfile } = useUserProfileStore();
    const toast = useToast();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);
            try {
                const q = query(collection(db, "users"), where("username", "==", username));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    return;
                }
                
                let userDoc;
                querySnapshot.forEach((doc) => {
                    userDoc = doc.data();
                });
                
                setUserProfile(userDoc);
            } catch (error) {
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true
                });
            } finally {
                setIsLoading(false);
            }
        };

        if (username) {
            getUserProfile();
        }
    }, [setUserProfile, username, toast]);

    return { isLoading, userProfile };
}

export default useGetUserProfileByUsername;