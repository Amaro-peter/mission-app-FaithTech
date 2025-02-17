import { useState } from "react";
import { collection, getDocs, limit, orderBy, query, startAfter, Timestamp } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useToast } from "@chakra-ui/react";


function useGetUserPosts () {
    const [isLoading, setIsLoading] = useState(false);
    const storedLastDoc = localStorage.getItem('lastDocId');
    const lastDoc = storedLastDoc ? Timestamp.fromMillis(JSON.parse(storedLastDoc)) : null;
    console.log(lastDoc);
    const toast = useToast(); 

    const getUserPosts = async (userProfile, addPost) => {

        if(!userProfile.uid) {
            return;
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
            console.log("Overhead");
            const postsColRef = collection(db, "personalPosts", userProfile.uid, "posts");

            let postsQuery;
            if(lastDoc) {
                postsQuery = query(
                    postsColRef, 
                    orderBy("createdAt", "desc"), 
                    startAfter(lastDoc), 
                    limit(4)
                );
            } else {
                postsQuery = query(
                    postsColRef, 
                    orderBy("createdAt", "desc"), 
                    limit(4)
                );
            }

            const snapshot = await getDocs(postsQuery);

            if(snapshot.empty && (localStorage.getItem("hasVisitedMeuFeed") === "true")) {
                setIsLoading(false);
                localStorage.setItem("hasMore", "false");
                return;
            } else if (snapshot.empty && (localStorage.getItem("hasVisitedMeuFeed") === "false")) {
                setIsLoading(false);
                localStorage.setItem("noPosts", "true");
                localStorage.setItem("hasMore", "false");
                return;
            }

            const lastVisible = snapshot.docs[snapshot.docs.length - 1];
            const lastVisibleTimeStamp = lastVisible.data().createdAt.toMillis();
            console.log(lastVisibleTimeStamp)
            localStorage.setItem('lastDocId', JSON.stringify(lastVisibleTimeStamp));

            if(snapshot.docs.length < 4) {
                localStorage.setItem("hasMore", "false");
            } else {
                localStorage.setItem("hasMore", "true");
            }

            const data = snapshot.docs.map((docSnapShot) => docSnapShot.data());

            addPost(data);

            localStorage.setItem("noPosts", "false");

            return true;

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