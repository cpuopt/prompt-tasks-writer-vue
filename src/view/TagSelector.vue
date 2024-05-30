<template>
  <el-container class="el-container tag-selector" @click.stop>
    <el-header>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        style="align-items: center"
      >
        <el-text class="mx-1 disabled-select" type="primary" size="large" :line-clamp="1"
          >{{ pluginConfig.name }} 内置Tag编辑器 v{{ pluginConfig.userscript.version }}
        </el-text>

        <div class="flex-grow"></div>
        <ConfirmButton
          :text="'确认重置为插件内置的Tag数据吗？'"
          :buttontext="'重置Tag'"
          :confirm="'确认'"
          :cancel="'取消'"
          :panelShow="tag_selector_status"
          :args="[reset]"
          :placement="'top'"
          :action="
            (...args) => {
              args[0]();
            }
          "
        ></ConfirmButton>

        <el-button size="small" type="primary" plain @click="saveToJson()"
          >保存为Json</el-button
        >

        <el-button size="small" type="primary" plain @click="inportFromFile()"
          >从Json导入</el-button
        >
        <el-button
          type="danger"
          plain
          :icon="CloseBold"
          @click="tag_selector_status.show = false"
          :style="{ height: '30px', width: '30px' }"
        />
      </el-menu>
    </el-header>

    <el-main style="display: flex; flex-direction: column; flex-wrap: nowrap">
      <div class="tag-inputer">
        <div class="input-container">
          <el-scrollbar style="width: 100%" always>
            <VueDraggable
              v-model="selectedTags"
              class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded"
              target=".tags-groups"
              :scroll="true"
              :animation="200"
              handle=".tags-handle"
            >
              <TransitionGroup name="list" tag="div" class="tags-groups"
                ><SelectedTag
                  v-for="tag in selectedTags"
                  :container="selectedTags"
                  :tag="tag"
                  :key="tag.raw"
                />
                <div
                  id="tags_end"
                  style="height: 0px; overflow: hidden"
                  key="__tags_end"
                ></div>
              </TransitionGroup>
            </VueDraggable>
          </el-scrollbar>
        </div>
        <div class="button-container">
          <el-button size="small" type="primary" plain @click.stop="copy_tags_selecter()"
            >复制到剪切板</el-button
          >

          <el-button size="small" type="danger" plain @click.stop="clear_tags_selecter()"
            >清空</el-button
          >
          <el-button size="small" type="success" plain @click.stop="read_from_clipboard()"
            >从剪切板导入</el-button
          >
          <div style="margin-left: auto"></div>
          <div
            class="button-group"
            style="
              padding-inline: 0.2rem;
              border-left: 1px dashed #dadada;
              margin-top: -1px;
            "
          >
            <el-button
              v-if="preset_load_status == false"
              size="small"
              @click.stop="preset_load_status = true"
              >加载预设</el-button
            >
            <div v-else>
              <el-select
                size="small"
                v-model="Tag_select"
                style="width: 160px"
                @change="PRESETS_CHANGE"
                placeholder="选择要加载的预设"
              >
                <el-option
                  size="small"
                  v-for="item in PRESETS.prompts"
                  :key="item.name"
                  :value="item.name"
                >
                  <span style="float: left">{{ item.name }}</span>
                  <span
                    style="
                      float: right;
                      color: var(--el-text-color-secondary);
                      font-size: 13px;
                    "
                    @click.stop="PRESETS_delete(item.name)"
                  >
                    删除
                  </span>
                </el-option>
              </el-select>
              <el-button
                size="small"
                type="danger"
                plain
                @click.stop="preset_load_status = false"
                >取消</el-button
              >
            </div>
          </div>
          <div
            class="button-group"
            style="
              border-left: 1px dashed #dadada;
              margin-top: -1px;
              padding-left: 0.2rem;
            "
          >
            <el-button
              size="small"
              v-if="preset_input_status == false"
              @click.stop="preset_input_status = true"
              >保存到预设</el-button
            >
            <div v-else>
              <el-input
                size="small"
                v-model="preset_input"
                style="width: 160px"
                placeholder="输入预设名称"
                @keyup.enter.native="save_preset_click()"
                @click.stop
              >
                <template #suffix>
                  <el-icon
                    class="el-input__icon"
                    style="cursor: pointer; color: #606266"
                    @click.stop="save_preset_click()"
                    ><save
                  /></el-icon>
                </template>
              </el-input>
              <el-button
                size="small"
                type="danger"
                plain
                @click.stop="
                  () => {
                    preset_input_status = false;
                    preset_input = '';
                  }
                "
                >取消</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="segmented-container" style="height: 75%">
        <div class="segmented-header">
          <el-scrollbar @wheel.passive="handleTopWheel" ref="topscrollContainer">
            <div style="display: flex">
              <el-segmented
                @contextmenu.prevent
                v-model="topChoice.value"
                :options="topOptions"
                size="default"
                @change="topOptionsChange"
              >
                <template #default="{ item }">
                  <SegmentedButton
                    :item="item"
                    :container="tags.value"
                    :deepth="0"
                    :tags="tags"
                  />
                </template>
              </el-segmented>
              <OperationInput :choice="topChoice" :container="tags.value" type="top" />
            </div>
          </el-scrollbar>
        </div>

        <div class="segmented-body" style="flex: 1">
          <div class="segmented-container" style="height: 100%">
            <div class="segmented-header">
              <el-scrollbar
                @wheel.passive="handleSecondWheel"
                ref="secondscrollContainer"
              >
                <div ref="innerRef" style="display: flex">
                  <el-segmented
                    @contextmenu.prevent
                    v-model="secondChoice.value"
                    :options="secondOptions"
                    size="default"
                    @change="secondOptionsChange"
                  >
                    <template #default="{ item }">
                      <SegmentedButton
                        :item="item"
                        :container="tags.value.get(topChoice.value)"
                        :deepth="1"
                        :tags="tags"
                        :topChoice="topChoice.value"
                      />
                    </template>
                  </el-segmented>

                  <OperationInput
                    v-if="topChoice.value != ''"
                    :choice="secondChoice"
                    :container="tags.value.get(topChoice.value)"
                    type="second"
                  />
                </div>
              </el-scrollbar>
            </div>
            <div class="segmented-body" style="flex: 1">
              <el-scrollbar>
                <div class="tags-container" style="width: 99%">
                  <TagItem
                    v-for="tag in tags.value.get(topChoice.value)
                      ? tags.value.get(topChoice.value).get(secondChoice.value)
                      : []"
                    :tag="tag"
                    :tags="tags.value.get(topChoice.value).get(secondChoice.value)"
                    :bgColor="selectedTags.includes(tag) ? '#909399' : '#40a0ffe3'"
                    @click.stop="selectTag(tag)"
                  />
                  <div
                    class="add-tag"
                    v-if="topChoice.value && secondChoice.value && !add_tag_status"
                    @click.stop="add_tag"
                  >
                    <el-icon color="#dadada"><Plus /></el-icon>
                  </div>
                  <TagItem
                    v-if="add_tag_status"
                    :tag="{ local: '', raw: '' }"
                    :tags="tags.value.get(topChoice.value).get(secondChoice.value)"
                    :add="true"
                  />
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <form
      ref="json_form"
      style="
        display: none;
        filter: alpha(opacity=0);
        opacity: 0;
        width: 0;
        height: 0;
        padding: 0;
      "
    >
      <input
        ref="json_file"
        type="file"
        accept=".json"
        @change="handleJsonFile"
        style="filter: alpha(opacity=0); opacity: 0; width: 0; height: 0; padding: 0"
      />
    </form>
  </el-container>
