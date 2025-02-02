import {create} from "zustand";

const useUserProjectStore = create((set) => ({
    userProject: null,
    setUserProject: (userProject) => set({userProject}),
}));

export default useUserProjectStore;