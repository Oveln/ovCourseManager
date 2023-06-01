<template>
<div class="ov-teacher_list">
    <ul>
        <button @click="click_">add</button>
        <TransitionGroup name="list" tag="ul">
            <li v-for="item in teachers" :key="item">
                    <TeacherCard :description=item.description :name=item.name></TeacherCard>
            </li>
        </TransitionGroup>
    </ul>
</div>
</template>

<script setup lang='ts'>
import TeacherCard from './TeacherCard.vue';
import {ref , reactive} from 'vue'
export interface TeacherData {
    name: String,
    avt_url?: String,
    description: String
}
let teacher = {
    name: 'Oveln',
    description: '55555'
}
// let teachers = reactive([])
let teachers = ref([teacher])
const Sleep = (ms: any)=> {
    return new Promise(resolve => setTimeout(resolve,ms))
}
// for (var i=1;i<=100;i++) {
//     await Sleep(1000)
//     console.log(111)
//     teachers.value.push(teacher)
// }
const click_ = () =>{
    teachers.value.push(teacher)
}
</script>
<style lang='scss' scoped>
@include b(teacher_list) {
    height: 100%;
    overflow: auto;
}
ul {
    list-style-type: none;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>