</template>
<script setup>
import { reactive, ref, toRaw, watch, onMounted } from "vue";
import { CloseBold, Plus } from "@element-plus/icons-vue";
import OperationInput from "@/components/OperationInput.vue";
import TagItem from "@/components/TagItem.vue";
import { tags as T, convertToObject } from "@/pojo/Tags.js";
import { saveAs } from "file-saver";
import { timeFormat } from "@/pojo/NAIutils.js";
import pluginConfig from "/plugin.config.js";
import SegmentedButton from "@/components/SegmentedButton.vue";
import ConfirmButton from "@/components/ConfirmButton.vue";
import SelectedTag from "@/components/SelectedTag.vue";
import { VueDraggable } from "vue-draggable-plus";
import save from "@/svg/save.vue";

defineProps({
  tag_selector_status: Object,
});
const json_file = ref();
const json_form = ref();

const selectedTags = ref([]);
const selectedTagsString = (selectedTags) => {
  return selectedTags.map((tag) => tag.show).join(",");
};
const clear_tags_selecter = () => {
  const length = selectedTags.value.length;
  selectedTags.value = [];
  ElMessage({
    message: `已清空${length}个提示词`,
    type: "success",
  });
};
const read_from_clipboard = async () => {
  const text = await navigator.clipboard.readText();
  text.split(/,|，|\n/).forEach((element) => {
    const tag = element.trim();
    selectedTags.value.push({
      local: "",
      raw: tag,
      show: tag,
    });
  });
};
const PRESETS_NAME = `${pluginConfig.name}_v${pluginConfig.userscript.version}_presets`;
const PRESETS = reactive({ prompts: [] });

