import { useState } from "react";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, Timestamp } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useToast } from "@chakra-ui/react";

const PAGINATION_LIMIT = 4;
const POST_QUANTITY_LIMIT = 12;

function useGetUserPosts () {
    const [isLoading, setIsLoading] = useState(false);
    const storedLastDoc = localStorage.getItem('lastDocId');
    const lastDoc = storedLastDoc ? Timestamp.fromMillis(JSON.parse(storedLastDoc)) : null;
    const toast = useToast(); 

    const getUserPosts = async (userProfile, addPost, postsData, postCount, hasVisited) => {

        if(!userProfile.uid) {
            return false;
        }

        if(isLoading || !userProfile) {
            if (!toast.isActive("noAuth")) {
                toast({
                  id: "noAuth",
                  title: "Usuário não autenticado",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                  position: "top-left",
                });
            }
            return false;
        }

        const loadMoreData = localStorage.getItem("loadMoreData");

        if(loadMoreData === null || loadMoreData === true) {
            //Execute getUserPosts
        } else if(loadMoreData === "false") {
            return false;
        }

        setIsLoading(true);

        try{
            const postsColRef = collection(db, "personalPosts", userProfile.uid, "posts");

            let postsQuery;
            if(lastDoc) {
                postsQuery = query(
                    postsColRef, 
                    orderBy("createdAt", "desc"), 
                    startAfter(lastDoc), 
                    limit(PAGINATION_LIMIT)
                );
            } else {
                postsQuery = query(
                    postsColRef, 
                    orderBy("createdAt", "desc"), 
                    limit(PAGINATION_LIMIT)
                );
            }

            const snapshot = await getDocs(postsQuery);

            const check = localStorage.getItem("hasVisitedMeuFeed") === "true";

            if((snapshot.empty || !snapshot) && check) {
                return false;
            } else if ((snapshot.empty || !snapshot) && !check) {
                localStorage.setItem("noPosts", "true");
                return false;
            }

            const lastVisible = snapshot.docs[snapshot.docs.length - 1];
            if(lastVisible) {
                const lastVisibleTimeStamp = lastVisible.data().createdAt.toMillis();
                localStorage.setItem('lastDocId', JSON.stringify(lastVisibleTimeStamp));

            }

            const data = snapshot.docs.map((docSnapShot) => docSnapShot.data());

            let size = postsData ? postsData.length : 0;

            size = size + data.length;

            addPost(data, (updatedPosts) => {
                // Update the postsData state with the new post
            });

            const totalPosts = parseInt(postCount, 10) || 0;

            localStorage.setItem("noPosts", "false");

            return {size, totalPosts};

        } catch(error) {
            if (!toast.isActive("postsError")) {
                toast({
                  id: "postsError",
                  title: "Erro ao buscar postagens",
                  description: error.message,
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                  position: "top-left",
                });
            }
            setIsLoading(false);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { getUserPosts, isLoading };
}

export default useGetUserPosts;