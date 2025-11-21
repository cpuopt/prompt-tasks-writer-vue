<template>
  <el-form-item label="角色提示词：">
    <el-card style="display: inline-block" shadow="hover">
      <!-- 角色列表，可拖拽排序 -->
      <VueDraggable
        v-model="task.character.data"
        class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded"
        style="overflow: hidden"
        target=".charactors"
        :scroll="true"
        :animation="200"
        handle=".charactor-handle"
      >
        <TransitionGroup name="list" tag="div" class="charactors">
          <div v-for="(character, cIndex) in task.character.data" :key="character.uuid" style="width: 100%">
            <AddArea
              @click-add="
                () => {
                  if (task.character.data.length < 6) {
                    task.character.data.splice(cIndex, 0, PromptsBuilder.newCharacter());
                  }
                }
              "
            />
            <div class="textarea2button_container" style="position: relative; margin-bottom: 0">
              <!-- 拖拽整个角色 -->
              <el-button :disabled="!(task.character.data.length > 1)" :icon="DCaret" class="charactor-handle cursor-move button-small-square" size="small" />

              <el-card :style="{ paddingRight: '0.5rem' }" body-class="prompts-group-body" shadow="hover">
                <template #header>
                  <div>
                    <el-text type="primary"> 角色 {{ cIndex + 1 }} </el-text>
                    <el-text type="info" size="small" style="margin-left: 1rem">可能性数量：{{ count_character_variants(character) }}</el-text>
                  </div>
                </template>

                <el-form-item label-width="fit-content" label="正向：" style="margin-top: 0.5rem">
                  <!-- 角色正向提示词组：结构和“提示词片段组”一致 -->
                  <VueDraggable
                    v-model="character.prompts.data"
                    class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded"
                    target=".char-prompts-groups"
                    :scroll="true"
                    :animation="200"
                    style="width: 100%"
                    handle=".groups-handle"
                  >
                    <TransitionGroup name="list" tag="div" class="char-prompts-groups" style="width: 100%; display: flex; flex-direction: column">
                      <div v-for="(prompts_group, index) in character.prompts.data" :key="prompts_group.uuid" style="width: 100%">
                        <AddArea
                          @click-add="
                            () => {
                              character.prompts.data.splice(index, 0, PromptsBuilder.newPromptGroup());
                            }
                          "
                        />
                        <div class="textarea2button_container" style="margin-bottom: 0; position: relative">
                          <!-- 拖拽提示词组 -->
                          <el-button
                            :disabled="!(character.prompts.data.length > 1)"
                            :icon="DCaret"
                            class="groups-handle cursor-move button-small-square"
                            size="small"
                            :style="{ backgroundColor: prompts_group.color }"
                          />

                          <el-card
                            :style="{
                              paddingRight: '0.5rem',
                              backgroundColor: prompts_group.ignore ? '#e4e7ed90' : 'white'
                            }"
                            body-class="prompts-group-body"
                            shadow="hover"
                          >
                            <!-- 组内提示词，可拖拽排序 -->
                            <VueDraggable
                              v-model="prompts_group.data"
                              class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded"
                              target=".char-prompts"
                              :scroll="true"
                              :animation="200"
                              handle=".prompt-handle"
                            >
                              <TransitionGroup name="list" tag="div" class="char-prompts">
                                <div v-for="(prompt, pIndex) in prompts_group.data" :key="prompt.uuid" class="textarea2button_container" style="position: relative">
                                  <!-- 拖拽单个tag -->
                                  <el-button :disabled="!(prompts_group.data.length > 1)" :icon="DCaret" class="prompt-handle cursor-move button-small-square" size="small" />

                                  <!-- 这里复用原来的 PromptInput 组件 -->
                                  <PromptInput :prompt="prompt" :prompts_group="prompts_group" :index="pIndex" />
                                </div>
                              </TransitionGroup>
                            </VueDraggable>

                            <!-- 底部：添加tag + 排列/组合设置 -->
                            <div style="display: flex; flex-direction: row; line-height: normal; justify-content: space-between">
                              <!-- 添加新的tag（片段） -->
                              <el-button type="primary" size="small" @click="addPromptSplice(prompts_group.data)" :icon="ArrowDownBold"></el-button>

                              <div style="margin-left: auto"></div>

                              <!-- 排列 / 组合 设置 -->
                              <div>
                                <el-space :size="10" :spacer="h(ElDivider, { direction: 'vertical' })">
                                  <div>
                                    <el-text class="mx-1" size="small">选取</el-text>
                                    <el-input-number
                                      v-model="prompts_group.choices"
                                      size="small"
                                      style="width: 5rem"
                                      :min="1"
                                      :max="prompts_group.data.filter((prompt) => prompt.ignore != true).length"
                                    />
                                    <el-text class="mx-1" size="small">个</el-text>
                                  </div>
                                  <el-tooltip class="box-item" effect="dark" :enterable="false" content="仅抽取1个tag时，排列和组合没有差别" placement="top" :disabled="prompts_group.choices != 1">
                                    <el-radio-group v-model="prompts_group.type" size="small" :disabled="prompts_group.choices == 1">
                                      <el-tooltip
                                        class="box-item"
                                        effect="dark"
                                        :enterable="false"
                                        :content="`从${prompts_group.data.length}个tag中选取${prompts_group.choices}个，并排出不同的顺序`"
                                        placement="top"
                                        :disabled="prompts_group.choices == 1"
                                      >
                                        <el-radio-button label="排列" value="permutation" />
                                      </el-tooltip>

                                      <el-tooltip
                                        class="box-item"
                                        effect="dark"
                                        :enterable="false"
                                        :content="`从${prompts_group.data.length}个tag中选取${prompts_group.choices}个，并按填入的顺序排列`"
                                        placement="top"
                                        :disabled="prompts_group.choices == 1"
                                      >
                                        <el-radio-button label="组合" value="combination" />
                                      </el-tooltip>
                                    </el-radio-group>
                                  </el-tooltip>
                                </el-space>
                              </div>
                            </div>
                          </el-card>

                          <!-- 右上角：删除/复制/忽略/颜色，和上面一致 -->
                          <div class="button-rt-container">
                            <DeleteButton
                              @confirm="removechild(prompts_group, character.prompts.data)"
                              :disabled="character.prompts.data.length <= 1 || (!prompts_group.ignore && character.prompts.data.filter((_) => !_.ignore).length <= 1)"
                            />
                            <IgnoreButton :prompt_group="prompts_group" :disabled="!prompts_group.ignore && character.prompts.data.filter((_) => !_.ignore).length <= 1" />

                            <el-color-picker v-if="piniaStorage.colorPicker_status" size="small" v-model="prompts_group.color" :predefine="piniaStorage.predefineColors" @click.stop show-alpha />
                          </div>
                        </div>
                      </div>
                    </TransitionGroup>
                  </VueDraggable>
                  <el-button
                    type="primary"
                    size="small"
                    @click="addPromptGroup(character.prompts.data)"
                    :style="{ width: '100%', display: 'block', marginTop: '1rem' }"
                    :icon="ArrowDownBold"
                    plain
                  ></el-button>
                </el-form-item>
                <hr style="border: 0; border-top: 1px solid var(--el-card-border-color); margin-block: 8px" />
                <!-- 角色反向提示词：用第一项 uprompts.data[0] 承载整串 -->
                <el-form-item label-width="fit-content" label="反向：" style="margin-top: 0.5rem">
                  <el-input v-model="character.uprompts.data[0].data" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="输入角色反向提示词（整串）" />
                </el-form-item>
              </el-card>

              <!-- 删除整个角色 -->
              <div class="button-rt-container">
                <DeleteButton text="整个角色" @confirm="task.character.data = task.character.data.filter((_) => _.uuid !== character.uuid)" :disabled="task.character.data.length <= 1" />
              </div>
            </div>
          </div>
        </TransitionGroup>
      </VueDraggable>

      <!-- 添加新角色 -->
      <el-button
        type="primary"
        size="small"
        style="margin-top: 1rem"
        @click="task.character.data.push(PromptsBuilder.newCharacter())"
        :disabled="task.character.data.length >= 6"
        :style="{ width: '100%', display: 'block' }"
        :icon="ArrowDownBold"
        plain
      ></el-button>
    </el-card>
  </el-form-item>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';
