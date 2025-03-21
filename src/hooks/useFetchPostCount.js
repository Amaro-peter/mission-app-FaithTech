import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";


function useFetchPostCount() {
    const [isfetching, setIsFetching] = useState(false);

    const fetchPostCount = async ( userProfile ) => {

        if(!userProfile) {
            return false;
        }

        try{
            const userDoc = await getDoc(doc(db, "users", userProfile.uid));
            if(userDoc.exists()) {
                const totalPosts = userDoc.data().postCount || 0;
                localStorage.setItem("postCount", totalPosts);
            } else {
                localStorage.setItem("postCount", 0);
            }
        } catch(error) {
            console.error("Error fetching post count:", error);
        } finally{
            setIsFetching(false);
        }
    };

    return { fetchPostCount, isfetching };
}

export default useFetchPostCount;