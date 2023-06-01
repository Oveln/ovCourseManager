import { defineStore } from "pinia";

export const useStore = defineStore('state',{
    state:()=>{
        return {
            page: 'teacher_list'
        }
    }
})