<template>
    <div class="tag">
        <div class="raw tags-handle" @contextmenu.prevent="contextmenu_status = true" @blur="loseFocusDelay" tabindex="0">
            <div class="contextmenu" v-if="contextmenu_status">
                <el-button class="button" color="#409EFF" :icon="CirclePlusFilled" circle plain @click.stop="increaseWeighted" />
                <el-button class="button" color="#E6A23C" :icon="RemoveFilled" circle plain @click.stop="reduceWeight" />
                <el-button class="button" type="danger" :icon="Delete" circle plain @click.stop="delete_tag" />
            </div>
            <el-text style="color: white" class="disabled-select">{{ tag.show }}</el-text>
        </div>

        <div class="local">
            <span class="disabled-select">{{ tag.local }}</span>
            <!-- <el-text size="small" style="color: grey">{{ tag.local }}</el-text> -->
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { Delete, EditPen, Select, CirclePlusFilled, RemoveFilled } from '@element-plus/icons-vue';

const props = defineProps({
    tag: Object,
    container: Object
});
const updateTagShow = () => {
    const weight = props.tag.weight;
    if (weight > 0) {
        props.tag.show = '{'.repeat(weight) + props.tag.raw + '}'.repeat(weight);
    } else if (weight < 0) {
        const abs_weight = Math.abs(weight);
        props.tag.show = '['.repeat(abs_weight) + props.tag.raw + ']'.repeat(abs_weight);
    } else if (weight == 0) {
        props.tag.show = props.tag.raw;
    }

    // console.log(props.tag.show, weight);
};
const increaseWeighted = () => {
    props.tag.weight += 1;
    updateTagShow();
};

const reduceWeight = () => {
    props.tag.weight -= 1;
    updateTagShow();
};

const contextmenu_status = ref(false);
const loseFocusDelay = () => {
    setTimeout(() => {
        contextmenu_status.value = false;
    }, 100);
};
const delete_tag = () => {
    const index = props.container.findIndex((item) => item.raw === props.tag.raw);
    if (index > -1) {
        props.container.splice(index, 1);
    }
    contextmenu_status.value = false;
};
</script>
<style scoped>
.tag {
    display: flex;
    position: relative;
    box-sizing: border-box;
    overflow: visible;
    margin: 0.5rem 0 0 0.5rem;
    max-width: 100%;
    cursor: default;
}
.tag .contextmenu {
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
}
.tag .contextmenu .button {
    height: 16px;
    width: 16px;
    margin-inline: 0.1rem;
}
.tag .raw {
    background-color: #40a0ffe3;
    min-width: 3rem;
    max-width: 95%;
    min-height: 24px;
    text-align: center;
    border-radius: 4px;
    padding-inline: 0.5rem;
}
.tag .local {
    padding-inline: 0.2rem;
    display: flex;
    align-items: flex-end;
    border: 1px dashed #dadada;
    border-left: none;
    border-radius: 0 4px 4px 0;
}

.local span {
    font-size: x-small;
}
</style>
