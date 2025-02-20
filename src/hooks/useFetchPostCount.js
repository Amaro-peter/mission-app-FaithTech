import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";


function useFetchPostCount() {
    const authUser = useAuth();
    const [isfetching, setIsFetching] = useState(false);

    const fetchPostCount = async (setPostCount, setGotPostCount) => {
        if(!authUser) {
            return false;
        }

        try{
            const userDoc = await getDoc(doc(db, "users", authUser.uid));
            if(userDoc.exists()) {
                setPostCount(userDoc.data().postCount || 0);
            } else {
                setPostCount(0);
            }
        } catch(error) {
            console.error("Error fetching post count:", error);
        } finally{
            setIsFetching(false);
            setGotPostCount(true);
        }
    };

    return { fetchPostCount, isfetching };
}

export default useFetchPostCount;