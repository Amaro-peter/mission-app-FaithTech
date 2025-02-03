import { useToast } from "@chakra-ui/react";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../utils/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import useUserProjectStore from "../store/useProjectStore";


function useDeleteProject() {
    const [isDeleting, setIsDeleting] = useState(false);
    const setUserProject = useUserProjectStore((state) => state.setUserProject);
    const toast = useToast();
    const navigate = useNavigate();

    const deleteProject = async (authUser) => {
        if(isDeleting || !authUser) {
            return;
        }

        setIsDeleting(true);

        const storageRef = ref(storage, `projectPics/${authUser.uid}`);
        const userProjectRef = doc(db, "users", authUser.uid, "project", "projectDoc");
        const projectsSummaryRef = doc(db, "projectsSummary", authUser.uid);

        try{
            await deleteObject(storageRef);

            await deleteDoc(userProjectRef);
            await deleteDoc(projectsSummaryRef);

            if(!toast.isActive("projectDeleted")) {
                toast({
                    id: "projectDeleted",
                    title: "Projeto deletado",
                    description: "Seu projeto foi deletado com sucesso.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                });
            }
            setUserProject(null);
            navigate(`/${authUser.username}`);
        } catch(error) {
            if(!toast.isActive("projectDeleteError")) {
                toast({
                    id: "projectDeleteError",
                    title: "Erro",
                    description: "Houve um erro ao deletar seu projeto",
                    status: "error",
                    duration: 5000, 
                    isClosable: true,
                    position: "top"
                });
            }
        } finally {
            setIsDeleting(false);
        }
    };

    return {deleteProject, isDeleting};
}

export default useDeleteProject;