import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@chakra-ui/react";
import { auth, db, storage } from "../utils/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';


function useCreatePost() {
    const [isCreating, setIsCreating] = useState(false);

    const authUser = useAuth();

    const toast = useToast();
    
    const createPost = async (inputs, selectedFile, addPost) => {
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
        let URL = "";

        try {
            if(selectedFile) {
                const uniqueId = uuidv4();
                const storageRef = ref(storage, `postPics/${authUser.uid}/${uniqueId}`);
                await uploadString(storageRef, selectedFile, "data_url");
                URL = await getDownloadURL(storageRef);
            }

            const newPost = {
                caption: inputs.caption || "",
                link: inputs.link || "",
                imageURL: URL,
                userId: authUser.uid,
                createdAt: serverTimestamp(),
            };
            
            const userDocRef = doc(db, "personalPosts", authUser.uid);
            await addDoc(collection(userDocRef, "posts"), newPost);
            
            addPost(newPost);

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