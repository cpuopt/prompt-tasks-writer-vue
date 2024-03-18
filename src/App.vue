<style>
.flex-grow {
  flex-grow: 1;
}
</style>

<template>
  <el-tooltip class="box-item" effect="dark" content="Prompt-Tasks-Writer" placement="bottom">
    <el-button color="#71ffc3" :icon="Odometer" @click="changeShow()"
      :style="{ position: 'fixed', top: '0', right: '10%', height: '30px', width: '30px' }" />
  </el-tooltip>

  <el-container v-show="panelShow" style="height: 100%; width: 100%" :style="{
      boxShadow: 'var(--el-box-shadow-dark)', border: 'var(--el-border-radius-round)'
    }">
    <el-header>
      <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" style="align-items: center;">

        <el-text class="mx-1" type="primary" size="large">NovelAI绘图任务队列生成器</el-text>


        <el-tooltip class="box-item" effect="dark" content="上一次生成完成到下一次开始的时间间隔（单位：s）" placement="bottom">
          <el-input-number style="margin-left: 1rem;" v-model="delay" :min="2" controls-position="right" />
        </el-tooltip>
        <div class="flex-grow"></div>
        <el-button type="danger" plain :icon="CloseBold" @click="changeShow()"
          :style="{ height: '30px', width: '30px' }" />
      </el-menu>

    </el-header>
    <el-main>
      <el-scrollbar height="800px">
        <div style="width: 99%;">


          <div v-for="(task, taskIndex) in tasklist" :key="taskIndex" class="textarea2button_container">
            <el-card style="min-width: 480px">

              <template #header>
                <div class="card-header">
                  <span style="margin-right: 1rem;">任务{{ taskIndex + 1 }}</span>
                  <div v-hide="taskIndex == 0" style="display: inline-block;">
                    <el-tooltip class="box-item" effect="dark" content="移除这一整个任务" placement="top">
                      <el-button type="danger" plain @click="removechild(task, tasklist)" :icon="Minus"></el-button>

                    </el-tooltip>
                  </div>
                </div>
              </template>
              <el-form :model="task" label-width="auto" style="max-width: 100%">
                <el-form-item label="正反向提示词组合方式：">
                  <el-tooltip :content="task.random
      ? '随机抽取正反向提示词进行搭配'
      : '从头依次选取反向提示词进行搭配'
      " placement="top">
                    <el-switch v-model="task.random"
                      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #409eff" :active-value="true"
                      :inactive-value="false" active-text="随机" inactive-text="轮询" />
                  </el-tooltip>
                </el-form-item>
                <el-form-item label="出图数量：">
                  <el-input-number v-model="task.nums" :min="1" />
                </el-form-item>
                <el-form-item label="正向提示词：">
                  <el-card>
                    <el-form :model="task" label-width="auto">
                      <el-form-item label="类型：">
                        <el-tooltip :content="task.prompts.splice
      ? '由多组正向提示词片段拼接成完整的提示词'
      : '从一组完整的正向提示词中选取'
      " placement="top">
                          <el-switch v-model="task.prompts.splice" style="
                          --el-switch-on-color: #13ce66;
                          --el-switch-off-color: #409eff;
                        " :active-value="true" :inactive-value="false" active-text="拼接" inactive-text="完整"
                            @click="task.prompts.data = (task.prompts.splice ? [['']] : [''])" />
                        </el-tooltip>
                      </el-form-item>
                      <el-form-item v-if="task.prompts.splice" label="抽取顺序：">
                        <el-tooltip :content="task.prompts.random
      ? '从每组中随机抽取提示词片段'
      : '从每组中按顺序选取提示词片段'
      " placement="top">
                          <el-switch v-model="task.prompts.random" style="
                          --el-switch-on-color: #13ce66;
                          --el-switch-off-color: #409eff;
                        " :active-value="true" :inactive-value="false" active-text="随机" inactive-text="轮询" />
                        </el-tooltip>
                      </el-form-item>
                      <el-form-item v-if="task.prompts.splice" label="提示词片段组：">
                        <div v-for="(prompts_group, index) in task.prompts.data" style="width: 100%;"
                          class="textarea2button_container">
                          <el-card>
                            <div v-for="(prompt, index) in prompts_group" class="textarea2button_container">
                              <el-input v-model="prompts_group[index]" :autosize="{ minRows: 2, maxRows: 4 }"
                                type="textarea" placeholder="提示词片段" />
                              <div v-hide="index == 0">
                                <el-button type="danger" plain @click="removechild(prompt, prompts_group)"
                                  :icon="Minus"></el-button>
                              </div>
                            </div>

                            <el-button type="primary" @click="addPromptSplice(prompts_group)"
                              :style="{ display: 'block' }" :icon="ArrowDownBold"></el-button>
                          </el-card>
                          <div v-hide="index == 0">
                            <el-button type="danger" plain @click="removechild(prompts_group, task.prompts.data)"
                              :icon="Minus"></el-button>
                          </div>
                        </div>
                        <el-button type="primary" @click="addPromptGroup(task.prompts.data)" :icon="ArrowDownBold"
                          :style="{ width: '100%', display: 'block' }"></el-button>
                      </el-form-item>
                      <el-form-item v-if="!task.prompts.splice" label="完整提示词组：">
                        <el-card style="display: inline-block; width: 100%">
                          <div v-for="(prompt, index) in task.prompts.data" class="textarea2button_container">
                            <el-input v-model="task.prompts.data[index]" :autosize="{ minRows: 2, maxRows: 4 }"
                              type="textarea" placeholder="输入完整的提示词" />
                            <div v-hide="index == 0">
                              <el-button type="danger" plain @click="removechild(prompt, task.prompts.data)"
                                :icon="Minus"></el-button>
                            </div>
                          </div>
                          <el-button type="primary" @click="addPrompt(task.prompts.data)" :icon="ArrowDownBold"
                            :style="{ width: '100%' }"></el-button>
                        </el-card>
                      </el-form-item>
                    </el-form>
                  </el-card>
                </el-form-item>
                <el-form-item label="反向提示词：">
                  <el-card style="min-width: 500px">
                    <el-form :model="task" label-width="auto">
                      <el-form-item label="反向提示词：">
                        <el-card style="display: inline-block">
                          <div v-for="(uprompt, index) in task.uprompts.data" class="textarea2button_container">
                            <el-input v-model="task.uprompts.data[index]" :autosize="{ minRows: 2, maxRows: 4 }"
                              type="textarea" placeholder="输入完整的提示词" />
                            <div v-hide="index == 0">
                              <el-button type="danger" plain @click="removechild(uprompt, task.uprompts.data)"
                                :icon="Minus"></el-button>
                            </div>
                          </div>
                          <el-button type="primary" @click="addPromptSplice(task.uprompts.data)"
                            :style="{ width: '100%', display: 'block' }" :icon="ArrowDownBold"></el-button>
                        </el-card>
                      </el-form-item>
                    </el-form>
                  </el-card>
                </el-form-item>

              </el-form>
            </el-card>

          </div>
          <el-button type="primary" @click="addTask()" :style="{ width: '100%' }">添加任务</el-button>

        </div>
      </el-scrollbar>
      <el-progress :style="{ display: 'flex', marginTop: '0.5rem', width: '100%', height: '50px' }" :color="colors"
        :text-inside="true" :stroke-width="22" :percentage="progress.percentage" v-show="progress.start">
        <span>{{ `${progress.now} / ${progress.total}` }}</span>
      </el-progress>

      <el-button-group v-show="!progress.start"
        :style="{ display: 'flex', marginTop: '0.5rem', width: '100%', height: '50px' }">
        <!-- <el-button type="success" :style="{ width: '50%', height: '100%' }" @click="generate2copy()">
          生成并复制到剪切板</el-button>
        <el-button type="warning" :style="{ width: '50%', height: '100%' }" @click="generate2download()">
          导出到文件
        </el-button> -->
        <el-button type="warning" :style="{ width: '100%', height: '100%' }" @click="runTaskList()">
          启动任务列表
        </el-button>
      </el-button-group>

    </el-main>
  </el-container>
  <div id="testJ" v-show="false">{{ tasklist }}</div>

