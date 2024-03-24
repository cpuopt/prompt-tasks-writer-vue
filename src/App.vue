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
    <el-container v-show="panelShow" :style="{}" class="pluginPanel" @click.stop>
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
                :key="taskIndex"
                class="textarea2button_container"
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
                            @click="removechild(task, tasklist)"
                            :icon="Minus"
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
                      <el-input-number v-model="task.nums" :min="1" />
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
                                  task.prompts.data = task.prompts.splice ? [['']] : ['']
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
                            <TransitionGroup name="list" tag="div" style="width: 100%">
                              <div
                                v-for="(prompts_group, index) in task.prompts.data"
                                :key="index"
                                style="width: 100%"
                                class="textarea2button_container"
                              >
                                <el-card>
                                  <TransitionGroup name="list" tag="div">
                                    <div
                                      v-for="(prompt, index) in prompts_group"
                                      class="textarea2button_container"
                                      :key="index"
                                    >
                                      <el-input
                                        v-model="prompts_group[index]"
                                        :autosize="{ minRows: 2, maxRows: 4 }"
                                        type="textarea"
                                        placeholder="提示词片段"
                                      />
                                      <div v-hide="prompts_group.length < 2">
                                        <el-button
                                          type="danger"
                                          plain
                                          @click="removechild(prompt, prompts_group)"
                                          :icon="Minus"
                                        ></el-button>
                                      </div>
                                    </div>
                                  </TransitionGroup>
                                  <el-button
                                    type="primary"
                                    @click="addPromptSplice(prompts_group)"
                                    :style="{ display: 'block' }"
                                    :icon="ArrowDownBold"
                                  ></el-button>
                                </el-card>
                                <div v-hide="task.prompts.data.length < 2">
                                  <el-button
                                    type="danger"
                                    plain
                                    @click="removechild(prompts_group, task.prompts.data)"
                                    :icon="Minus"
                                  ></el-button>
                                </div>
                              </div>
                            </TransitionGroup>
                            <el-button
                              type="primary"
                              @click="addPromptGroup(task.prompts.data)"
                              :icon="ArrowDownBold"
                              :style="{ width: '100%', display: 'block' }"
                            ></el-button>
                          </el-form-item>
                          <el-form-item
                            v-if="!task.prompts.splice"
                            label="完整提示词组："
                          >
                            <el-card style="display: inline-block; width: 100%">
                              <TransitionGroup name="list" tag="div">
                                <div
                                  v-for="(prompt, index) in task.prompts.data"
                                  class="textarea2button_container"
                                  :key="index"
                                >
                                  <el-input
                                    v-model="task.prompts.data[index]"
                                    :autosize="{ minRows: 2, maxRows: 4 }"
                                    type="textarea"
                                    placeholder="输入完整的提示词"
                                  />
                                  <div v-hide="task.prompts.data.length < 2">
                                    <el-button
                                      type="danger"
                                      plain
                                      @click="removechild(prompt, task.prompts.data)"
                                      :icon="Minus"
                                    ></el-button>
                                  </div>
                                </div>
                              </TransitionGroup>
                              <el-button
                                type="primary"
                                @click="addPrompt(task.prompts.data)"
                                :icon="ArrowDownBold"
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
                                  :key="index"
                                >
                                  <el-input
                                    v-model="task.uprompts.data[index]"
                                    :autosize="{ minRows: 2, maxRows: 4 }"
                                    type="textarea"
                                    placeholder="输入完整的提示词"
                                  />
                                  <div v-hide="task.uprompts.data.length < 2">
                                    <el-button
                                      type="danger"
                                      plain
                                      @click="removechild(uprompt, task.uprompts.data)"
                                      :icon="Minus"
                                    ></el-button>
                                  </div>
                                </div>
                              </TransitionGroup>
                              <el-button
                                type="primary"
                                @click="addPromptSplice(task.uprompts.data)"
                                :style="{ width: '100%', display: 'block' }"
                                :icon="ArrowDownBold"
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
  <div id="testJ" v-show="false">{{ tasklist }}</div>
</template>

<script setup>
import {
  CopyDocument,
  Odometer,
  CloseBold,
  Minus,
  ArrowDownBold,
} from "@element-plus/icons-vue";
import { genFileId } from "element-plus";
import { ref, reactive, toRaw, watch } from "vue";
import { Debug, insert, generate_promptList, timeFormat } from "./pojo/NAIutils.js";
import { unsafeWindow } from "$";
import { saveAs } from "file-saver";
const inportJsonFileConfirm = ref(false);
const progress = reactive({
  start: false,
  now: 0,
  total: 0,
  pause: false,
  promptList: [],
  percentage: 0,
});
const requesting = ref(false);
const delay = ref(2);
const panelShow = ref(false);

