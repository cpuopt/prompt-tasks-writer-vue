<template>
    <el-popover :visible="visible && panelShow.show" placement="top" :width="280">
        <p>
            你确定要删除<el-text class="mx-1" type="danger"> 任务{{ taskIndex+1 }} {{ task.title }} </el-text> 吗？
        </p>
        <div style="text-align: right; margin: 0">
            <el-button size="small" text @click.stop="visible = false">取消</el-button>
            <el-button
                type="danger"
                plain
                size="small"
                @click.stop="
                    () => {
                        removechild(task, tasks);
                        visible = false;
                    }
                "
                >删除</el-button
            >
        </div>
        <template #reference>
            <el-button type="danger" style="padding: 8px" plain @click="visible = true" :icon="Delete"></el-button>
        </template>
    </el-popover>
</template>
<script setup>
import { ref } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import { removechild } from '../pojo/NAIutils';

const visible = ref(false);
defineProps({
    task: Object,
    tasks: Object,
    panelShow: Object,
    taskIndex: Number
});
</script>

<style scoped>
.button-rt {
    padding: 5px;
    margin: 0;
    display: block;
}
</style>
