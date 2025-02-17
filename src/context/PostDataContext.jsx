import { createContext, useState } from "react";


export const PostDataContext = createContext();

export const PostDataProvider = ({ children }) => {
    const [postsData, setPostsData] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const addPost = (post) => {
        if(Array.isArray(post)) {
            setPostsData((prevPosts) => [ ...prevPosts, ...post ]);
        } else {
            setPostsData((prevPosts) => [ post, ...prevPosts ]);
        }
        
    };

    const removePost = (index) => {
        setPostsData((prevPosts) => prevPosts.filter((_, i) => i !== index));
    };

    return (
        <PostDataContext.Provider value={{ postsData, setPostsData, addPost, removePost }}>
            { children }
        </PostDataContext.Provider>
    );
};