</template>

<script setup>
import { Odometer, CloseBold, Minus, ArrowDownBold } from "@element-plus/icons-vue";
import { ref, reactive, toRaw, watch } from "vue";
import { Debug, insert, generate_promptList, timeFormat } from './pojo/NAIutils.js';
import { unsafeWindow } from "$";


const progress = reactive({ start: false, now: 0, total: 0, promptList: [], percentage: 0 })
const requesting = ref(false)
const delay = ref(2)
const panelShow = ref(localStorage.getItem("panelShow") == 'false' ? false : true)
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]
const changeShow = () => {
  panelShow.value = !panelShow.value
  localStorage.setItem('panelShow', panelShow.value)
}

const tasklist = reactive(localStorage.getItem("tasklist") == null ? [
  {
    random: false,
    nums: 1,
    prompts: {
      splice: false,
      random: true,
      data: [''],
    },
    uprompts: {
      data: [""],
    },
  },
] : JSON.parse(localStorage.getItem("tasklist")));
watch(
  () => tasklist,
  (newValue, oldValue) => {
    localStorage.setItem("tasklist", JSON.stringify(toRaw(tasklist)))
  },
  { deep: true }
)
const addTask = () => {
  tasklist.push({
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
// const generate2copy = () => {
//   navigator.clipboard.writeText(JSON.stringify(tasklist)).then(() => {
//     ElNotification({
//       title: '成功',
//       message: "提示词队列已成功复制到剪切板，可导入油猴插件使用",
//       position: 'bottom-right',
//       type: 'success',
//     })
//   }, () => {
//     ElNotification({
//       title: '失败',
//       message: "可能是你的浏览器不支持剪切板操作，请使用Chrome内核浏览器或其他新生代浏览器",
//       position: 'bottom-right',
//       type: 'error',
//     })
//   });
// };

// const generate2download = () => {
//   const time = (new Date()).toLocaleDateString('zh-CN', timeFormat)
//   const blob = new Blob([JSON.stringify(tasklist)], {
//     type: 'application/json'
//   })
//   const objectURL = URL.createObjectURL(blob)
//   const aTag = document.createElement('a')
//   aTag.href = objectURL
//   aTag.download = `NAI-Prompt-Linker v1.1.0 task ${time}.json`;
//   aTag.click()
//   URL.revokeObjectURL(objectURL)
// };
let intercepted = false
const ELMess = (title, message, type) => {
  ElNotification({
    title: `${title} ${new Date().toLocaleDateString('zh-CN', timeFormat)}`,
    message: message,
    position: 'bottom-right',
    type: type,
  })
}
const runTaskList = async () => {
  class FetchInterceptor {
    static originalFetch = unsafeWindow.fetch;


    static intercept() {
      if (intercepted == false) {
        unsafeWindow.fetch = async (...args) => {
          let [resource, config] = args;

          // request interceptor starts
          if (/https:\/\/image.novelai.net\/ai\/generate-image/.test(resource) && config.method == 'POST') {
            Debug(`generate-image请求发送`);
            ELMess("Success", "生成请求已发送", 'success')
            requesting.value = true
          }
          // request interceptor ends
          const response = await this.originalFetch(resource, config);
          // response interceptor starts
          if (/https:\/\/image.novelai.net\/ai\/generate-image/.test(resource) && config.method == 'POST') {
            if (response.status == 200) {
              Debug(`generate-image响应成功 code: ${response.status}`);
              ELMess("Success", "生成图像成功", 'success')
              progress.now += 1
              progress.percentage = 100 * progress.now / progress.total
              requesting.value = false
            }
            else {
              Debug(`generate-image响应失败 code: ${response.status}`);
              ELMess("Error", `生成图像失败，将重复此次的生成请求`, 'error')
              requesting.value = false
              return Promise.reject(response);
            }
          }
          // response interceptor here
          return response;
        };
        intercepted = true
      } else {
        Debug("FetchInterceptor已启用，无需重复启用")
      }

    }

    static stop() {
      unsafeWindow.fetch = this.originalFetch;
      intercepted = false
    }
  }
  progress.promptList = generate_promptList(toRaw(tasklist))
  FetchInterceptor.intercept()
  progress.now = 0
  progress.start = true
  progress.total = progress.promptList.length
  progress.percentage = 0
  await next()
}
watch(requesting, (requesting, prevrequesting) => {
  if (requesting == false && prevrequesting == true) {
    if (progress.now == progress.total) {
      progress.start = false
    } else {
      next()
    }

  }
})
const next = () => {
  let { prompt, uprompt } = progress.promptList[progress.now]
  Debug(`等待${delay.value}秒后下一个: ${prompt}::${uprompt}`)
  setTimeout(() => {
    ELMess(`Info`, `延迟${delay.value}秒，下一个: ${prompt}::${uprompt}`, 'info')
  }, 500)
  setTimeout(async () => {
    await insert(prompt, uprompt, true)
  }, 1000 * delay.value)

}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 1rem;
}

.el-card {
  margin-bottom: 1rem;
  min-width: 300px;
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
</style>

<style>
#app {
  width: 1280px;
}
</style>