<style>
.flex-grow {
  flex-grow: 1;
}
</style>

<template>
  <el-tooltip
    class="box-item"
    effect="dark"
    content="Prompt-Tasks-Writer"
    placement="bottom"
  >
    <el-button
      @click.stop
      :class="{ showButton: progress.start && !progress.pause }"
      color="#71ffc3"
      :icon="Odometer"
      @click="changeShow()"
      :style="{
        position: 'fixed',
        top: '0',
        right: '10%',
        height: '30px',
        width: '30px',
      }"
    />
  </el-tooltip>
  <Transition>
    <el-container v-show="panelShow.show" :style="{}" class="pluginPanel" @click.stop>
      <el-header>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          style="align-items: center"
        >
          <el-text class="mx-1" type="primary" size="large"
            >NovelAI绘图任务队列生成器</el-text
          >

          <el-tooltip
            class="box-item"
            effect="dark"
            content="上一次生成完成到下一次开始的时间间隔（单位：s）"
            placement="bottom"
          >
            <el-input-number
              style="margin-left: 1rem"
              v-model="delay"
              :min="2"
              controls-position="right"
            />
          </el-tooltip>
          <div class="flex-grow"></div>
          <el-button
            type="danger"
            plain
            :icon="CloseBold"
            @click="changeShow()"
            :style="{ height: '30px', width: '30px' }"
          />
        </el-menu>
      </el-header>
      <el-main>
        <el-scrollbar>
          <div style="width: 99%">
            <TransitionGroup name="list" tag="div">
              <div
                v-for="(task, taskIndex) in tasklist"
                :key="task.uuid"
                class="textarea2button_container"
                style="position: relative"
              >
                <el-card style="min-width: 600px">
                  <template #header>
                    <div class="card-header">
                      <span style="margin-right: 1rem">任务{{ taskIndex + 1 }}</span>
                      <div
                        v-hide="
                          tasklist.length < 2 ||
                          (activateTaskNum < 2 && task.activate == true)
                        "
                        style="display: inline-block"
                      >
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="移除这一整个任务"
                          placement="top"
                        >
                          <el-button
                            type="danger"
                            plain
                            style="padding: 8px"
                            @click="removechild(task, tasklist)"
                            :icon="Delete"
                          ></el-button>
                        </el-tooltip>
                      </div>

                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="切换启用/忽略该任务"
                        placement="top"
                      >
                        <el-switch
                          v-model="task.activate"
                          class="mb-2"
                          inline-prompt
                          style="
                            --el-switch-on-color: #13ce66;
                            --el-switch-off-color: #ff4949;
                            float: inline-end;
                          "
                          active-text="启用"
                          inactive-text="忽略"
                          :disabled="checkTaskSwich(task.activate)"
                        />
                      </el-tooltip>
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="复制这一整个任务"
                        placement="top"
                      >
                        <el-button
                          type="info"
                          plain
                          @click="copyTask(task, tasklist)"
                          :icon="CopyDocument"
                          circle
                          style="float: inline-end; margin-right: 1rem"
                        ></el-button>
                      </el-tooltip>
                    </div>
                  </template>
                  <el-form :model="task" label-width="auto" style="max-width: 100%">
                    <el-form-item label="提示词组合方式：">
                      <el-tooltip
                        :content="
                          task.random
                            ? '随机抽取正反向提示词进行搭配'
                            : '从头依次选取反向提示词进行搭配'
                        "
                        placement="right"
                      >
                        <el-switch
                          v-model="task.random"
                          style="
                            --el-switch-on-color: #13ce66;
                            --el-switch-off-color: #409eff;
                          "
                          :active-value="true"
                          :inactive-value="false"
                          active-text="随机"
                          inactive-text="轮询"
                        />
                      </el-tooltip>
                    </el-form-item>
                    <el-form-item label="出图数量：">
                      <el-space
                        :size="10"
                        :spacer="h(ElDivider, { direction: 'vertical' })"
                      >
                        <el-input-number v-model="task.nums" :min="1" />
                        <el-text class="mx-1" type="success"
                          >至少
                          <b>{{ count_task_prompts_num(task) }}</b>
                          个才能覆盖全部可能的提示词序列</el-text
                        >
                      </el-space>
                    </el-form-item>
                    <el-form-item label="正向提示词：">
                      <el-card>
                        <el-form :model="task" label-width="auto">
                          <el-form-item label="类型：">
                            <el-tooltip
                              :content="
                                task.prompts.splice
                                  ? '由多组正向提示词片段拼接成完整的提示词'
                                  : '从一组完整的正向提示词中选取'
                              "
                              placement="right"
                            >
                              <el-switch
                                v-model="task.prompts.splice"
                                style="
                                  --el-switch-on-color: #13ce66;
                                  --el-switch-off-color: #409eff;
                                "
                                :active-value="true"
                                :inactive-value="false"
                                active-text="拼接"
                                inactive-text="完整"
                                @click="
                                  task.prompts.data = task.prompts.splice
                                    ? [PromptsBuilder.newPromptGroup()]
                                    : [PromptsBuilder.newPromptSplice()]
                                "
                              />
                            </el-tooltip>
                          </el-form-item>
                          <el-form-item v-if="task.prompts.splice" label="抽取顺序：">
                            <el-tooltip
                              :content="
                                task.prompts.random
                                  ? '从每组中随机抽取提示词片段'
                                  : '从每组中按顺序选取提示词片段'
                              "
                              placement="right"
                            >
                              <el-switch
                                v-model="task.prompts.random"
                                style="
                                  --el-switch-on-color: #13ce66;
                                  --el-switch-off-color: #409eff;
                                "
                                :active-value="true"
                                :inactive-value="false"
                                active-text="随机"
                                inactive-text="轮询"
                              />
                            </el-tooltip>
                          </el-form-item>
                          <el-form-item v-if="task.prompts.splice" label="提示词片段组：">
                            <VueDraggable
                              v-model="task.prompts.data"
                              class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded"
                              target=".prompts-groups"
                              :scroll="true"
                              :animation="200"
                              style="width: 100%"
                              handle=".groups-handle"
                            >
                              <TransitionGroup
                                name="list"
                                tag="div"
                                style="width: 100%"
                                class="prompts-groups"
                              >
                                <div
                                  v-for="(prompts_group, index) in task.prompts.data"
                                  :key="prompts_group.uuid"
                                  style="width: 100%; position: relative"
                                  class="textarea2button_container"
                                >
                                  <el-button
                                    :disabled="!(task.prompts.data.length > 1)"
                                    :icon="DCaret"
                                    class="groups-handle cursor-move button-small-square"
                                    size="small"
                                    :style="{
                                      backgroundColor: prompts_group.color,
                                    }"
                                  />
                                  <el-card style="padding-right: 0.5rem">
                                    <VueDraggable
                                      v-model="prompts_group.data"
                                      class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded"
                                      target=".prompts"
                                      :scroll="true"
                                      :animation="200"
                                      handle=".prompt-handle"
                                    >
                                      <TransitionGroup
                                        name="list"
                                        tag="div"
                                        class="prompts"
                                      >
                                        <div
                                          v-for="(prompt, index) in prompts_group.data"
                                          class="textarea2button_container"
                                          :key="prompt.uuid"
                                          style="position: relative"
                                        >
                                          <el-button
                                            :disabled="!(prompts_group.data.length > 1)"
                                            :icon="DCaret"
                                            class="prompt-handle cursor-move button-small-square"
                                            size="small"
                                          />
                                          <el-input
                                            v-model="prompts_group.data[index].data"
                                            :autosize="{ minRows: 1, maxRows: 16 }"
                                            type="textarea"
                                            placeholder="提示词片段"
                                          />
                                          <div
                                            v-hide="prompts_group.data.length < 2"
                                            class="button-rt-container"
                                          >
                                            <el-button
                                              type="danger"
                                              size="small"
                                              class="button-rt"
                                              plain
                                              @click="
                                                () => {
                                                  removechild(prompt, prompts_group.data);
                                                  prompts_group.choices >
                                                  prompts_group.data.length
                                                    ? (prompts_group.choices =
                                                        prompts_group.data.length)
                                                    : pass;
                                                }
                                              "
                                              :icon="Delete"
                                            ></el-button>
                                          </div>
                                        </div>
                                      </TransitionGroup>
                                    </VueDraggable>
                                    <div
                                      style="
                                        display: flex;
                                        flex-direction: row;
                                        line-height: normal;
                                        justify-content: space-between;
                                      "
                                    >
                                      <el-button
                                        type="primary"
                                        size="small"
                                        @click="addPromptSplice(prompts_group.data)"
                                        style=""
                                        :icon="ArrowDownBold"
                                      ></el-button>

                                      <div>
                                        <el-space
                                          :size="10"
                                          :spacer="
                                            h(ElDivider, { direction: 'vertical' })
                                          "
                                        >
                                          <div>
                                            <el-text class="mx-1" size="small"
                                              >选取</el-text
                                            >
                                            <el-input-number
                                              v-model="prompts_group.choices"
                                              size="small"
                                              style="width: 5rem"
                                              :min="1"
                                              :max="prompts_group.data.length"
                                            />
                                            <el-text class="mx-1" size="small"
                                              >个</el-text
                                            >
                                          </div>
                                          <el-tooltip
                                            class="box-item"
                                            effect="dark"
                                            content="仅抽取1个tag时，排列和组合没有差别"
                                            placement="top"
                                            :disabled="prompts_group.choices != 1"
                                          >
                                            <el-radio-group
                                              v-model="prompts_group.type"
                                              size="small"
                                              :disabled="prompts_group.choices == 1"
                                            >
                                              <el-tooltip
                                                class="box-item"
                                                effect="dark"
                                                :content="`从${prompts_group.data.length}个tag中选取${prompts_group.choices}个，并排出不同的顺序`"
                                                placement="top"
                                                :disabled="prompts_group.choices == 1"
                                              >
                                                <el-radio-button
                                                  label="排列"
                                                  value="permutation"
                                                />
                                              </el-tooltip>

                                              <el-tooltip
                                                class="box-item"
                                                effect="dark"
                                                :content="`从${prompts_group.data.length}个tag中选取${prompts_group.choices}个，并按填入的顺序排列`"
                                                placement="top"
                                                :disabled="prompts_group.choices == 1"
                                              >
                                                <el-radio-button
                                                  label="组合"
                                                  value="combination"
                                                />
                                              </el-tooltip>
                                            </el-radio-group>
                                          </el-tooltip>
                                        </el-space>
                                      </div>
                                    </div>
                                  </el-card>
                                  <div class="button-rt-container">
                                    <!-- <el-button
                                      type="danger"
                                      size="small"
                                      class="button-rt"
                                      plain
                                      :disabled="task.prompts.data.length < 2"
                                      @click="
                                        removechild(prompts_group, task.prompts.data)
                                      "
                                      :icon="Delete"
                                    ></el-button> -->
                                    <DeleteButton
                                      :uprompt="prompts_group"
                                      :uprompts-date="task.prompts.data"
                                      :panel-show="panelShow"
                                    />
                                    <el-tooltip
                                      class="box-item"
                                      effect="dark"
                                      content="复制提示词组"
                                      placement="right"
                                    >
                                      <el-button
                                        type="primary"
                                        size="small"
                                        class="button-rt"
                                        plain
                                        @click="
                                          () => {
                                            copyTaskGroup = JSON.parse(
                                              JSON.stringify(prompts_group)
                                            );
                                          }
                                        "
                                        :icon="CopyDocument"
                                      ></el-button>
                                    </el-tooltip>

                                    <el-color-picker
                                      size="small"
                                      v-model="prompts_group.color"
                                      :predefine="predefineColors"
                                      @click.stop
                                      show-alpha
                                    />
                                  </div>
                                </div>
                              </TransitionGroup>
                            </VueDraggable>
                            <el-button-group style="display: flex; width: 100%">
                              <el-button
                                type="primary"
                                size="small"
                                plain
                                @click="addPromptGroup(task.prompts.data)"
                                :icon="ArrowDownBold"
                                :style="{ width: '90%' }"
                              ></el-button>
                              <el-tooltip
                                class="box-item"
                                effect="dark"
                                content="粘贴先前复制的提示词组到此处"
                                placement="top"
                              >
                                <el-button
                                  type="success"
                                  size="small"
                                  plain
                                  @click="pastePromptGroup(task.prompts.data)"
                                  :icon="Edit"
                                  :style="{ width: '10%' }"
                                  :disabled="copyTaskGroup == null"
                                ></el-button>
                              </el-tooltip>
                            </el-button-group>
                          </el-form-item>
                          <el-form-item
                            v-if="!task.prompts.splice"
                            label="完整提示词组："
                          >
                            <el-card style="display: inline-block">
                              <TransitionGroup name="list" tag="div">
                                <div
                                  v-for="(prompt, index) in task.prompts.data"
                                  class="textarea2button_container"
                                  :key="prompt.uuid"
                                  style="position: relative"
                                >
                                  <el-input
                                    v-model="task.prompts.data[index].data"
                                    :autosize="{ minRows: 2, maxRows: 4 }"
                                    type="textarea"
                                    placeholder="输入完整的提示词"
                                  />
                                  <div class="button-rt-container">
                                    <el-button
                                      type="danger"
                                      size="small"
                                      class="button-rt"
                                      plain
                                      :disabled="task.prompts.data.length < 2"
                                      @click="removechild(prompt, task.prompts.data)"
                                      :icon="Delete"
                                    ></el-button>
                                  </div>
                                </div>
                              </TransitionGroup>
                              <el-button
                                type="primary"
                                size="small"
                                @click="addPrompt(task.prompts.data)"
                                :icon="ArrowDownBold"
                                plain
                                :style="{ width: '100%' }"
                              ></el-button>
                            </el-card>
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </el-form-item>

                    <el-form-item label="反向提示词：">
                      <el-card>
                        <el-form :model="task" label-width="auto">
                          <el-form-item label="反向提示词：">
                            <el-card style="display: inline-block">
                              <TransitionGroup name="list" tag="div">
                                <div
                                  v-for="(uprompt, index) in task.uprompts.data"
                                  class="textarea2button_container"
                                  :key="uprompt.uuid"
                                  style="position: relative"
                                >
                                  <el-input
                                    v-model="task.uprompts.data[index].data"
                                    :autosize="{ minRows: 2, maxRows: 4 }"
                                    type="textarea"
                                    placeholder="输入完整的反向提示词"
                                  />
                                  <div class="button-rt-container">
                                    <el-button
                                      type="danger"
                                      size="small"
                                      class="button-rt"
                                      plain
                                      @click="removechild(uprompt, task.uprompts.data)"
                                      :disabled="task.uprompts.data.length < 2"
                                      :icon="Delete"
                                    ></el-button>
                                  </div>
                                </div>
                              </TransitionGroup>
                              <el-button
                                type="primary"
                                size="small"
                                @click="addPromptSplice(task.uprompts.data)"
                                :style="{ width: '100%', display: 'block' }"
                                :icon="ArrowDownBold"
                                plain
                              ></el-button>
                            </el-card>
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </el-form-item>
                  </el-form>
                </el-card>
              </div>
            </TransitionGroup>
            <el-button type="primary" @click="addTask()" :style="{ width: '100%' }"
              >添加任务</el-button
            >
          </div>
        </el-scrollbar>
        <el-progress
          :style="{ display: 'flex', marginTop: '0.5rem', width: '100%', height: '50px' }"
          color="#FFA2FF"
          :text-inside="true"
          :stroke-width="22"
          :percentage="progress.percentage"
          v-show="progress.start"
          striped
          striped-flow
          :duration="progress_duration"
        >
          <span>{{ `已完成 ${progress.now} / ${progress.total}` }}</span>
        </el-progress>

        <el-button-group
          :style="{
            display: 'flex',
            marginTop: '0.5rem',
            width: '100%',
            height: '50px',
            borderRadius: 'var(--el-border-radius-base)',
          }"
        >
          <el-button
            type="warning"
            :style="{ width: '50%', height: '100%', color: 'white' }"
            @click="runTaskList()"
            color="#4A6BFF"
            v-show="!progress.start && progress.now == 0"
          >
            启动任务列表
          </el-button>

          <el-button
            type="warning"
            :style="{ width: '25%', height: '100%', color: 'white' }"
            @click="
              () => {
                progress.pause = true;
                progress_duration = 0;
                ELMess(
                  '任务队列已暂停',
                  'Success',
                  '任务队列已暂停，但已发出的生成请求无法取消',
                  'success',
                  10
                );
              }
            "
            v-show="progress.start && !progress.pause"
            :disabled="!progress.start"
          >
            暂停
          </el-button>

          <el-button
            type="success"
            :style="{ width: '25%', height: '100%', color: 'white' }"
            @click="
              async () => {
                progress.pause = false;
                progress_duration = 15;
                await next();
              }
            "
            v-show="progress.pause && progress.start"
            :disabled="GENERATING.REQUIESTING || GENERATING.WAITING"
          >
            恢复继续
          </el-button>

          <el-button
            type="danger"
            :style="{ width: '25%', height: '100%', color: 'white' }"
            @click="
              () => {
                progress.start = false;
                progress.now = 0;
                progress.pause = false;
                progress.total = 0;
                ELMess(
                  '终止并重置队列',
                  'Success',
                  '任务队列已重置，但已发出的生成请求无法取消',
                  'success',
                  10
                );
              }
            "
            v-show="progress.start"
          >
            终止并重置队列
          </el-button>

          <el-button
            type="primary"
            :style="{ width: '25%', height: '100%', color: 'white' }"
            @click="inportFromFile()"
            color="#4CC2C2"
          >
            从文件导入任务队列
          </el-button>

          <el-button
            type="primary"
            :style="{ width: '25%', height: '100%', color: 'white' }"
            @click="download2file()"
            color="#4CC2C2"
          >
            导出到文件
          </el-button>
        </el-button-group>
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
        <el-dialog
          v-model="inportJsonFileConfirm"
          title="请选择从json文件中读取的任务队列的使用方式"
          width="500"
          center
          style="border-radius: 8px"
        >
          <template #footer>
            <div class="dialog-footer">
              <el-button type="danger" @click="json_temp_to_taskList(false)"
                >覆盖</el-button
              >
              <el-button type="primary" @click="json_temp_to_taskList(true)"
                >追加</el-button
              >
            </div>
          </template>
        </el-dialog>
      </el-main>
    </el-container>
  </Transition>
  <!-- <div id="testJ" v-show="true" style="position: fixed; z-index: 5001">
    {{ GENERATING }}
    <br>
    {{ STATUS }}
  </div> -->
