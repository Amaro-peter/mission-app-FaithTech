import { createUserWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@chakra-ui/react"
import { useState } from "react"
import { auth, db } from "../utils/firebase";
import { collection, doc, getDocs, query, setDoc, where, serverTimestamp } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

function useAdminRegistrationWithEmailAndPassword() {
    const toast = useToast();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signUp = async (inputs) => {
        setLoading(true);
        if(!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
            toast({
                title: "Erro",
                description: "Por favor, preencha todos os campos",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            setErrorMessage("Por favor, preencha todos os campos");
            setLoading(false);
            return { success: false, error };
        }
        const usersRef = collection(db, "users");
    
        // Create a query against the collection to verify if username is already in use
        const usernameQuery = query(usersRef, where("username", "==", inputs.username));
        const usernameSnapshot = await getDocs(usernameQuery);

        if (!usernameSnapshot.empty) {
            toast({
                title: "Erro",
                description: "Nome de usuário já está em uso",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setErrorMessage("Nome de usuário já está em uso");
            setLoading(false);
            return { success: false, error: "Nome de usuário já está em uso" };
        }

        // Create a query against the collection to verify if email is already in use
        const emailQuery = query(usersRef, where("email", "==", inputs.email));
        const emailSnapshot = await getDocs(emailQuery);

        if (!emailSnapshot.empty) {
            toast({
                title: "Erro",
                description: "Email já está em uso",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setErrorMessage("Email já está em uso");
            setLoading(false);
            return { success: false, error: "Email já está em uso" };
        }

        try{
            const newUser = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
            if(!newUser) {
                toast({
                    title: "Erro",
                    description: "Email já está em uso",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                })
                setErrorMessage("Email já está em uso");
                setLoading(false);
                return { success: false, error };
            }
            if(newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    role: "missionary",
                    email: inputs.email,
                    username: inputs.username,
                    fullName: inputs.fullName,
                    faithCommunity: inputs.faithCommunity,
                    missionaryAgency: inputs.missionaryAgency,
                    bio: "",
                    profilePicture: "",
                    createdAt: serverTimestamp(),
                };

                const userCreationPromise = new Promise(async (resolve, reject) => {
                    try{
                        //Adiciona o documento do usuário ao Firestore
                        await setDoc(doc(db, "users", newUser.user.uid), userDoc);

                        //Cria as subcoleções de seguidores, seguindo e posts
                        await setDoc(doc(db, "followers", newUser.user.uid), {});
                        await setDoc(doc(db, "following", newUser.user.uid), {});
                        await setDoc(doc(db, "posts", newUser.user.uid), {});

                        resolve("Conta criada com sucesso");
                    } catch (error) {
                        reject("Falha ao criar conta");
                    }
                });

                toast.promise(userCreationPromise, {
                    success: { title: 'Success', description: 'Conta criada com sucesso', status: 'success', duration: 7000, isClosable: true, position: 'top' },
                    error: { title: 'Erro', description: 'Falha ao criar conta', status: 'error', duration: 9000, position: 'top' },
                    loading: { title: 'Criando conta', description: 'Por favor, espere', isClosable: true, position: 'top' },
                });
                await userCreationPromise;
                setLoading(false);
                navigate("/adminMissionarySignUpSucess");
                return { success: true}; 
            }
        } catch(error) {
            toast({
                title: "Erro",
                description: "Email ou nome de usuário já estão em uso",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            setErrorMessage(error.message);
            setLoading(false);
            return { success: false, error };
        }
    } 

    return {signUp, errorMessage, setErrorMessage, loading};
      
}

export default useAdminRegistrationWithEmailAndPassword;