import PromptInput from './PromptInput.vue';
import { ArrowDownBold, CopyDocument, DCaret, Delete, Plus } from '@element-plus/icons-vue';
import { VueDraggable } from 'vue-draggable-plus';
import { h } from 'vue';
import { ElDivider, ElText } from 'element-plus';
import { usePromptTaskWriterStorage } from '@/storage/PromptTaskWriterStorage';
import { PromptsBuilder, removechild } from '@/pojo/NAIutils';
import AddArea from './AddArea.vue';
import DeleteButton from './DeleteButton.vue';
import IgnoreButton from './IgnoreButton.vue';
import { count_character_variants } from '../pojo/NAIutils';

const piniaStorage = usePromptTaskWriterStorage();

const task = defineModel('task');

const addPromptSplice = (list) => {
  list.push(PromptsBuilder.newPromptSplice());
};
/* --- 添加角色 --- */
const addCharacter = () => {
  props.character.data.push({
    uuid: uuidv4(),
    prompts: {
      random: false,
      data: [
        {
          uuid: uuidv4(),
          type: 'combination',
          choices: 1,
          ignore: false,
          color: 'rgba(255,255,255,0.63)',
          data: [
            {
              uuid: uuidv4(),
              data: '',
              ignore: false
            }
          ]
        }
      ]
    },
    uprompts: {
      data: [
        {
          uuid: uuidv4(),
          data: '',
          ignore: false
        }
      ]
    }
  });
};

/* --- 删除角色 --- */
const removeCharacter = (index) => {
  props.character.data.splice(index, 1);
};

/* --- 添加组合组 --- */
const addPromptGroup = (list) => {
  list.push(PromptsBuilder.newPromptGroup());
};

/* --- 删除组合组 --- */
const removeGroup = (arr, group) => {
  if (arr.length > 1) {
    const i = arr.indexOf(group);
    arr.splice(i, 1);
  }
};
</script>

<style scoped>
.el-card {
  /* margin-bottom: 1rem; */
  width: 100%;
}
</style>
<style>
.textarea2button_container {
  display: flex;
  margin-bottom: 1rem;
}
</style>
