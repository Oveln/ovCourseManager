<template>
    <div class="ov-content">
        <Transition>
            <component :is="store.page"></component>
        </Transition>
    </div>
</template>

<script setup lang='ts'>
import { useStore } from "@/store/store";

let store = useStore()
</script>
<style lang='scss' scoped>
@include b(content) {
    flex: 1;
    overflow: clip;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate(300px, 0)
}.v-enter-active
 {
  transition: all 0.5s ease;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
    transform: translate(0, 0)
}
</style>