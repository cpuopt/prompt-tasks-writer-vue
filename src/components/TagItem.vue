<template>
  <div
    class="tag-item"
    @blur="delayLoseFocus"
    tabindex="0"
    @contextmenu="
      (e) => {
        if (!edit_local_status && !edit_raw_status) {
          contex_status = true;
          e.preventDefault();
        }
      }
    "
  >
    <div class="tag-local" :style="{ backgroundColor: bgColor }">
      <el-text v-if="!edit_local_status" class="text-local disabled-select">{{
        tag.local
      }}</el-text>
      <el-input
        v-else
        size="small"
        v-model="local_input"
        style="width: 100%"
        @keyup.enter.native="save_local"
        @click.stop
      >
        <template #suffix>
          <el-icon
            class="el-input__icon"
            style="cursor: pointer; color: #606266"
            @click.stop="save_local"
            ><save
          /></el-icon>
        </template>
      </el-input>
    </div>
    <div class="tag-en">
      <el-text v-if="!edit_raw_status" class="disabled-select">{{ tag.raw }}</el-text>
      <el-input
        v-else
        size="small"
        v-model="raw_input"
        style="width: 100%"
        @keyup.enter.native="save_raw"
        @click.stop
      >
        <template #suffix>
          <el-icon
            class="el-input__icon"
            style="cursor: pointer; color: #606266"
            @click.stop="save_raw"
            ><save
          /></el-icon>
        </template>
      </el-input>
    </div>
    <div class="contextmenu" v-show="contex_status" @click.stop>
      <el-button
        class="button"
        type="primary"
        :icon="EditPen"
        circle
        plain
        @click.stop="edit_tag"
      />
      <el-button
        class="button"
        type="danger"
        :icon="Delete"
        circle
        plain
        @click.stop="delete_tag"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, toRaw } from "vue";
import { Delete, EditPen, Select } from "@element-plus/icons-vue";
import save from "@/svg/save.vue";

const props = defineProps({
  tag: Object,
  tags: Object,
  add: {
    type: Boolean,
    default: false,
    required: false,
  },
  bgColor: {
    type: String,
    default: "#40a0ffe3",
    required: false,
  },
});

const local_input = ref("");
const raw_input = ref("");
const contex_status = ref(false);
const edit_local_status = ref(false);
const edit_raw_status = ref(false);
const save_local = () => {
  props.tag.local = local_input.value;
  edit_local_status.value = false;
  if (props.add && !edit_raw_status.value) {
    props.tags.push(props.tag);
  }
};
const save_raw = () => {
  props.tag.raw = raw_input.value;
  edit_raw_status.value = false;
  if (props.add && !edit_local_status.value) {
    props.tags.push(props.tag);
  }
};
const loseFocus = () => {
  contex_status.value = false;
};
const delayLoseFocus = () => {
  setTimeout(() => {
    contex_status.value = false;
  }, 100);
};
const delete_tag = () => {
  // console.log(props.tags);
  loseFocus();
  const index = props.tags.findIndex((item) => item.raw === props.tag.raw);
  if (index > -1) {
    props.tags.splice(index, 1);
  }
};

const edit_tag = () => {
  loseFocus();
  local_input.value = props.tag.local;
  raw_input.value = props.tag.raw;
  edit_local_status.value = true;
  edit_raw_status.value = true;
};
if (props.add == true) {
  edit_tag();
}
</script>
<style scoped>
.button {
  height: 24px;
  width: 24px;
  margin-inline: 0.1rem;
}
.contextmenu {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;

  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
}
.tag-item {
  min-width: 3.8rem;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 4px;
  margin: 0.5rem 0 0 0.5rem;
}
.tag-item:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.05);
}
.tag-local {
  min-height: 24px;
  text-align: center;
  padding-inline: 0.5rem;
  color: white;
}
.tag-en {
  min-height: 24px;
  padding-inline: 0.5rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.06);
}
.text-local {
  color: white;
}
</style>
