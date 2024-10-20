import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../utils/firebase';


function useResetPassword() {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const resetPassword = async (email) => {
        setLoading(true);
        setError(null);
        try{
            await sendPasswordResetEmail(auth, email, {
                url: 'http://localhost:5173/resetPassword'
            });
            toast({
                title: "Success",
                description: "Senha de redefinição enviada com sucesso",
                status: "success",
                duration: 8000,
                isClosable: true,
                position: "top"
            });
        } catch (error) {
            toast({
                title: "Erro",
                description: error.message,
                status: "error",
                duration: 8000,
                isClosable: true,
                position: "top"
            });
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { resetPassword, loading, error };
}

export default useResetPassword;