window.onload = () => {
  panelShow.value = localStorage.getItem("panelShow") == "false" ? false : true;
};

document.body.addEventListener(
  "click",
  (e) => {
    if (
      !/el-popper-container/.test(findDeep2ndParentNode(e.target).id) &&
      ["TEXTAREA", "BUTTON"].indexOf(e.target.tagName) == -1
    )
      if (panelShow.value) {
        panelShow.value = false;
        localStorage.setItem("panelShow", panelShow.value);
      }
  },
  false
);

let json_temp_taskList = null;

const json_temp_to_taskList = (append) => {
  if (append) {
    tasklist.push(...json_temp_taskList);
  } else {
    tasklist.splice(0, tasklist.length);
    tasklist.push(...json_temp_taskList);
  }
  inportJsonFileConfirm.value = false;
};
const json_form = ref();
const handleJsonFile = (event) => {
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    try {
      json_temp_taskList = JSON.parse(this.result);
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
  panelShow.value = !panelShow.value;
  localStorage.setItem("panelShow", panelShow.value);
};

const tasklist = reactive(
  localStorage.getItem("tasklist") == null
    ? [
        {
          activate: true,
          random: false,
          nums: 1,
          prompts: {
            splice: false,
            random: true,
            data: [""],
          },
          uprompts: {
            data: [""],
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
    activate: true,
    random: false,
    nums: 1,
    prompts: {
      splice: false,
      random: false,
      data: [""],
    },
    uprompts: {
      data: [""],
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
  container.splice(container.indexOf(item) + 1, 0, JSON.parse(JSON.stringify(item)));
};
const addPromptGroup = (item) => {
  item.push([""]);
};
const addPromptSplice = (item) => {
  item.push("");
};
const removechild = (item, container) => {
  container.splice(container.indexOf(item), 1);
};
const addPrompt = (item) => {
  item.push("");
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
let intercepted = false;
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
const runTaskList = async () => {
  class FetchInterceptor {
    static originalFetch = unsafeWindow.fetch;

    static intercept() {
      if (intercepted == false) {
        unsafeWindow.fetch = async (...args) => {
          let [resource, config] = args;

          // request interceptor starts
          if (
            /https:\/\/image.novelai.net\/ai\/generate-image/.test(resource) &&
            progress.start &&
            config.method == "POST"
          ) {
            ELMess("generate-image请求发送", "Info", "生成请求已发送", "info");
            requesting.value = true;
          }
          // request interceptor ends
          const response = await this.originalFetch(resource, config);
          // response interceptor starts
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
              requesting.value = false;
            } else if (response.status == 429) {
              ELMess(
                `generate-image请求过于频繁，将暂停30秒后重复请求 code: ${response.status}`,
                "Error",
                `响应失败，请求过于频繁，将暂停30秒后重复请求`,
                "error",
                25
              );
              setTimeout(() => {
                requesting.value = false;
              }, 30000);
            } else {
              ELMess(
                `generate-image响应失败，将重复此次的生成请求 code: ${response.status}`,
                "Error",
                `生成图像失败，将重复此次的生成请求`,
                "error"
              );
              requesting.value = false;
              // return Promise.reject(response);
            }
          }
          // response interceptor here
          return response;
        };
        intercepted = true;
      } else {
        Debug("FetchInterceptor已启用，无需重复启用");
      }
    }

    static stop() {
      unsafeWindow.fetch = this.originalFetch;
      intercepted = false;
    }
  }
  progress.promptList = generate_promptList(toRaw(tasklist));
  FetchInterceptor.intercept();
  progress.now = 0;
  progress.start = true;
  progress.total = progress.promptList.length;
  progress.percentage = 0;
  progress_duration.value = 15;
  await next();
};
watch(requesting, (requesting, prevrequesting) => {
  if (requesting == false && prevrequesting == true) {
    if (progress.now == progress.total) {
      // 所有任务已完成
      progress.start = false;
      progress.promptList = [];
      progress.now = 0;
    } else if (progress.start && !progress.pause) {
      next();
    }
  }
});
const next = async () => {
  let { prompt, uprompt } = progress.promptList[progress.now];
  Debug();
  setTimeout(() => {
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
  }, 500);
  setTimeout(async () => {
    await insert(prompt, uprompt, true);
  }, 1000 * delay.value);
};

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

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
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
  margin-bottom: 1rem;
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
</style>

<style>
#app {
  width: 1280px;
}
</style>
