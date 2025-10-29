<template>
    <div @contextmenu.prevent="contextmenu_status = true" @blur="delayLoseFocus" tabindex="0">
        <div v-if="edit_status == false" class="disabled-select">{{ item }}</div>
        <el-input v-else size="small" v-model="edit_input" :style="{ width: `${item.length + 2}rem` }" @keyup.enter.native="save_class">
            <template #suffix>
                <el-icon class="el-input__icon" style="cursor: pointer; color: #606266" @click.stop="save_class"><save /></el-icon>
            </template>
        </el-input>
        <div class="contextmenu" v-show="contextmenu_status" @click.stop>
            <el-button
                class="button"
                type="primary"
                :icon="EditPen"
                circle
                plain
                @click.stop="
                    () => {
                        // console.log('edit_class');
                        edit_class();
                    }
                "
            />
            <el-button class="button" type="danger" :icon="Delete" circle plain @click.stop="delete_class" />
            <!-- </div> -->
        </div>
    </div>
</template>
<script setup>
import { Delete, EditPen, Select } from '@element-plus/icons-vue';
import { ref } from 'vue';
import save from '@/svg/save.vue';
const props = defineProps({
    deepth: Number,
    item: String,
    container: Object,
    tags: Object,
    topChoice: String
});
const contextmenu_status = ref(false);
const edit_status = ref(false);
const edit_input = ref('');
const delayLoseFocus = () => {
    setTimeout(() => {
        contextmenu_status.value = false;
    }, 100);
};
const edit_class = () => {
    edit_status.value = true;
    edit_input.value = props.item;
    contextmenu_status.value = false;
};
const save_class = () => {
    const oldKey = props.item;
    const newKey = edit_input.value;
    if (props.deepth == 0) {
        props.tags.value = renameMapKeyPreserveOrder(props.container, oldKey, newKey);
    } else if (props.deepth == 1) {
        props.tags.value.set(props.topChoice, renameMapKeyPreserveOrder(props.container, oldKey, newKey));
    }

    edit_status.value = false;
};
const delete_class = () => {
    props.container.delete(props.item);
    contextmenu_status.value = false;
};
function renameMapKeyPreserveOrder(map, oldKey, newKey) {
    let tempMap = new Map();

    for (let [key, value] of map) {
        if (key === oldKey) {
            tempMap.set(newKey, value); // 使用新键名
        } else {
            tempMap.set(key, value); // 保持原键值对
        }
    }

    return tempMap;
}
</script>
<style scoped>
/* .mouseleave-container {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  position: absolute;

  background-color: rgba(204, 57, 57, 0.827);
} */
.button {
    height: 16px;
    width: 16px;
    margin-inline: 0.1rem;
}
.contextmenu {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
<style>
.el-segmented__item {
    position: relative !important;
}
</style>
