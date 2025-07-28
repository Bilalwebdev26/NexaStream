import { create } from 'zustand'

export const usethemeStore = create((set) => ({
 theme:localStorage.getItem("nexa-theme")||'dark',
 settheme:(theme)=>{
    localStorage.setItem("nexa-theme",theme)
    set({theme})
 }
}))
