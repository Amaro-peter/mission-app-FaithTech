import { useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/useProfileStore";
import { useToast } from "@chakra-ui/react";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { storage, db } from "../utils/firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { use } from "react";
import { useNavigate } from "react-router-dom";

function useEditHeader() {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
    const toast = useToast();
    const navigate = useNavigate();

    const editHeader = async (inputs, selectedFile) => {
        if(isUpdating || !authUser) {
            return;
        }

        if(inputs.username !== authUser.username) {
            const usersRef = collection(db, "users");

            const q = query(usersRef, where("username", "==", inputs.username));
            const querySnapshot = await getDocs(q);
            if(!querySnapshot.empty) {
                if(!toast.isActive("usernameTaken")) {
                    toast({
                        id: "usernameTaken",
                        title: "Nome de usuário já existe",
                        description: "Escolha um nome de usuário diferente",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "top"
                    });
                }
                return;
            }
        }

        setIsUpdating(true);

        const storageRef = ref(storage, `profilePics/${authUser.uid}`);
        const userDocRef = doc(db, "users", authUser.uid);

        let URL = "";

        try{
            if(selectedFile) {
                await uploadString(storageRef, selectedFile, "data_url");
                URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
            }

            const updatedUser = {
                ...authUser,
                username: inputs.username || authUser.username,
                fullName: inputs.fullName || authUser.fullName,
                bio: inputs.bio || authUser.bio,
                publicEmail: inputs.publicEmail || authUser.publicEmail,
                publicPhone: inputs.publicPhone || authUser.publicPhone,
                profilePicture: URL || authUser.profilePicture,
            };

            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setAuthUser({...updatedUser});
            setUserProfile({...updatedUser});
            if(!toast.isActive("profileUpdated")) {
                toast({
                    id: "profileUpdated",
                    title: "Perfil atualizado",
                    description: "Seu perfil foi atualizado com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                });
            }
            navigate(`/${updatedUser.username}`);
        } catch(error) {
            if(!toast.isActive("profileUpdateError")) {
                toast({
                    id: "profileUpdateError",
                    title: "Erro",
                    description: "Houve um erro ao atualizar seu perfil",
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

    return {editHeader, isUpdating};
}

export default useEditHeader;