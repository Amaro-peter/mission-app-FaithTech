import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@chakra-ui/react";
import { db, storage } from "../utils/firebase";
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import { collection, deleteDoc, doc, getDocs, increment, limit, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const POST_QUANTITY_LIMIT = 12;

function useCreatePost() {
    const [isCreating, setIsCreating] = useState(false);

    const authUser = useAuth();

    const toast = useToast();
    
    const createPost = async (inputs, selectedFile, addPost, removePost, postsData, postCount, replaceLast) => {
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

        let totalPosts = postCount;

        let size = postsData.length;

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

            if(!replaceLast) {
                size = size + 1;

                totalPosts = totalPosts + 1;
            }
            
            addPost(newPost, (updatedPosts) => {
                
            });
            
            if (postsData && size > 4) {
                const lastElement = postsData[size - 1];
                if (lastElement && lastElement.createdAt) {
                    const lastVisibleTimeStamp = lastElement.createdAt.toMillis();
                    localStorage.setItem('lastDocId', JSON.stringify(lastVisibleTimeStamp));
                }
            }

            if(replaceLast) {
                const postsQuery = query(
                    collection(userDocRef, "posts"), 
                    orderBy("createdAt", "asc"),
                    limit(1)
                );
                const querySnapshot = await getDocs(postsQuery);
                if(!querySnapshot.empty) {
                    for (const doc of querySnapshot.docs) {
                        const oldestPost = doc.data();
                        if (oldestPost.imageURL) {
                            const oldImageRef = ref(storage, `postPics/${authUser.uid}/${oldestPost.uniqueId}`);
                            await deleteObject(oldImageRef);
                        }
                        await deleteDoc(doc.ref);
                    }

                    if(size === POST_QUANTITY_LIMIT) {
                        removePost(totalPosts - 1);
                    }

                } else {
                    if(!toast.isActive("noPostError")) {
                        toast({
                            id: "noPostError",
                            title: "Nenhum post encontrado",	
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                            position: "top"
                        });
                    }
                    return false;
                }
            } else {
                const userRef = doc(db, "users", authUser.uid);
                await updateDoc(userRef, {
                    postCount: increment(1)
                });
                localStorage.setItem("postCount", totalPosts);
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

            localStorage.setItem("noPosts", "false");

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