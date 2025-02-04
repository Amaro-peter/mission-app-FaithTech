import { useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/useProfileStore";
import { useToast } from "@chakra-ui/react";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { storage, db } from "../utils/firebase";
import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function useEditHeader() {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const toast = useToast();
    const navigate = useNavigate();

    const editProject = async (inputs, selectedFile) => {

        if(inputs.title === "" || inputs.description === "") {
            if(!toast.isActive("inputsProjectError")) {
                toast({
                    id: "inputsProjectError",
                    title: "Preencha todos os campos",
                    description: "Por favor, preencha o título e a descrição do projeto.",	
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                });
            }
            return;
        }

        if(!selectedFile && inputs.publicPhoto === "") {
            if(!toast.isActive("noImage")) {
                toast({
                    id: "noImage",
                    title: "Selecione uma imagem",
                    description: "Por favor, selecione uma imagem para o projeto.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                });
            }
            return;
        }

        if(isUpdating || !authUser) {
            return;
        }

        if(inputs.publicYoutubeLink) {
            const regex = /^(https:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/)|https:\/\/youtu\.be\/)[\w-]+(?:\?t=\d+|&t=\d+|&[\w-]+=[\w-]+)*$/;
            if(!regex.test(inputs.publicYoutubeLink)){
                if(!toast.isActive("invalidYoutubeLink")) {
                    toast({
                    id: "invalidYoutubeLink",
                    title: "Link inválido",
                    description: "Insira um link válido do Youtube.",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                    });
                }
                return;
            }
        }

        if(inputs.publicYoutubeLink) {
            const youtubeLink = inputs.publicYoutubeLink;
            const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\?t=\d+)?$/;
            const match = youtubeLink.match(regex);
            
            if(match) {
                inputs.publicYoutubeLink = `https://www.youtube.com/embed/${match[1]}`;
            }
        }

        setIsUpdating(true);

        const storageRef = ref(storage, `projectPics/${authUser.uid}`);
        const userProjectRef = doc(db, "users", authUser.uid, "project", "projectDoc");
        const projectsSummaryRef = doc(db, "projectsSummary", authUser.uid);

        let URL = "";

        try{
            if(selectedFile) {
                await uploadString(storageRef, selectedFile, "data_url");
                URL = await getDownloadURL(ref(storage, `projectPics/${authUser.uid}`));
            }

            const newProject = {
                title: inputs.title || "",
                description: inputs.description || "",
                publicYoutubeLink: inputs.publicYoutubeLink || "",
                publicPhoto: URL !== "" ? URL : inputs.publicPhoto
            };

            await setDoc(userProjectRef, newProject, {merge: true});
            await setDoc(projectsSummaryRef, newProject, {merge: true});

            if(!toast.isActive("projectUpdated")) {
                toast({
                    id: "projectUpdated",
                    title: "Projeto definido",
                    description: "Seu projeto foi definido com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                });
            }
            navigate(`/${authUser.username}`);
        } catch(error) {
            if(!toast.isActive("projectUpdateError")) {
                toast({
                    id: "projectUpdateError",
                    title: "Erro",
                    description: "Houve um erro ao definir seu projeto",
                    status: "error",
                    duration: 5000, 
                    isClosable: true,
                    position: "top"
                });
            }
        } finally {
            setIsUpdating(false);
        }
    };

    return {editProject, isUpdating};
}

export default useEditHeader;