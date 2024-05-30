<template>
    <el-tooltip placement="right" effect="dark">
        <template #content><span  v-html="props.content"></span></template>
        <el-icon style="cursor: pointer" color="#a6a9ad80" size="18"><QuestionFilled /></el-icon>
    </el-tooltip>
</template>
<script setup>
import { QuestionFilled } from '@element-plus/icons-vue';

const props = defineProps(['content']);
</script>
