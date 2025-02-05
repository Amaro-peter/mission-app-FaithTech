import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { db } from "../utils/firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import useProjectStore from "../store/useProjectStore";
import useAuthStore from "../store/authStore";

function useGetMissionaryProject(profileWithoutFollow) {
    const [isLoading, setIsLoading] = useState(true);
    const { userProject, setUserProject } = useProjectStore();
    const toast = useToast();

    useEffect(() => {
        const getUserProject = async () => {
            setIsLoading(true);
            try {
                const userProjectRef = doc(db, "users", profileWithoutFollow.uid, "project", "projectDoc");
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

        if (profileWithoutFollow?.uid) {
            getUserProject();
        }
    }, [setUserProject, profileWithoutFollow?.uid, toast]);

    return { isLoading, userProject };
}

export default useGetMissionaryProject;