<template>
    <div class="button-group" style="padding-inline: 0.2rem">
        <el-button v-if="preset_load_status == false" size="small" @click.stop="upload_and_load()">加载预设</el-button>
        <div v-else style="display: flex; flex-direction: row">
            <el-select size="small" v-model="Tag_select" style="width: 136px" @change="PRESETS_CHANGE" placeholder="选择要加载的预设">
                <el-option size="small" v-for="item in PRESETS.prompts" :key="item.name" :value="item.name">
                    <span style="float: left">{{ item.name }}</span>
                </el-option>
            </el-select>
            <el-button size="small" type="danger" plain @click.stop="preset_load_status = false">取消</el-button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { PromptsBuilder } from '@/pojo/NAIutils.js';
const props = defineProps({
    PRESETS: Object,
    container: Object,
    PRESETS_NAME: String
});

const PRESETS_load = () => {
    const presets = localStorage.getItem(props.PRESETS_NAME);
    if (presets) {
        return JSON.parse(presets);
    } else {
        return [];
    }
};

const upload_and_load = () => {
    props.PRESETS.prompts = PRESETS_load();
    preset_load_status.value = true;
};

const preset_load_status = ref(false);
const Tag_select = ref('');
const selectedTagsString = (selectedTags) => {
    return selectedTags.map((tag) => tag.show).join(',');
};
const PRESETS_get = (name) => {
    return props.PRESETS.prompts.filter((item) => {
        return item.name == name;
    })[0].tags;
};
const PRESETS_CHANGE = (value) => {
    preset_load_status.value = false;
    Tag_select.value = '';
    props.container.push(PromptsBuilder.addPromptSplice(selectedTagsString(PRESETS_get(value))));
    ElMessage({
        message: `已加载预设 ${value}`,
        type: 'success'
    });
};
</script>
