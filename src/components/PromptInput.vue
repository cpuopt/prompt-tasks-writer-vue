最小单元提示词输入框
<template>
    <div style="flex: 1; display: flex" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <el-input
            v-model="prompts_group.data[index].data"
            :autosize="{ minRows: 1, maxRows: 16 }"
            type="textarea"
            placeholder="提示词片段"
            :style="{
                backgroundColor: prompt.ignore ? '#e4e7ed90' : 'white'
            }"
        />
        <div class="button-rt-container">
            <el-button
                v-if="foucsed"
                :disabled="prompts_group.data.length < 2 || (prompts_group.data.length <= inignored + 1 && !prompt.ignore)"
                type="danger"
                size="small"
                class="button-rt"
                plain
                @click="remove(prompt, prompts_group)"
                :icon="Delete"
            ></el-button>
            <el-button
                v-if="foucsed"
                :disabled="prompts_group.data.length <= inignored + 1 && !prompt.ignore"
                :type="prompt.ignore ? 'info' : ''"
                size="small"
                class="button-rt"
                :plain="prompt.ignore ? false : true"
                @click="switchIgnore()"
                :icon="Hide"
            ></el-button>
        </div>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { Delete, Hide } from '@element-plus/icons-vue';
import { removechild } from '@/pojo/NAIutils.js';

const props = defineProps({
    prompts_group: Object,
    prompt: Object,
    index: Number
});

const inignored = ref(0);
watch(
    props.prompts_group.data,
    (newValue, oldValue) => {
        inignored.value = newValue.filter((prompt) => prompt.ignore == true).length;
    },
    { immediate: true }
);
const switchIgnore = () => {
    if (props.prompt.ignore) {
        props.prompt.ignore = false;
    } else {
        props.prompt.ignore = true;
        calcNotIgnore(props.prompts_group);
    }
};
const remove = (prompt, prompts_group) => {
    removechild(prompt, prompts_group.data);
    if (prompts_group.choices > prompts_group.data.length) prompts_group.choices = prompts_group.data.length;
};
const calcNotIgnore = (prompts_group) => {
    const not_ignore_num = prompts_group.data.filter((prompt) => prompt.ignore == false).length;
    if (prompts_group.choices > not_ignore_num) prompts_group.choices = not_ignore_num;
};
const foucsed = ref(false);
// var timer;
const mouseenter = () => {
    //   timer = setTimeout(function () {
    foucsed.value = true;
    //   }, 50);
};
const mouseleave = () => {
    //   clearTimeout(timer);
    foucsed.value = false;
};
</script>
<style scoped>
.button-rt-container {
    display: flex;
    right: 0;
    top: 0;
    position: absolute;
    flex-direction: row-reverse;
}
.button-rt {
    padding: 5px;
    display: block;
    margin: 0;
}
:deep(.el-textarea__inner) {
    background-color: transparent;
}
</style>
