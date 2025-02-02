import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { db } from "../utils/firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import useProjectStore from "../store/useProjectStore";
import useAuthStore from "../store/authStore";

function useGetMissionaryProject(authUser) {
    const [isLoading, setIsLoading] = useState(true);
    const { userProject, setUserProject } = useProjectStore();
    const toast = useToast();

    useEffect(() => {
        const getUserProject = async () => {
            setIsLoading(true);
            try {
                const userProjectRef = doc(db, "users", authUser.uid, "project", "projectDoc");
                const userDoc = await getDoc(userProjectRef);

                if (!userDoc.exists()) {
                    return;
                }
    
                setUserProject(userDoc.data());
            } catch (error) {
                if(error.code === 'not-found') {
                    return;
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (authUser) {
            getUserProject();
        }
    }, [setUserProject, authUser, toast]);

    return { isLoading, userProject };
}

export default useGetMissionaryProject;