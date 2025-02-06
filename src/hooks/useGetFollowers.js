import { useState } from "react";
import useAuthStore from "../store/authStore";
import { useToast } from "@chakra-ui/react";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../utils/firebase";


function useGetFollowers() {
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const authUser = useAuthStore((state) => state.user);
  const toast = useToast();

  const getFollowers = async () => {
    if(!authUser) {
        if(!toast.isActive("noAuth")) {
            toast({
                id: "noAuth",
                title: "Usuário não autenticado",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-left",
            });
        }
        return;
    }

    setIsLoading(true);

    try {
        const followersColRef = collection(db, "users", authUser.uid, "followers");

        let followersQuery;
        if(lastDoc) {
            followersQuery = query(followersColRef,
                orderBy("followedAt", "desc"),
                startAfter(lastDoc),
                limit(4)
            );
        } else {
            followersQuery = query(
                followersColRef,
                orderBy("followedAt", "desc"),
                limit(4)
            );
        }

        const snapshot = await getDocs(followersQuery);

        if(snapshot.empty) {
            if(!toast.isActive("noFollowers")) {
                toast({
                    id: "noFollowers",
                    title: "Não há mais seguidores",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                    position: "top-left",
                });
            }
            setIsLoading(false);
            return;
        }

        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        setLastDoc(lastVisible);

        if(snapshot.docs.length < 4) {
            setHasMore(false);
        }

        const followerPromises = snapshot.docs.map(async (docSnapshot) => {
            const followerUid = docSnapshot.id;
            const userDocRef = doc(db, "users", followerUid);
            const userDoc = await getDoc(userDocRef);
            if(userDoc.exists()) {
                return userDoc.data();
            }
            return null;
        });

        const followersData = await Promise.all(followerPromises);
        const validFollowers = followersData.filter((f) => f !== null);

        setFollowers((prev) => [...prev, ...validFollowers]);
    } catch (error) {
        if(toast.isActive("followersError")){
            toast({
                id: "followersError",
                title: "Erro ao carregar seguidores",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
        }
    } finally {
        setIsLoading(false);
    }
  };

  return {getFollowers, followers, isLoading, hasMore};

}

export default useGetFollowers;