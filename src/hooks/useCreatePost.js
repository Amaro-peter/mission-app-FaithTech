import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@chakra-ui/react";
import { db, storage } from "../utils/firebase";
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import { collection, deleteDoc, doc, getDocs, increment, limit, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';


function useCreatePost() {
    const [isCreating, setIsCreating] = useState(false);

    const authUser = useAuth();

    const toast = useToast();
    
    const createPost = async (inputs, selectedFile, addPost, setPostCount, replaceLast) => {
        if(isCreating || !authUser) {
            return false;
        }

        if(inputs.caption === "") {
            if(!toast.isActive("inputsPostError")) {
                toast({
                    id: "inputsPostError",
                    title: "Coloque uma legenda",
                    description: "Por favor, escreva uma legenda",	
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                });
            }
            return false;
        }

        setIsCreating(true);

        const uniqueId = uuidv4();
        let URL = "";

        try {
            if(selectedFile) {
                const storageRef = ref(storage, `postPics/${authUser.uid}/${uniqueId}`);
                try {
                    await uploadString(storageRef, selectedFile, "data_url");
                    URL = await getDownloadURL(storageRef);
                    if (!URL) {
                        throw new Error("Falha ao obter link da postagem");
                    }
                } catch (error) {
                    console.error("Error uploading file or getting download URL:", error);
                    throw new Error("Error uploading file or getting download URL");
                }
            }

            const newPost = {
                caption: inputs.caption || "",
                link: inputs.link || "",
                imageURL: URL,
                userId: authUser.uid,
                uniqueId: uniqueId,
                createdAt: serverTimestamp(),
            };
            
            const userDocRef = doc(db, "personalPosts", authUser.uid);
            await setDoc(doc(userDocRef, "posts", uniqueId), newPost);
            
            addPost(newPost);

            if(replaceLast) {
                const postsQuery = query(
                    collection(userDocRef, "posts"), 
                    orderBy("createdAt", "asc"),
                    limit(1)
                );
                const querySnapshot = await getDocs(postsQuery);
                querySnapshot.forEach(async (doc) => {
                    const oldestPost = doc.data();
                    if(oldestPost.imageURL) {
                        const oldImageRef = ref(storage, `postPics/${authUser.uid}/${oldestPost.uniqueId}`);
                        await deleteObject(oldImageRef);
                    }
                    await deleteDoc(doc.ref);
                });
            } else {
                const userRef = doc(db, "users", authUser.uid);
                await updateDoc(userRef, {
                    postCount: increment(1)
                });
                setPostCount((prev) => prev + 1);
            }

            if(!toast.isActive("postCreated")) {
                toast({
                    id: "postCreated",
                    title: "Postagem feita com sucesso!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-left",
                });
            }
            return true;
        } catch(error) {
            if(!toast.isActive("postError")) {
                toast({
                    id: "postError",
                    title: "Error creating post",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-left",
                });
            }
            return false;
        } finally {
            setIsCreating(false);
        }
    };

    return { createPost, isCreating };
};

export default useCreatePost;