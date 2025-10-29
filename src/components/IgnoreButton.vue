<template>
    <el-button :type="prompt_group.ignore ? 'info' : ''" size="small" class="button-rt" :plain="prompt_group.ignore ? false : true" @click="switchIgnore()" :icon="Hide"></el-button>
</template>
<script setup>
import { Hide } from '@element-plus/icons-vue';
const props = defineProps({
    prompt_group: Object
});
const switchIgnore = () => {
    if (props.prompt_group.ignore) {
        props.prompt_group.ignore = false;
    } else {
        props.prompt_group.ignore = true;
    }
};
</script>

<style scoped>
.button-rt {
    padding: 5px;
    display: block;
    margin: 0;
}
</style>
