<template>
    <div class="ov-content">
        <Transition>
            <TeacherList v-show="store.page=='teacher_list'" :teachers="TeacherContent"></TeacherList>
        </Transition>
        <Transition>
            <TeacherAdd v-show="store.page=='add_teacher'" @commit="commit"></TeacherAdd>
        </Transition>
        <Transition>
            <About v-show="store.page=='about'"></About>
        </Transition>
    </div>
</template>

<script setup lang='ts'>
import { computed, ref, watch } from "vue";
import TeacherList from "./TeacherList/index.vue"
import TeacherAdd from "./TeacherAdd/index.vue"
import About from "./about/index.vue"
import { useStore } from "@/store/store";

export interface TeacherData {
    teacher: {
        name: String,
        avt_url?: String,
        description: String
    }
}
let store = useStore()
let teacher = {
    teacher: {
        name: 'Oveln',
        description: '55555'
    }
}
let TeacherContent = ref<TeacherData[]>([teacher])

const commit = (new_teacher:TeacherData) => {
    TeacherContent.value.push(new_teacher)
}


</script>
<style lang='scss' scoped>
@include b(content) {
    flex: 1;
    overflow: clip;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-active
 {
  transition: opacity 0.5s ease;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>