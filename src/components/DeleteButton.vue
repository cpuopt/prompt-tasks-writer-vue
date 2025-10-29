<template>
    <el-popover :visible="visible && panelShow.show" placement="top" :width="230">
        <p>你确定要删除这<el-text class="mx-1" type="danger">整组</el-text>提示词吗？</p>
        <div style="text-align: right; margin: 0">
            <el-button size="small" text @click.stop="visible = false">取消</el-button>
            <el-button
                size="small"
                type="danger"
                plain
                @click.stop="
                    () => {
                        removechild(uprompt, upromptsDate);
                        visible = false;
                    }
                "
                >删除</el-button
            >
        </div>
        <template #reference>
            <el-button type="danger" size="small" class="button-rt" plain @click="visible = true" :disabled="upromptsDate.length < 2" :icon="Delete"></el-button>
        </template>
    </el-popover>
</template>
<script setup>
import { ref } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import { removechild } from '@/pojo/NAIutils';
const visible = ref(false);
defineProps({
    uprompt: Object,
    upromptsDate: Object,
    panelShow: Object
});
</script>

<style scoped>
.button-rt {
    padding: 5px;
    margin: 0;
    display: block;
}
</style>
