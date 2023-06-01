<template>
    <div class="ov-menu">
        <div class="ov-menu__item" @click="store.page='teacher_list'">教师列表</div>
        <div class="ov-menu__item" @click="store.page='add_teacher'">添加教师</div>
        <div class='ov-menu__item' @click="store.page='about'">关于</div>
    </div>
</template>

<script setup lang='ts'>
import {useStore} from '../../store/store'

let store = useStore()

</script>
<style lang='scss' scoped>
@include b(menu) {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    border-right: 1px solid #ccc;
    height: 100%;
    box-shadow: 5px 8px 10px #ccc;
    @include e(item) {
        // width: 100%;
        height: 50px;
        margin: 10px;
        text-align: center;
        line-height: 50px;
        border: 1px solid #ccc;
        user-select: none;
        &:hover{
            background-color: #ccc;
        }
    }
}
// .ov-menu__item:hover {
//     background-color: #ccc;
// }
</style>