const PRESETS_load = () => {
  const presets = localStorage.getItem(PRESETS_NAME);
  if (presets) {
    return JSON.parse(presets);
  } else {
    return [];
  }
};
onMounted(() => {
  PRESETS.prompts = PRESETS_load();
  console.debug(PRESETS);
});
const preset_input_status = ref(false);
const preset_load_status = ref(false);
const Tag_select = ref("");
const preset_input = ref("");
const save_preset_click = () => {
  const name = preset_input.value;
  const length = selectedTags.value.length;
  PRESETS_add(name, selectedTags.value);
  preset_input_status.value = false;
  preset_input.value = "";
  ElMessage({
    message: `已保存${length}个Tag组成的提示词到预设 ${name}`,
    type: "success",
  });
};
const PRESETS_add = (__name, tag_list) => {
  PRESETS.prompts.push({ name: __name, tags: tag_list });
  PRESETS_save();
};
const PRESETS_delete = (name) => {
  const index = PRESETS.prompts.findIndex((item) => item.name === name);
  PRESETS.prompts.splice(index, 1);
  PRESETS_save();
  ElMessage({
    message: `已删除预设 ${name}`,
    type: "success",
  });
};
const PRESETS_get = (name) => {
  return PRESETS.prompts.filter((item) => {
    return item.name == name;
  })[0].tags;
};
const PRESETS_save = () => {
  const tags = toRaw(PRESETS.prompts);
  localStorage.setItem(PRESETS_NAME, JSON.stringify(tags));
};
const PRESETS_CHANGE = (value) => {
  selectedTags.value = PRESETS_get(value);
  preset_load_status.value = false;
  Tag_select.value = "";
  ElMessage({
    message: `已加载预设 ${value}`,
    type: "success",
  });
};
const copy_tags_selecter = async () => {
  const prompt = selectedTagsString(selectedTags.value);
  const length = selectedTags.value.length;
  console.log();
  try {
    await navigator.clipboard.writeText(prompt);
    ElMessage({
      message: `已复制${length}个Tag组成的提示词到剪切板`,
      type: "success",
    });
  } catch (err) {
    console.error("复制失败: ", err);
  }
};
const selectTag = (tag) => {
  if (selectedTags.value.includes(tag)) {
    // tag.hide = true;
    const index = selectedTags.value.indexOf(tag);
    selectedTags.value.splice(index, 1);
    // selectedTags.value = selectedTags.value.filter((item) => item !== tag);
  } else {
    // tag.hide = false;
    tag.weight = 0;
    tag.show = tag.raw;
    selectedTags.value.push(tag);
    document.querySelector("#tags_end").scrollIntoView();
  }
};
const topscrollContainer = ref();
const secondscrollContainer = ref();
const handleTopWheel = (event) => {
  const container = topscrollContainer.value;
  if (event.deltaY !== 0) {
    container.setScrollLeft(container.wrapRef.scrollLeft + event.deltaY / 3);
    // event.preventDefault();
  }
};
const handleSecondWheel = (event) => {
  const container = secondscrollContainer.value;
  if (event.deltaY !== 0) {
    container.setScrollLeft(container.wrapRef.scrollLeft + event.deltaY / 3);
    // event.preventDefault();
  }
};

const innerRef = ref();
const add_tag_status = ref(false);
const add_tag = () => {
  add_tag_status.value = true;
};
const saveToJson = () => {
  const time = new Date().toLocaleDateString("zh-CN", timeFormat);
  const blob = new Blob([JSON.stringify(convertToObject(toRaw(tags.value)))], {
    type: "application/json",
  });
  saveAs(blob, `NAI-Prompt-Linker v1.1.0 tags ${time}.json`);
};
const reset = () => {
  tags.value = T.reset();
};
/**
 * @description 模拟点击file input
 */
