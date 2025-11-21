import { defineStore } from 'pinia'
import pluginConfig from '/plugin.config.js';

export const usePromptTaskWriterStorage = defineStore('prompt-task-writer', {
    state: () => ({
        tasklist: [],
        PRESETS_NAME: `${pluginConfig.name}_v${pluginConfig.userscript.version}_presets`,
        PRESETS: { prompts: [] },
        colorPicker_status: false,
        /**
         * @description 插件面板显示状态
         */
        panelShow: { show: false },
        predefineColors: ['#59C3FF', '#4DFAFF', '#45FFCC', '#5BFF90', '#9DFF62', '#ECFF77', '#FFE06C', '#FFBC61', '#FF8960', '#FF6792', '#F176FF', '#AB85FF', '#7B7DFF', '#5EA7FF'],

        /**
         * @description 生成请求状态
         */
        GENERATING: {
            REQUIESTING: false,
            BUTTON_ACTIVATE: false,
            WAITING: false
        },
        themeColor: { textPrompt: '', bg1: '' }
    }),
    actions: {

    }
})
