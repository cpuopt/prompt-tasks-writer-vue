<template>
  <el-popover :visible="visible && panelShow.show" placement="top" :width="230">
    <p>
      你确定要删除这<el-text class="mx-1" type="danger">{{ text ?? '整组' }}</el-text
      >提示词吗？
    </p>
    <div style="text-align: right; margin: 0">
      <el-button size="small" text @click.stop="visible = false">取消</el-button>
      <el-button
        size="small"
        type="danger"
        plain
        @click.stop="
          () => {
            props.onConfirm();
            visible = false;
          }
        "
        >删除</el-button
      >
    </div>
    <template #reference>
      <el-button type="danger" size="small" class="button-rt" plain @click="visible = true" :disabled="disabled" :icon="Delete"></el-button>
    </template>
  </el-popover>
</template>
<script setup>
import { computed, ref } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import { removechild } from '@/pojo/NAIutils';
import { usePromptTaskWriterStorage } from '@/storage/PromptTaskWriterStorage';
const visible = ref(false);

const panelShow = computed(() => usePromptTaskWriterStorage().panelShow);
const props = defineProps({
  onConfirm: Function,
  disabled: Boolean,
  text: {
    type: String,
    default: undefined
  }
});
</script>

<style scoped>
.button-rt {
  padding: 5px;
  margin: 0;
  display: block;
}
</style>
