import { create } from "zustand";

export const useTheme = create((set) => ({
    theme: localStorage.getItem('theme') || 'coffee',
    setTheme: (theme) => {
        localStorage.setItem('theme', theme)
        set({ theme })
    }

}))