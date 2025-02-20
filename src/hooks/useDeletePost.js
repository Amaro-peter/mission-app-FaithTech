import { useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../utils/firebase";
import { collection, deleteDoc, doc, getDocs, increment, limit, orderBy, query, startAfter, Timestamp, updateDoc } from "firebase/firestore";
import useGetUserPosts from "./useGetUserPosts";
import { PostDataContext } from "../context/PostDataContext";


function useDeletePost(){
    const [isDeleting, setIsDeleting] = useState(false);
    const toast = useToast();
    const authUser = useAuth();
    const { postsData, addPost, removePost } = useContext(PostDataContext);

    const deletePost = async (post, postIndex, setPostCount) => {

        if(isDeleting || !authUser) {
            return;
        }

        setIsDeleting(true);

        try{
            const postRef = doc(db, "personalPosts", authUser.uid, "posts", post.uniqueId);
            
            if(post.imageURL !== "") {
                const imageRef = ref(storage, `postPics/${authUser.uid}/${post.uniqueId}`);
                await deleteObject(imageRef);
            }

            await deleteDoc(postRef);

            const lastDocId = localStorage.getItem("lastDocId");
            const isLast = lastDocId && postsData[postIndex].createdAt.toMillis() === JSON.parse(lastDocId);
            if(isLast) {
                localStorage.removeItem("lastDocId");
            }

            let size = postsData.length;

            removePost(postIndex);

            size = size - 1;

            if(size < 3 && size >= 1) {
                localStorage.setItem("hasMore", "false");
                return;
            } else if (size === 0) {
                localStorage.setItem("noPosts", "true");
                localStorage.setItem("hasMore", "false");
                return;
            }

            if((localStorage.getItem("hasMore") === "true") && isLast) {
                const newLastDoc = Timestamp.fromMillis(postsData[size - 1].createdAt.toMillis());
                const postsColRef = collection(db, "personalPosts", authUser.uid, "posts");
                let postsQuery = null;
                postsQuery = query(
                    postsColRef,
                    orderBy("createdAt", "desc"),
                    startAfter(newLastDoc),
                    limit(1)
                );
                const snapshot = await getDocs(postsQuery);

                const check = localStorage.getItem("hasVisitedMeuFeed") === "true";

                if((snapshot.empty || !snapshot) && check) {
                    localStorage.setItem("hasMore", "false");
                    return;
                } else if ((snapshot.empty || !snapshot) && !check) {
                    localStorage.setItem("noPosts", "true");
                    localStorage.setItem("hasMore", "false");
                    return;
                }

                const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                if(lastVisible) {
                    const lastVisibleTimeStamp = lastVisible.data().createdAt.toMillis();
                    localStorage.setItem('lastDocId', JSON.stringify(lastVisibleTimeStamp));
                }
    
                const data = snapshot.docs.map((docSnapShot) => docSnapShot.data());
    
                addPost(data);

            } else if ((localStorage.getItem("hasMore") === "true") && !isLast) {
                const newLastDoc = Timestamp.fromMillis(postsData[size].createdAt.toMillis());
                const postsColRef = collection(db, "personalPosts", authUser.uid, "posts");
                let postsQuery = null;
                postsQuery = query(
                    postsColRef,
                    orderBy("createdAt", "desc"),
                    startAfter(newLastDoc),
                    limit(1)
                );
                const snapshot = await getDocs(postsQuery);

                const check = localStorage.getItem("hasVisitedMeuFeed") === "true";

                if((snapshot.empty || !snapshot) && check) {
                    localStorage.setItem("hasMore", "false");
                    return;
                } else if ((snapshot.empty || !snapshot) && !check) {
                    localStorage.setItem("noPosts", "true");
                    localStorage.setItem("hasMore", "false");
                    return;
                }

                const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                if(lastVisible) {
                    const lastVisibleTimeStamp = lastVisible.data().createdAt.toMillis();
                    localStorage.setItem('lastDocId', JSON.stringify(lastVisibleTimeStamp));
                }
    
                const data = snapshot.docs.map((docSnapShot) => docSnapShot.data());
    
                addPost(data);
            }

            const userRef = doc(db, "users", authUser.uid);
            await updateDoc(userRef, {
                postCount: increment(-1)
            });

            setPostCount((prevCount) => prevCount - 1);

            if (!toast.isActive("postDeleted")) {
                toast({
                    id: "postDeleted",
                    title: "Postagem deletada",
                    description: "Sua postagem foi deletada com sucesso.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
            }
        } catch(error) {
            if (!toast.isActive("postDeleteError")) {
                toast({
                    id: "postDeleteError",
                    title: "Erro ao deletar postagem",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
            }
        } finally {
            setIsDeleting(false);
        }
    };
    return {deletePost, isDeleting};
}

export default useDeletePost;