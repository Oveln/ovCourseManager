<template>
    <div class="ov-inputbox">
        <div class="ov-inputbox__item">
            <div class="ov-inputbox__item--label">Name:</div>
            <input type="text" v-model="teacher.teacher.name">
        </div>
        <div class="ov-inputbox__item">
            <div class="ov-inputbox__item--label">Avturl:</div>
            <input type="text" v-model="teacher.teacher.avt_url">
        </div>
        <div class="ov-inputbox__item">
            <div class="ov-inputbox__item--label">Description:</div>
            <input type="text" v-model="teacher.teacher.description">
        </div>
        <button class="ov-inputbox__button" @click="_click">添加</button>
    </div>
</template>

<script setup lang='ts'>
import { type TeacherData } from '@/Layout/Content/index.vue';
import { reactive } from 'vue';

let teacher:TeacherData = reactive<TeacherData>({
    teacher: {
        name:"",
        avt_url:"",
        description:""
    }
})
let emits = defineEmits(['commit'])
const _click = () => {
    console.log(teacher)
    emits('commit',teacher)
}
</script>
<style lang='scss' scoped>
@include b(inputbox) {
    display:flex;
    flex-direction: column;
    padding: 50px 50px 0px 50px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 5px 8px 10px #ccc;
    margin: 15px;
    overflow: auto;
    @include e(item) {
        display: flex;
        margin: 5px 0px;
        @include m(label) {
            min-width: 8em;
            
        }
    }
    @include e(button) {
        margin: 20px ;
    }
}
</style>