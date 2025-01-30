import { useToast } from "@chakra-ui/react";
import { useState } from "react";


function usePreviewImage () {
    const [selectedFile, setSelectedFile] = useState(null);
    const toast = useToast();
    const maxSizeInBytes = 30 * 1024 * 1024; // 30MB

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file && file.type.startsWith("image/")) {
            if(file.size > maxSizeInBytes) {
                toast({
                    title: "Imagem muito grande",
                    description: "Por favor, selecione uma imagem menor que 30MB",
                    status: "error",
                    duration: 9000,
                    isClosable: true
                });
                setSelectedFile(null);
                return;
            }
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedFile(reader.result);
            };

            reader.readAsDataURL(file);

        } else {
            toast({
                title: "Formato inválido",
                description: "Por favor, selecione uma imagem válida",
                status: "error",
                duration: 9000,
                isClosable: true
            });
            setSelectedFile(null);
        }
    };

    return {selectedFile, handleImageChange, setSelectedFile};
}

export default usePreviewImage;