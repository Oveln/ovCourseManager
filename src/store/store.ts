import { defineStore } from "pinia";
import TeacherList from "../Layout/Content/TeacherList/index.vue"
import TeacherAdd from "../Layout/Content/TeacherAdd/index.vue"
import About from "../Layout/Content/about/index.vue"
import CourseList from "../Layout/Content/CourseList/index.vue"

export interface CourseData {
    name: string,
    price: number,
    place: string,
    description: string,
    teachername: string
}
export interface TeacherData {
    teacher: {
        name: string,
        sex: string,
        phonenumber: string,
        place: string,
        avt_url: string,
        description: string
    }
    //课程信息
    courses: CourseData[]
}
export const useStore = defineStore('state',{
    state:()=>{
        return {
            //当前页面
            page: shallowRef(TeacherList),
            //teacher使用TeacherData类型的数组
            //默认有一个空的teacher
            teachers: [{
                teacher: {
                    name: 'Oveln',
                    sex: '男',
                    avt_url: '',
                    phonenumber: '12345678910',
                    place: '寝室',
                    description: '摸鱼大王'
                },
                courses: [{
                    name: '划水课一号',
                    description: '睡觉',
                    price: 0,
                    place: '床',
                    teachername: 'Oveln'
                },{
                    name: '划水课二号',
                    description: '看番',
                    price: 0,
                    place: '床',
                    teachername: 'Oveln'
                },{
                    name: '划水课三号',
                    description: '打游戏',
                    price: 0,
                    place: '床',
                    teachername: 'Oveln'
                }]
            }],
            //已选课程
            selectedCourses: [{
                name: '划水课一号',
                description: '划水课',
                price: 0,
                place: '床',
                teachername: 'Oveln'
            }]
        }
    }
})