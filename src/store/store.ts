import { defineStore } from "pinia";

export interface CourseData {
    name: string,
    price: number,
    description: string,
    teacherid: number
}
export interface TeacherData {
    teacher: {
        name: string,
        avt_url: string,
        description: string
    }
    //课程信息
    courses: CourseData[]
}
export const useStore = defineStore('state',{
    state:()=>{
        return {
            page: 'teacher_list',
            //teacher使用TeacherData类型的数组
            //默认有一个空的teacher
            teachers: [{
                teacher: {
                    name: 'Oveln',
                    avt_url: '',
                    description: '摸鱼大王'
                },
                courses: [{
                    name: '划水课一号',
                    description: '划水课',
                    teacherid: 0,
                    price: 0
                },{
                    name: '划水课二号',
                    description: '划水课',
                    teacherid: 0,
                    price: 0
                },{
                    name: '划水课三号',
                    description: '划水课',
                    teacherid: 0,
                    price: 0
                }]
            }],
            //已选课程
            selectedCourses: [{
                name: '划水课',
                description: '划水课',
                teacherid: 0,
                price: 0
            }]
        }
    }
})