const inportFromFile = () => {
  json_file.value.click();
};
const tags = reactive({ value: T.TAGS() });
watch(tags, (tags) => {
  console.log(tags);
  add_tag_status.value = false;
  topOptions.value = Array.from(tags.value.keys());
  if (topChoice.value.length > 0) {
    if (tags.value.has(topChoice.value)) {
      // 若当前首级选中项未被删除
      secondOptions.value = getSecondOptionsByTopChoice(topChoice.value);
      if (!tags.value.get(topChoice.value).has(secondChoice.value)) {
        secondChoice.value = tags.value.get(getFirstTopChoice()).keys().next().value;
      }
    } else {
      // 若当前首级选中项 不存在于tags中
      topChoice.value = getFirstTopChoice();
      secondOptions.value = getSecondOptionsByTopChoice(topChoice.value);
      secondChoice.value = tags.value.get(getFirstTopChoice()).keys().next().value;
    }
  }
  T.update(toRaw(tags.value));
  T.saveToLocalStroage();
});

/**
 * 获取 首级菜单 第一项
 * @returns
 */
const getFirstTopChoice = () => {
  return tags.value.keys().next().value;
};

/**
 * 获取 二级菜单 选项列表
 * @returns
 */
const getSecondOptionsByTopChoice = (topChoice) => {
  return Array.from(tags.value.get(topChoice).keys());
};

/**
 * @description 首级菜单选中项
 */
const topChoice = reactive({ value: getFirstTopChoice() });

/**
 * @description 二级菜单选中项
 */
const secondChoice = reactive({
  value: getSecondOptionsByTopChoice(getFirstTopChoice())[0],
});
/**
 * @description 首级菜单
 */
const topOptions = ref(Array.from(tags.value.keys()));

/**
 * @description 二级菜单
 */
const secondOptions = ref(getSecondOptionsByTopChoice(getFirstTopChoice()));
const topOptionsChange = (topChoice_change_to) => {
  //   console.log(topChoice);
  secondOptions.value = Array.from(tags.value.get(topChoice_change_to).keys());
  const temp_secondChoice = Array.from(tags.value.get(topChoice_change_to).keys())[0];
  secondChoice.value = temp_secondChoice;
};
const secondOptionsChange = (secondChoice_change_tp) => {
  //   console.log(secondChoice_change_tp);
};

/**
 * @description 导入json文件时,input file改变时触发
 */
const handleJsonFile = (event) => {
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    try {
      T.updateFromObject(JSON.parse(this.result));
      tags.value = T.TAGS();
    } catch (SyntaxError) {
      ElMessage({
        message: `Json文件格式错误，导入失败`,
        type: "error",
        plain: true,
      });
      throw SyntaxError;
    }
    json_form.value.reset();
  };
};
</script>
<style scoped>
.tags-groups {
  margin-bottom: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
  padding-right: 0.6rem;
}
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: relative;
}
.tag-inputer {
  padding: 8px;
  min-height: 15%;
  max-height: 25%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.input-container {
  flex: 1;
  max-height: calc(100% - 32px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
  border: 1px dashed #dadada;
  border-radius: 8px 8px 0 0;
  border-bottom: none;
}
.button-container {
  height: 32px;
  padding: 0.2rem;
  border: 1px dashed #dadada;
  border-radius: 0 0 8px 8px;
  border-top: 1px dashed #dadada;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
}
.button-container > button {
  margin-inline-start: 0.2rem;
}
.add-tag {
  height: 48px;
  min-width: 3.8rem;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  border: 2px dashed #dadada;
  border-radius: 4px;
  margin: 0.5rem 0 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  transition: background-color 0.2s ease;
}
.add-tag:hover {
  background-color: #ececec;
  cursor: pointer;
}
@media screen and (min-width: 1200px) {
  .tag-selector {
    top: 16vh;
    margin-left: 50%;
    left: -35vw;
    width: 70vw;
    height: 68vh;
  }
}
@media screen and (max-width: 1200px) {
  .tag-selector {
    top: 10vh;
    margin-left: 50%;
    left: -45vw;
    width: 90vw;
    height: 80vh;
  }
}
.tag-selector {
  display: flex;
  box-shadow: 0px 16px 48px 16px rgba(64, 158, 255, 0.3),
    0px 12px 32px rgba(64, 158, 255, 0.5), 0px 8px 16px -8px rgba(64, 158, 255, 0.8);
  border: var(--el-border-radius-round);
  position: fixed;

  z-index: 2001;
  background-color: white;
  border-radius: var(--el-border-radius-round);
}
.segmented-container {
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
}
.segmented-body {
  display: flex;
  flex-direction: column;
  border: 1px dashed #dadada;
  min-height: 100px;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
}
.segmented-header {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 40px;
}
.tags-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-bottom: 0.5rem;
}
</style>