</template>

<script setup>
import {
  CopyDocument,
  Odometer,
  CloseBold,
  Minus,
  ArrowDownBold,
  Delete,
  DCaret,
  Edit,
} from "@element-plus/icons-vue";
import { ElDivider } from "element-plus";
import DeleteButton from "./Components/DeleteButton.vue";
import { h, ref, reactive, toRaw, watch, onMounted, onUnmounted } from "vue";
import {
  Debug,
  insert,
  generate_promptList,
  timeFormat,
  PromptsBuilder,
  count_task_prompts_num,
  removechild,
} from "./pojo/NAIutils.js";
import { unsafeWindow } from "$";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from "uuid";
import { VueDraggable } from "vue-draggable-plus";
/**
 * @description 从json文件导入任务队列确认框状态
 */
const inportJsonFileConfirm = ref(false);

/**
 * @description 任务队列执行状态相关参数
 */
const progress = reactive({
  start: false,
  now: 0,
  total: 0,
  pause: false,
  promptList: [],
  percentage: 0,
});

/**
 * @description 生成请求状态
 */
const GENERATING = reactive({
  REQUIESTING: false,
  BUTTON_ACTIVATE: false,
  WAITING: false,
});
const STATUS = ref("未开始");
/**
 * @description 生成图片间隔秒数
 */
