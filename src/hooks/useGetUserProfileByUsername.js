import { useState, useEffect } from "react";
import useUserProfileStore from "../store/useProfileStore";
import { useToast } from "@chakra-ui/react";
import { auth, db } from "../utils/firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigate, useRouteError } from "react-router-dom";
import useAuthStore from "../store/authStore";

function useGetUserProfileByUsername(username) {
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(true);
    const {setFollowStatus } = useUserProfileStore();
    const authUser = useAuthStore((state) => state.user);
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {


        if((userProfile && authUser && userProfile.username === username) ||
         (userProfile && authUser && authUser.username === username && userProfile.uid === authUser.uid)) {
            setIsLoading(false);
            return;
        }

        const getUserProfile = async () => {
            
            setIsLoading(true);
            try {
                const q = query(collection(db, "users"), where("username", "==", username));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    if(!toast.isActive("userNotFound")) {
                        toast({
                            id: "userNotFound",
                            title: "Usuário não encontrado",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                            position:"top-left",
                        });
                    }
                    navigate(authUser ? `/${authUser.username}` : "/landingPage");	
                    return;
                }
                
                let userDoc;
                querySnapshot.forEach((doc) => {
                    userDoc = doc.data();
                });
                
                setUserProfile(userDoc);

                if(authUser && userDoc.uid) {
                    const followerDocRef = doc(db, "users", userDoc.uid, "followers", authUser.uid);
                    const followerDocSnap = await getDoc(followerDocRef);
                    setFollowStatus(followerDocSnap.exists());
                }

            } catch (error) {
                if(!toast.isActive("error")) {
                    toast({
                        id: "error",
                        title: error.message,
                        status: "error",
                        duration: 5000,
                        isClosable: true
                    });
                }
                navigate("/landingPage");
            } finally {
                setIsLoading(false);
            }
        };

        if (username) {
            getUserProfile();
        }
    }, [username]);

    return { isLoading, userProfile };
}

export default useGetUserProfileByUsername;