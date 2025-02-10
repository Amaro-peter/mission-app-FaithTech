import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import useProjectStore from "../store/useProjectStore";

function useGetMissionaryProject(userProfile) {
    let profileWithoutFollow = null;
    if (userProfile) {
        const { isFollowed, ...restProfile } = userProfile;
        profileWithoutFollow = { ...restProfile };
    }
    const [isLoadingProj, setIsLoadingProj] = useState(null);
    const [userProject, setUserProject] = useState(null);
    const {projectFlag } = useProjectStore();
    const setProjectFlag = useProjectStore((state) => state.setProjectFlag);
    const toast = useToast();

    useEffect(() => {

        if(!projectFlag && (userProject && userProject.uid === profileWithoutFollow.uid)) {
            setIsLoadingProj(false);
            return;
        }

        const getUserProject = async () => {
            setIsLoadingProj(true);
            try {
                const userProjectRef = doc(db, "users", profileWithoutFollow.uid, "project", "projectDoc");
                const userDoc = await getDoc(userProjectRef);
                
                if (!userDoc.exists()) {
                    setUserProject(null);
                } else {
                    setUserProject(userDoc.data());
                }

            } catch (error) {
                if(error.code === 'not-found') {
                    return;
                }
            } finally {
                if(projectFlag) {
                    setProjectFlag(false);
                }
                setIsLoadingProj(false);
            }
        };

        getUserProject();


    }, [profileWithoutFollow?.uid, toast]);

    return { isLoadingProj, userProject };
}

export default useGetMissionaryProject;