const delay = ref(2);

/**
 * @description 插件面板显示状态
 */
const panelShow = reactive({ show: false });

const copyTaskGroup = ref(null);

window.onload = () => {
  panelShow.show = localStorage.getItem("panelShow") == "false" ? false : true;
};

const bodyClickCallback = (e) => {
  if (
    !/el-popper/.test(findDeep2ndParentNode(e.target).id) &&
    ["TEXTAREA", "BUTTON", "BODY"].indexOf(e.target.tagName) == -1
  )
    if (panelShow.show) {
      panelShow.show = false;
      localStorage.setItem("panelShow", panelShow.show);
    }
};
onMounted(() => {
  document.body.addEventListener("click", bodyClickCallback, false);
});
onUnmounted(() => {
  document.body.removeEventListener("click", bodyClickCallback, false);
});
/**
 * @description 暂存从json中加载的任务队列
 */
let json_temp_taskList = null;

/**
 * @description 将暂存的任务队列数据写入插件存储
 * @param {*} append 是否追加 或覆盖
 */
const json_temp_to_taskList = (append) => {
  if (append) {
    tasklist.push(...json_temp_taskList);
  } else {
    tasklist.splice(0, tasklist.length);
    tasklist.push(...json_temp_taskList);
  }
  inportJsonFileConfirm.value = false;
};

