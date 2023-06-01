<template>
<div class="ov-teachercard">
    <div class="ov-teachercard__up">
        <img class="ov-teacher__up--avatar" :src="avt_url.toString()" alt="">
        <span>{{ name }}</span>
        <div class="zhanwei">&nbsp</div>
        <button @click="cilck">展开课程</button>
    </div>
    <div class="ov-teachercard__down">
        教师介绍：{{ description }}
        <Transition>
            <div v-show="lesson_show" class="ov-teachercard__down--lesson">
                课程列表
            </div>
        </Transition>
    </div>
</div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
export interface TeacherData {
    name: String,
    avt_url?: String,
    description: String
}
let props = withDefaults(
    defineProps<TeacherData>(), {
        avt_url: ()=> 'src/assets/face.jpg'
    }
)
let lesson_show = ref(false)
const cilck = ()=>{console.log(props.avt_url.toString());lesson_show.value=!lesson_show.value;}
</script>
<style lang='scss' scoped>
// :hover {
//     backgrou nd-color: #ccc;
// }
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
}

@include b(teachercard) {
    display: flex;
    flex-direction:column;
    padding: 5px 10px;
    margin: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 5px 8px 10px #ccc;
    @include e(up) {
        flex: 1;
        display: flex;
        align-items: center;
        img{
            height: 50px;
            border: 1px solid #ccc;
            border-radius: 50%;
            margin: 5px;
        }
        span{
            margin: 0px 10px;
        }
        .zhanwei {flex:1;}
        border-bottom: 1px solid #ccc;
    }
    @include e(down) {
        display: flex;
        flex-direction: column;
        flex: 3;
        // margin: 10px 5px;
        @include m(lesson) {
            margin-top: 10px;
            padding: 0;
            width: 100%;
            border-top: 1px solid #ccc;
            flex: 1;
        }
    }
}
</style>