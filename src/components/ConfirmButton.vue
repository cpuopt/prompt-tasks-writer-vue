<template>
  <el-popover :visible="visible && panelShow.show" :placement="placement" :width="280">
    <p>
      {{ text }}
    </p>
    <div style="text-align: right; margin: 0">
      <el-button size="small" text @click.stop="visible = false">{{ cancel }}</el-button>
      <el-button
        type="danger"
        plain
        size="small"
        @click.stop="
          () => {
            action(...args);
            visible = false;
          }
        "
      >
        {{ confirm }}
      </el-button>
    </div>
    <template #reference>
      <el-button
        type="danger"
        size="small"
        style="padding: 8px"
        plain
        @click="visible = true"
        >{{ buttontext }}</el-button
      >
    </template>
  </el-popover>
</template>
<script setup>
import { ref } from "vue";

const visible = ref(false);
defineProps({
  text: String,
  buttontext: String,
  confirm: String,
  cancel: String,
  action: Function,
  panelShow: Object,
  args: Array,
  placement: {
    type: String,
    default: "top",
    required: false,
  },
});
</script>

<style scoped>
.button-rt {
  padding: 5px;
  margin: 0;
  display: block;
}
</style>