/**
 * @description 从文件加载json时,用于清空接收file的input(需使用form.reset())
 */
const json_form = ref();

/**
 * @description 导入json文件时,input file改变时触发
 */
const handleJsonFile = (event) => {
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    try {
      json_temp_taskList = JSON.parse(this.result);
      json_temp_taskList.forEach((element) => {
        element.uuid = uuidv4();
      });
      inportJsonFileConfirm.value = true;
    } catch (SyntaxError) {
      ELMess(
        `Json文件内容格式错误:${this.result}`,
        "Error",
        `Json文件内容格式错误！`,
        "error",
        5
      );
    }
    json_form.value.reset();
  };
};
/**
 * @description 返回元素最接近body的父节点
 * @param {*} dom
 */
function findDeep2ndParentNode(dom) {
  if (dom && dom.parentNode && dom.parentNode.tagName != "BODY") {
    return findDeep2ndParentNode(dom.parentNode);
  } else {
    return dom;
  }
}

const progress_duration = ref(15);
const changeShow = () => {
  panelShow.show = !panelShow.show;
  localStorage.setItem("panelShow", panelShow.show);
};

const tasklist = reactive(
  localStorage.getItem("tasklist") == null
    ? [
        {
          uuid: uuidv4(),
          activate: true,
          random: false,
          nums: 1,
          prompts: {
            splice: false,
            random: true,
            data: [PromptsBuilder.newPromptSplice()],
          },
          uprompts: {
            data: [PromptsBuilder.newPromptSplice()],
          },
        },
      ]
    : JSON.parse(localStorage.getItem("tasklist"))
);
watch(
  () => tasklist,
  (newValue, oldValue) => {
    localStorage.setItem("tasklist", JSON.stringify(toRaw(tasklist)));
    let count = 0;
    newValue.forEach((task) => {
      if (task.activate) {
        count++;
      }
    });
    activateTaskNum.value = count;
  },
  { deep: true }
);
const addTask = () => {
  tasklist.push({
    uuid: uuidv4(),
    activate: true,
    random: false,
    nums: 1,
    prompts: {
      splice: false,
      random: false,
      data: [PromptsBuilder.newPromptSplice()],
    },
    uprompts: {
      data: [PromptsBuilder.newPromptSplice()],
    },
  });
};
const activateTaskNum = ref(
  (() => {
    let count = 0;
    tasklist.forEach((task) => {
      if (task.activate) {
        count++;
      }
    });
    return count;
  })()
);
const checkTaskSwich = (status) => {
  if (activateTaskNum.value < 2 && status == true) {
    return true;
  } else {
    return false;
  }
};
const copyTask = (item, container) => {
  const index = container.indexOf(item);
  const newItem = JSON.parse(JSON.stringify(item));
  newItem.uuid = uuidv4();
  container.splice(index + 1, 0, newItem);
};
const addPromptGroup = (item) => {
  item.push(PromptsBuilder.newPromptGroup());
};
const pastePromptGroup = (item) => {
  item.push(copyTaskGroup.value);
};
const addPromptSplice = (item) => {
  item.push(PromptsBuilder.newPromptSplice());
};

