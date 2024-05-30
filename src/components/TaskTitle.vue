<template>
    <el-text v-show="!edit && props.task.title.length == 0" class="task-title" @click="Edit()" size="large">任务{{ props.taskIndex + 1 }}</el-text>
    <el-text v-show="!edit && props.task.title.length != 0" class="task-title" @click="Edit()" size="large">{{ props.task.title }}</el-text>
    <el-input v-show="edit" ref="input" v-model="props.task.title" style="max-width: 20rem; margin-right: auto" :autofocus="true" @blur="blur" />
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['taskIndex', 'task']);
const input = ref(null);
const edit = ref(false);
const Edit = () => {
    edit.value = true;
    input.value.focus();
};
const blur = (event) => {
    edit.value = false;
};
</script>
<style>
.task-title {
    padding: 4px;
    border: 1px transparent dotted;
    transition: border 0.2s;
    overflow: hidden;
    max-width: 20rem;
}
.task-title:hover {
    border: 1px dotted #409eff;
}
</style>
