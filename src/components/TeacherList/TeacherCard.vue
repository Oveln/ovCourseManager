<template>
<div class="ov-teachercard">
    <div class="ov-teachercard__up">
        <img class="ov-teacher__up--avatar" :src="avt_url.toString()" alt="">
        <span @click="cilck">{{ name }}</span>
    </div>
    <div class="ov-teachercard__down">
        {{ description }}
    </div>
</div>
</template>

<script setup lang='ts'>
export interface TeacherData {
    name: String,
    avt_url: String,
    description: String
}
let props = withDefaults(
    defineProps<TeacherData>(), {
        avt_url: ()=> 'src/assets/face.jpg'
    }
)
const cilck = ()=>{console.log(props.avt_url.toString());}
</script>
<style lang='scss' scoped>
:hover {
    background-color: #ccc;
}
@include b(teachercard) {
    display: flex;
    flex-direction:column;
    padding: 5px 10px;
    margin: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
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
        border-bottom: 1px solid #ccc;
    }
    @include e(down) {
        flex: 3;
        margin: 10px 5px;
    }
}
</style>