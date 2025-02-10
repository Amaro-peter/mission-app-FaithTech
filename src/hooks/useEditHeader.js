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
    {/*const userProfile = useUserProfileStore((state) => state.userProfile);
    const {setUserProfile} = useUserProfileStore();*/}
    const toast = useToast();
    const navigate = useNavigate();

    const editHeader = async (inputs, selectedFile) => {
        if(isUpdating || !authUser) {
            return;
        }

        setIsUpdating(true);
        let completed = false;

        if(inputs.username) {
            if(inputs.username.includes("_missionary")) {
                setIsUpdating(false);
                if(!toast.isActive("reservedWordWarning")) {
                    toast({
                        id: "reservedWordWarning",
                        title: "Palavra reservada",
                        description: "O nome de usuário não pode conter '_missionary' pois é uma palavra reservada",
                        status: "warning",
                        duration: 8000,
                        isClosable: true,
                        position: "top"
                    });
                }
                return;
            }
        }

        const updatedUsername = inputs.username && inputs.username !== authUser.username ? 
            inputs.username + "_missionary" : authUser.username;

        if(updatedUsername !== authUser.username) {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", updatedUsername));
            const querySnapshot = await getDocs(q);
            if(!querySnapshot.empty) {
                setIsUpdating(false);
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
                username: updatedUsername,
                fullName: inputs.fullName || authUser.fullName,
                bio: inputs.bio || authUser.bio,
                publicEmail: inputs.publicEmail || authUser.publicEmail,
                publicPhone: inputs.publicPhone || authUser.publicPhone,
                profilePicture: URL || authUser.profilePicture,
            };

            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem("user-info", JSON.stringify(updatedUser));
            setAuthUser({...updatedUser});
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
            completed = true;
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
            if(completed) {
                navigate(`/${updatedUsername}`);
            }
        }
    };

    return {editHeader, isUpdating};
}

export default useEditHeader;