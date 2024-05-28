最小单元提示词输入框
<template>
  <div style="flex: 1; display: flex" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <el-input
      v-model="prompts_group.data[index].data"
      :autosize="{ minRows: 1, maxRows: 16 }"
      type="textarea"
      placeholder="提示词片段"
    />
    <div class="button-rt-container">
      <el-button
        v-if="foucsed"
        :disabled="prompts_group.data.length < 2"
        type="danger"
        size="small"
        class="button-rt"
        plain
        @click="remove(prompt, prompts_group)"
        :icon="Delete"
      ></el-button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { removechild } from "@/pojo/NAIutils.js";
defineProps({
  prompts_group: Object,
  prompt: Object,
  index: Number,
});
const remove = (prompt, prompts_group) => {
  removechild(prompt, prompts_group.data);
  if (prompts_group.choices > prompts_group.data.length)
    prompts_group.choices = prompts_group.data.length;
};
const foucsed = ref(false);
var timer;
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
  flex-direction: column;
}
.button-rt {
  padding: 5px;
  display: block;
  margin: 0;
}
</style>
