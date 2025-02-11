import { Button } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

function Return () {
    const location = useLocation();
    const navigate = useNavigate();

    const isEditPage = location.pathname.includes('/EditHeader') || location.pathname.includes('/EditProject');

    if(isEditPage) {
        return null;
    }

    return (
        <Button
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mb={1}
        mt={1}
        onClick={() => navigate(-1)}
        >
            <IoIosArrowBack />
        </Button>
    );
}

export default Return;