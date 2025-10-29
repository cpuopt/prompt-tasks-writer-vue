<template>
    <div style="display: flex">
        <el-input v-model="textarea" v-if="visible" style="width: 240px" placeholder="在这里输入要添加的类别" autofocus @keyup.enter.native="addTopOperation()" />

        <el-button type="success" :icon="Select" v-if="visible" text bg style="height: 32px; width: 16px" @click="addTopOperation()" />
        <el-button type="warning" :icon="CloseBold" v-if="visible" text bg style="margin: 0; height: 32px; width: 16px" @click="close()" />
        <el-button type="info" :icon="Plus" v-if="visible == false" text bg style="height: 32px; width: 16px" @click="visible = true" />
        <div v-if="visible == false" style="height: 32px; width: 268px"></div>
    </div>
</template>
<script setup>
import { ref, toRaw } from 'vue';
import { Plus, Select, CloseBold } from '@element-plus/icons-vue';
const visible = ref(false);
const textarea = ref('');
const tagInput = ref();
const clearInput = () => {
    visible.value = false;
    textarea.value = '';
};
const close = () => {
    visible.value = false;
    clearInput();
};
const props = defineProps({
    container: Object,
    type: String,
    choice: Object
});
const addTopOperation = () => {
    const cl = textarea.value;
    if (Array.from(props.container.keys()).includes(textarea.value)) {
        ElMessage({
            message: `“${cl}”类别已存在，不能重复添加`,
            type: 'error',
            plain: true
        });
    } else if (cl == '') {
        ElMessage({
            message: '类别不能为空',
            type: 'error',
            plain: true
        });
    } else {
        visible.value = false;
        if (props.type == 'top') {
            props.container.set(textarea.value, new Map());
            props.choice.value = textarea.value;
        } else if (props.type == 'second') {
            props.container.set(textarea.value, []);
            props.choice.value = textarea.value;
        }
        clearInput();
    }
};
</script>

<style scoped>
.el-popper {
    transition: all 0.2s ease;
}
</style>
