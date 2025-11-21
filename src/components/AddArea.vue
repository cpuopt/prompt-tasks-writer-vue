<template>
  <div class="add-area" @mouseenter="mouseenter" @mouseleave="mouseleave" v-hide="hide">
    <div class="add-line"></div>
    <div class="add-button" @click="addButonClick()" :style="{ transform: `scale(${transform})` }">
      <el-icon color="white" size="18px"><Plus /></el-icon>
    </div>
  </div>
</template>
<script setup>
import { Plus } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { PromptsBuilder } from '@/pojo/NAIutils.js';
const props = defineProps({
  onClickAdd: Function
});
const mouseenter = () => {
  width_ani.value = '100%';
  opacity_ani.value = '1';
  transform.value = 1;
};
const mouseleave = () => {
  width_ani.value = '0';
  opacity_ani.value = '0';
  transform.value = 0;
};
const width_ani = ref('0');
const opacity_ani = ref('1');
const transform = ref(0);
const hide = ref(false);

const addButonClick = () => {
  if (props.onClickAdd) {
    props.onClickAdd();
  } else {
    indexInsert(props.task_prompts.data, props.index, PromptsBuilder.newPromptGroup());
  }
};
</script>

<style scoped>
.add-area {
  position: relative;
  height: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  z-index: 1;
}
.add-line {
  transition: width 0.6s ease-in-out 0.4s, opacity 0.2s ease-in-out 0.4s;

  width: v-bind('width_ani');
  opacity: v-bind('opacity_ani');
  height: 4px;
  background-color: #79bbff;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
}
.add-button {
  width: 24px;
  height: 24px;
  transition: background-color 0.2s ease-in-out, transform 0.5s ease-in-out 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  overflow: visible;
  transform: scale(0);
  background-color: #79bbff;
  position: absolute;
  z-index: inherit;
  border-radius: 2px;
  cursor: pointer;
}
.add-button:hover {
  background-color: #23486c;
}
</style>
