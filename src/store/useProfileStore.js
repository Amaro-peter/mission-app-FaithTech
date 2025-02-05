import {create} from "zustand";
import { db } from "../utils/firebase";

const useUserProfileStore = create((set, get) => ({
    userProfile: {posts: [], lastVisible: null, isFollowed: false},
    setUserProfile: (userProfile) => set({userProfile}),

    setFollowStatus: (status) => set((state) => ({
        userProfile: {
            ...state.userProfile,
            isFollowed: status,
        },
    })),

    addPosts: (newPosts, lastVisible) => set((state) => ({
        userProfile: {
            ...state.userProfile,
            posts: [...state.userProfile.posts, ...newPosts],
            lastVisible
        }
    })),
    clearPosts: () => set((state) => ({
        userProfile: {
            ...state.userProfile,
            posts: [],
            lastVisible: null
        }
    })),
    fetchPosts: async (limit = 10) => {
        const state = get().userProfile;
        let query = db.collection("posts").orderBy("createdAt").limit(limit);
        if(state.lastVisible) {
            query = query.startAfter(state.lastVisible);
        }
        const snapshot = await query.get();
        const newPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        set((state) => ({
            userProfile: {
                ...state.userProfile,
                posts: [...state.userProfile.posts, ...newPosts],
                lastVisible
            }
        }));
    }
}));

export default useUserProfileStore;