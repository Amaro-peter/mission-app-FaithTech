import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import useAuthStore from '../store/authStore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db} from "../utils/firebase";
import { doc, getDoc } from 'firebase/firestore';

function useLoginAdmin() {
    const toast = useToast();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loginUser = useAuthStore((state) => state.login);

    const login = async (inputs) => {
        setLoading(true); 
        setError(null);
        if(!inputs.email || !inputs.password) {
            toast({
                title: 'Error',
                description: 'Por favor, preencha todos os campos',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "top"
            })
            setError("Por favor, preencha todos os campos");
            setLoading(false);
            return{success: false, error};
        }
        try{
            const userCred = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
            if(userCred) {
                const docRef = doc(db, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);
                const userData = docSnap.data();

                if(userData?.role === "admin") {
                    localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
                    loginUser(docSnap.data());
                } else {
                    toast({
                        title: 'Error',
                        description: "Usuário não autorizado",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                        position: "top"
                    });
                    setError("Usuário não autorizado");
                    setLoading(false);
                    return {success: false, error};
                }
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: "Email ou senha incorretos",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "top"
            })
            setError("Email ou senha incorretos");
            setLoading(false);
            return{success: false, error};
        }
        setLoading(false);
        return
    }
    return {login, error, setError, loading};
}

export default useLoginAdmin;