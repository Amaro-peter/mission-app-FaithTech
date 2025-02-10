import {create} from "zustand";

const useUserProjectStore = create((set) => ({
    userProject: null,
    setUserProject: (userProject) => {
        set({userProject});
    },
    projectFlag: false,
    setProjectFlag: (flag) => set({projectFlag: flag}),
}));


export default useUserProjectStore;