import { createUserWithEmailAndPassword} from "firebase/auth";
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
        if(!inputs.emailForm || !inputs.password || !inputs.phoneNumber || !inputs.username || !inputs.fullName || !inputs.agencyPhone ||
            !inputs.pastorName || !inputs.pastorPhone || !inputs.missionaryAgency || !inputs.faithCommunity) {
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
        const emailQuery = query(usersRef, where("email", "==", inputs.emailForm));
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
            const newUser = await createUserWithEmailAndPassword(auth, inputs.emailForm, inputs.password);
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
                    email: inputs.emailForm,
                    phoneNumber: inputs.phoneNumber || "", 
                    username: inputs.username,
                    fullName: inputs.fullName,
                    faithCommunity: inputs.faithCommunity,
                    pastorName: inputs.pastorName,
                    pastorPhone: inputs.pastorPhone || "",
                    churchPhone: inputs.churchPhone || "",
                    missionaryAgency: inputs.missionaryAgency,
                    agencyPhone: inputs.agencyPhone || "",
                    publicEmail: "",
                    publicPhone: "",
                    bio: "",
                    profilePicture: "",
                    createdAt: serverTimestamp(),
                };

                const userCreationPromise = new Promise(async (resolve, reject) => {
                    try{
                        //Adiciona o documento do usuário ao Firestore
                        await setDoc(doc(db, "users", newUser.user.uid), userDoc);

                        // Ensure pastor fields are not undefined
                        const pastorData = {
                            pastorName: inputs.pastorName || "",
                            pastorPhone: inputs.pastorPhone || "",
                            faithCommunity: inputs.faithCommunity || "",
                            churchPhone: inputs.churchPhone || "",
                            pastorOf: userDoc.uid
                        };

                        // Create a unique ID for the pastor
                        const pastorDocRef = doc(collection(db, "pastors"));
                        await setDoc(pastorDocRef, pastorData);

                        // Ensure church fields are not undefined
                        const churchData = {
                            faithCommunity: inputs.faithCommunity || "",
                            churchPhone: inputs.churchPhone || "",
                            churchOf: userDoc.uid
                        };

                        // Create a unique ID for the church
                        const churchDocRef = doc(collection(db, "churches"));
                        await setDoc(churchDocRef, churchData);

                        const answer = await fetch('/api/generateResetLink', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email: inputs.emailForm }),
                        });
                        
                        if (!answer.ok) {
                            let errorData = { message: 'Unknown error' };
                            try {
                                const text = await answer.text();
                                if (text) {
                                    errorData = JSON.parse(text);
                                }
                            } catch (e) {
                                console.error("Failed to parse error response:", e);
                            }
                            console.error("Error generating reset link:", errorData);
                            throw new Error(`Network response was not ok: ${errorData.message}`);
                        }
                        
                        const { resetLink } = await answer.json();


                        const msg = {
                            personalizations: [
                              {
                                to: [{ email: inputs.emailForm }],
                                subject: "Mission App - Parabéns !",
                              },
                            ],
                            from: { email: 'ph_amaro@id.uff.br' },
                            content: [
                              {
                                type: 'text/plain',
                                value: `Parabéns, você foi aceito na plataformar. Por favor, clique no link para definir sua senha: 
                                ${resetLink}`,
                              },
                            ],
                          };

                          const response = await fetch('/api/sendgrid', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(msg),
                        });

                        if (!response.ok) {
                            let errorData = { message: 'Unknown error' };
                            try {
                                const text = await response.text();
                                if (text) {
                                    errorData = JSON.parse(text);
                                }
                            } catch (e) {
                                console.error("Failed to parse error response:", e);
                            }
                            console.error("Error sending email:", errorData);
                            throw new Error(`Network response was not ok: ${errorData.message}`);
                        }

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