const addPrompt = (item) => {
  item.push(PromptsBuilder.newPromptSplice());
};

/**
 * @description 将任务队列保存到json文件
 */
const download2file = () => {
  const time = new Date().toLocaleDateString("zh-CN", timeFormat);
  const blob = new Blob([JSON.stringify(toRaw(tasklist))], {
    type: "application/json",
  });
  saveAs(blob, `NAI-Prompt-Linker v1.1.0 task ${time}.json`);
};
const json_file = ref();
/**
 * @description 从json文件读取任务队列信息
 */
const inportFromFile = () => {
  json_file.value.click();
};

const ELMess = (debugLog, title, message, type, duration, dangerouslyUseHTMLString) => {
  Debug(debugLog);
  ElNotification({
    title: `${title} ${new Date().toLocaleDateString("zh-CN", timeFormat)}`,
    message: message,
    position: "bottom-right",
    type: type,
    duration: duration ? 1000 * duration : 4500,
    dangerouslyUseHTMLString: dangerouslyUseHTMLString ? dangerouslyUseHTMLString : false,
  });
};
const generate_button = () => {
  return document
    .evaluate(
      `//span[text()='Generate 1 Image']/following-sibling::div[1]`,
      document.body,
      null,
      7,
      null
    )
    .snapshotItem(0);
};
let intercepted = false;
let button_observer;
const runTaskList = async () => {
  class Button_observer {
    observer;
    constructor() {
      this.observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
          if (mutation.type === "attributes") {
            if (generate_button().getAttribute("disabled") === "") {
              GENERATING.BUTTON_ACTIVATE = false;
            } else if (generate_button().getAttribute("disabled") === null) {
              GENERATING.BUTTON_ACTIVATE = true;
            }
          }
        }
      });
    }
    disconnect() {
      this.observer.disconnect();
    }
    connect() {
      if (generate_button().getAttribute("disabled") === "") {
        GENERATING.BUTTON_ACTIVATE = false;
      } else if (generate_button().getAttribute("disabled") === null) {
        GENERATING.BUTTON_ACTIVATE = true;
      }
      this.observer.observe(generate_button(), {
        attributes: true,
        childList: false,
        subtree: false,
      });
    }
  }

  button_observer = new Button_observer();
  class FetchInterceptor {
    static originalFetch = unsafeWindow.fetch;

    static intercept() {
      if (intercepted == false) {
        unsafeWindow.fetch = async (...args) => {
          let [resource, config] = args;

          if (
            /https:\/\/image.novelai.net\/ai\/generate-image/.test(resource) &&
            progress.start &&
            config.method == "POST"
          ) {
            ELMess("generate-image请求发送", "Info", "生成请求已发送", "info");
            button_observer.connect();
            GENERATING.REQUIESTING = true;
          }
          let response;
          try {
            response = await this.originalFetch(resource, config);
            if (
              /https:\/\/image.novelai.net\/ai\/generate-image/.test(resource) &&
              progress.start &&
              config.method == "POST"
            ) {
              if (response.status == 200) {
                ELMess(
                  `generate-image响应成功 code: ${response.status}`,
                  "Success",
                  "生成图像成功",
                  "success"
                );
                progress.now += 1;
                progress.percentage = (100 * progress.now) / progress.total;
                GENERATING.REQUIESTING = false;
              } else if (response.status == 429) {
                ELMess(
                  `generate-image请求过于频繁，将暂停30秒后重复请求 code: ${response.status}`,
                  "Error",
                  `响应失败，请求过于频繁，将暂停30秒后重复请求`,
                  "error",
                  25
                );
                GENERATING.REQUIESTING = false;
                GENERATING.WAITING = true;
                setTimeout(() => {
                  GENERATING.WAITING = false;
                }, 30000);
              } else {
                ELMess(
                  `generate-image响应失败，将重复此次的生成请求 code: ${response.status}`,
                  "Error",
                  `生成图像失败，将重复此次的生成请求`,
                  "error"
                );
                GENERATING.REQUIESTING = false;
                GENERATING.WAITING = true;
                setTimeout(() => {
                  GENERATING.WAITING = false;
                }, 5000);
              }
            }
            return response;
          } catch (error) {
            ELMess(
              `generate-image无响应，将重复此次的生成请求 error: ${error}`,
              "Error",
              `无响应，将重复此次的生成请求`,
              "error"
            );
            GENERATING.REQUIESTING = false;
            GENERATING.WAITING = true;
            setTimeout(() => {
              GENERATING.WAITING = false;
            }, 5000);
          }
        };
        intercepted = true;
      } else {
        Debug("FetchInterceptor已启用，无需重复启用");
      }
    }

    static stop() {
      if (intercepted == true) {
        unsafeWindow.fetch = this.originalFetch;
        intercepted = false;
      }
    }
  }
  progress.promptList = generate_promptList(toRaw(tasklist));
  FetchInterceptor.intercept();
  progress.now = 0;
  progress.start = true;
  progress.total = progress.promptList.length;
  progress.percentage = 0;
  progress_duration.value = 15;
  next();
};
watch(GENERATING, (newValue, oldValue) => {
  const { REQUIESTING, BUTTON_ACTIVATE, WAITING } = newValue;
  if (!WAITING) {
    if (REQUIESTING == false && BUTTON_ACTIVATE) {
      if (progress.now == progress.total) {
        // 所有任务已完成
        progress.start = false;
        progress.promptList = [];
        progress.now = 0;
      } else if (progress.start && !progress.pause) {
        button_observer.disconnect();
        next();
      }
    }
  }
});
const next = async () => {
  let { prompt, uprompt } = progress.promptList[progress.now];
  setTimeout(async () => {
    ELMess(
      `等待${delay.value}秒后下一个: ${prompt}::${uprompt}`,
      `Info`,
      `延迟${delay.value}秒，下一个:
      <br>
      ${prompt.substr(0, 20) + "..." + prompt.substr(-20, 20)}
      <br>
      ${uprompt.substr(0, 20) + "..." + uprompt.substr(-20, 20)}`,
      "info",
      4.5,
      true
    );
    setTimeout(async () => {
      await insert(prompt, uprompt, true);
    }, 1000 * delay.value);
  }, 500);
};

