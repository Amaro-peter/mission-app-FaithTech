import {create} from "zustand";

const useUserProfileStore = create((set, get) => ({
    followStatus: {isFollowed: false, profileUpdates: {}},

    setUserProfile: (followStatus) => {
        set({followStatus});
    },
    

    setFollowStatus: (status) => set((state) => ({
        followStatus: {
            ...state.followStatus,
            isFollowed: status,
        },
    })),
}));

export default useUserProfileStore;