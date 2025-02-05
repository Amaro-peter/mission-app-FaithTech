import { useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/useProfileStore";
import { useToast } from "@chakra-ui/react";
import { collection, doc, increment, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebase";


function useFollowUser () {
    const [isUpdatingFollow, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const {userProfile, setUserProfile} = useUserProfileStore();
    const toast = useToast();

    const handleFollowUser = async (followedUserId) => {
        if(!authUser) {
            return;
        }

        setIsUpdating(true);

        try{
            const followingUserRef = doc(collection(db, "users", authUser.uid, "following"), followedUserId);
            const followersUserRef = doc(collection(db, "users", followedUserId, "followers"), authUser.uid);
            const followedUserRef = doc(db, "users", followedUserId);

            await runTransaction(db, async (transaction) => {
                transaction.set(followingUserRef, { uid: followedUserId, followedAt: serverTimestamp()});
                transaction.set(followersUserRef, { uid: authUser.uid, followedAt: serverTimestamp()});

                //Increment counts
                transaction.update(followedUserRef, { followerCount: increment(1)});
            });

            if(!toast.isActive("followUserSucess")) {
                toast({
                    id: "followUserSucess",
                    title: "Missionário Seguido com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-left",
                });
            }
            useUserProfileStore.getState().setFollowStatus(true);

        } catch(error) {
            if(!toast.isActive("followUserError")) {
                toast({
                    id: "followUserError",
                    title: "Error following user",
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

    return {handleFollowUser, isUpdatingFollow};
}

export default useFollowUser;