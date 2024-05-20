<template>
    <div class="el-container tag-selector">
        <el-button type="danger" plain :icon="CloseBold" @click="tag_selector_status.show = false" :style="{ height: '30px', width: '30px' }" />

        <div>
            <el-segmented v-model="value" :options="options" size="default" />
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { Fold, CopyDocument, Odometer, Close, Check, CloseBold, QuestionFilled, ArrowDownBold, Delete, DCaret, Edit, Plus } from '@element-plus/icons-vue';

defineProps({
    tag_selector_status: Object
});
const value = ref('Mon');

const options = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
</script>
<style scoped>
.tag-selector {
    display: flex;
    box-shadow: 0px 16px 48px 16px rgba(64, 158, 255, 0.3), 0px 12px 32px rgba(64, 158, 255, 0.5), 0px 8px 16px -8px rgba(64, 158, 255, 0.8);
    border: var(--el-border-radius-round);
    position: fixed;
    top: 4vh;
    z-index: 991;
    background-color: white;
    border-radius: var(--el-border-radius-round);
    margin-left: 50%;
    left: -600px;
    width: 1200px;
    height: 600px;
}
</style>
