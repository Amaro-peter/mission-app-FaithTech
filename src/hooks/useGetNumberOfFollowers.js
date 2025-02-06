import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { useToast } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";


function useGetNumberOfFollowers () {

    const [followerCount, setFollowerCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const authUser = useAuthStore((state) => state.user);
    const toast = useToast();

    useEffect(() => {
        const fetchFollowerCount = async () => {
            if(!authUser?.uid) {
                setIsLoading(false);
                return;
            }
            try{
                const userDocRef = doc(db, "users", authUser?.uid);
                const userDocSnap = await getDoc(userDocRef);
                if(userDocSnap.exists()) {
                    const data = userDocSnap.data();
                    setFollowerCount(data.followerCount || 0);
                }
            } catch(error) {
                if(!toast.isActive("fetchFollowerCountError")) {
                    toast({
                        id: "fetchFollowerCountError",
                        title: "Erro ao buscar número de seguidores",
                        description: error.message,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } finally{
                setIsLoading(false);
            }
        };

        fetchFollowerCount();
    }, [authUser?.uid, toast]);

    return {followerCount, isLoading};

}

export default useGetNumberOfFollowers;