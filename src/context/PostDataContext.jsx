import { createContext, useState } from "react";


export const PostDataContext = createContext();

export const PostDataProvider = ({ children }) => {
    const [postsData, setPostsData] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [gotPostCount, setGotPostCount] = useState(false);

    const addPost = (post, callback) => {
        if(Array.isArray(post)) {
            setPostsData((prevPosts) => {
                const updatedPosts = [...prevPosts, ...post];
                if (callback) callback(updatedPosts);
                return updatedPosts;
            });
        } else {
            setPostsData((prevPosts) => {
                const updatedPosts = [post, ...prevPosts];
                if (callback) callback(updatedPosts);
                return updatedPosts;
            });
        }
    };

    const removePost = (index) => {
        setPostsData((prevPosts) => prevPosts.filter((_, i) => i !== index));
    };

    return (
        <PostDataContext.Provider value={{ postsData, setPostsData, addPost, removePost,
         postCount, setPostCount, gotPostCount, setGotPostCount }}>
            { children }
        </PostDataContext.Provider>
    );
};