const predefineColors = ref([
  "#59C3FF",
  "#4DFAFF",
  "#45FFCC",
  "#5BFF90",
  "#9DFF62",
  "#ECFF77",
  "#FFE06C",
  "#FFBC61",
  "#FF8960",
  "#FF6792",
  "#F176FF",
  "#AB85FF",
  "#7B7DFF",
  "#5EA7FF",
]);
const upload = ref();
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}

.el-form-item {
  margin-bottom: 1rem;
}

.el-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.el-scrollbar {
  height: auto;
}

.el-card {
  /* margin-bottom: 1rem; */
  width: 100%;
}

.textarea2button_container {
  display: flex;
  margin-bottom: 0.5rem;
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.pluginPanel {
  box-shadow: 0px 16px 48px 16px rgba(64, 158, 255, 0.3),
    0px 12px 32px rgba(64, 158, 255, 0.5), 0px 8px 16px -8px rgba(64, 158, 255, 0.8);
  border: var(--el-border-radius-round);
  position: fixed;
  top: 4vh;
  z-index: 990;
  background-color: white;
  border-radius: var(--el-border-radius-round);
  margin-left: 50%;
  left: -350px;
  width: 700px;
  height: 92vh;
}
@media screen and (min-width: 1200px) {
  .pluginPanel {
    width: 900px;
  }
}
@media screen and (max-width: 700px) {
  .pluginPanel {
    box-shadow: var(--el-box-shadow-dark);
    border: var(--el-border-radius-round);
    position: fixed;
    top: 4vh;
    z-index: 990;
    background-color: white;
    border-radius: var(--el-border-radius-round);
    margin-left: 50%;
    left: -50%;
    width: 100%;
    height: 92vh;
  }
}

.showButton {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.showButton::before {
  content: "";
  background-image: conic-gradient(#ffffff 20deg, transparent 120deg);
  width: 130%;
  height: 130%;
  position: absolute;
  animation: border 3s linear infinite;
}

@keyframes border {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
.button-small-square {
  padding: 5px;
}
.button-rt {
  padding: 5px;
  display: block;
  margin: 0;
}
.button-rt-container {
  display: flex;
  right: 0;
  top: 0;
  position: absolute;
  flex-direction: column;
}
.button-small-square {
  height: auto;
  z-index: 0;
}
</style>

<style>
#app {
  width: 1280px;
}
</style>
