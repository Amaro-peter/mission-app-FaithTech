import { useState } from "react";
import useUserProfileStore from "../store/useProfileStore";
import useAuthStore from "../store/authStore";
import { useToast } from "@chakra-ui/react";
import { collection, doc, increment, runTransaction } from "firebase/firestore";
import { db } from "../utils/firebase";


function useUnfollowUser() {
    const [isUpdatingUnfollow, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const { userProfile, setUserProfile } = useUserProfileStore();
    const toast = useToast();

    const handleUnfollowUser = async (unfollowedUserId) => {
        if(!authUser) {
            return;
        }

        setIsUpdating(true);

        try{
            const followingRef = doc(collection(db, "users", authUser.uid, "following"), unfollowedUserId);
            const followerRef = doc(collection(db, "users", unfollowedUserId, "followers"), authUser.uid);
            const unfollowedUserRef = doc(db, "users", unfollowedUserId);

            await runTransaction(db, async (transaction) => {
                transaction.delete(followingRef);
                transaction.delete(followerRef);

                //Decrement counts
                transaction.update(unfollowedUserRef, { followerCount: increment(-1)});

            });

            if(!toast.isActive("UnfollowUserSucess")) {
                toast({
                    id: "UnfollowUserSucess",
                    title: "Deixou de seguir com sucesso",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top-left",
                });
            }

            useUserProfileStore.getState().setFollowStatus(false);
            
        } catch (error) {
            if(!toast.isActive("UnfollowError")) {
                toast({
                    id: "UnfollowError",
                    title: "Erro na tentativa de deixar de seguir o missionário",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-left",
                });
            }
        } finally {
            setIsUpdating(false);
        }
    };

    return {isUpdatingUnfollow, handleUnfollowUser};
}

export default useUnfollowUser;