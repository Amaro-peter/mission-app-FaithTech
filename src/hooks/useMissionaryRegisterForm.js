import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function useMissionaryRegisterForm() {
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (inputs) => {
    setLoading(true);
    if (!inputs.emailForm || !inputs.password || !inputs.username || !inputs.fullName) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setErrorMessage("Por favor, preencha todos os campos");
      setLoading(false);
      return { success: false, error: "Por favor, preencha todos os campos" };
    }
    const usersRef = collection(db, "users");

    // Create a query against the collection to verify if username is already in use
    const q = query(usersRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      toast({
        title: "Erro",
        description: "Nome de usuário já está em uso",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setErrorMessage("Nome de usuário já está em uso");
      setLoading(false);
      return { success: false, error: "Nome de usuário já está em uso" };
    }

    try{
        const msg = {
          personalizations: [
            {
              to: [{ email: 'billy1ralf@gmail.com' }],
              subject: `Novo missionário - ${inputs.fullName}`,
            },
          ],
          from: { email: 'ph_amaro@id.uff.br' },
          content: [
            {
              type: 'text/plain',
              value: `Um novo missionário pediu para se cadastrar:
              Email: ${inputs.emailForm}
              Nome de usuário: ${inputs.username}
              Nome completo: ${inputs.fullName}
              Comunidade de fé: ${inputs.faithCommunity}
              Agência missionária: ${inputs.missionaryAgency}`,
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

        toast({
            title: "Success",
            description: "Informações enviadas com sucesso",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        setLoading(false);
        return { success: true };

    } catch (error) {
        console.error("Network error:", error);
        toast({
            title: "Erro",
            description: "Falha ao enviar email",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
        });
        setErrorMessage(error.message);
        setLoading(false);
        return { success: false, error };
    }
  };

  return { signUp, errorMessage, setErrorMessage, loading };
}

export default useMissionaryRegisterForm;