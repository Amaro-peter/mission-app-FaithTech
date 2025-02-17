import { useToast } from "@chakra-ui/react";
import { useState } from "react";


function compressImage(imageFile, quality = 0.75) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0, img.width, img.height);

                canvas.toBlob(
                    (blob) => {
                        if(blob) {
                            const compressedFile = new File([blob], "compressed-image.webp", {
                                type: "image/webp",
                            });
                            resolve(compressedFile);
                        } else {
                            reject(new Error("Failed to compress image"));
                        }
                    },
                    "image/webp",
                    quality
                );
            };
        };
        reader.onerror = (error) => reject(error);
    });
}


function usePreviewImage () {
    const [selectedFile, setSelectedFile] = useState(null);
    const toast = useToast();
    const maxSizeInBytes = 7 * 1024 * 1024; // 5MB
    const maxCompressedSizeInBytes = 4 * 1024 * 1024; // 4MB

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if(file && file.type.startsWith("image/")) {
            if(file.size > maxSizeInBytes) {
                toast({
                    title: "Imagem muito grande",
                    description: "Por favor, selecione uma imagem menor que 5MB",
                    status: "error",
                    duration: 9000,
                    isClosable: true
                });
                setSelectedFile(null);
                return;
            }

            try{
                const formData = new FormData();
                formData.append("image", file);
                const response = await fetch(`${window.location.origin}/api/compress`, {
                    method: "POST",
                    body: formData,
                });
                if(!response.ok) {
                    if(!toast.isActive("compressedImageError")) {
                        toast({
                            id: "compressedImageError",
                            title: "Erro ao comprimir imagem",
                            status: "error",
                            duration: 9000,
                            isClosable: true
                        });
                    }
                    setSelectedFile(null);
                    return;
                }
                const blob = await response.blob();
                if(blob.size > maxCompressedSizeInBytes) {
                    if(!toast.isActive("compressedBigImage")) {
                        toast({
                            id: "compressedBigImage",
                            title: "Imagem muito grande",
                            description: "Por favor, selecione uma imagem que possa ser comprimida para menos de 2MB",
                            status: "error",
                            duration: 9000,
                            isClosable: true
                        });
                    }
                    setSelectedFile(null);
                    return;
                }
                const reader = new FileReader();

                reader.onloadend = () => {
                    setSelectedFile(reader.result);
                };

                reader.readAsDataURL(blob);
            } catch(error) {
                if(!toast.isActive("compressedImageError")) {
                    toast({
                        id: "compressedImageError",
                        title: "Erro ao comprimir imagem",
                        status: "error",
                        duration: 9000,
                        isClosable: true
                    });
                }
                setSelectedFile(null);
            }
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