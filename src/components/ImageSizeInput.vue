<template>
  <el-space :size="10">
    <el-input-number style="width: 100px" v-model="props.imageSize.width" :min="64" :max="49152" :step="64" step-strictly controls-position="right">
      <template #decrease-icon>
        <el-icon>
          <Minus />
        </el-icon>
      </template>
      <template #increase-icon>
        <el-icon>
          <Plus />
        </el-icon>
      </template>
    </el-input-number>
    <el-icon id="exchange-icon" @click.stop="exchangeSize()">
      <Close />
    </el-icon>
    <el-input-number style="width: 100px" v-model="props.imageSize.height" :min="64" :max="49152" :step="64" step-strictly controls-position="right">
      <template #decrease-icon>
        <el-icon>
          <Minus />
        </el-icon>
      </template>
      <template #increase-icon>
        <el-icon>
          <Plus />
        </el-icon>
      </template>
    </el-input-number>
    <el-select v-model="selectSize" placeholder="Select" style="width: 240px" @change="updateSize">
      <el-option-group v-for="group in options" :key="group.label" :label="group.label">
        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
      </el-option-group>
    </el-select>
  </el-space>
</template>

<script setup>
import { Close, Minus, Plus } from '@element-plus/icons-vue';
import { watch, ref } from 'vue';
const props = defineProps(['imageSize']);

watch(
  () => ({ ...props.imageSize }),
  (newValue, oldValue) => {
    console.log(newValue, oldValue);
    const oldWidth = oldValue.width;
    const oldHeight = oldValue.height;
    const { width, height } = newValue;
    const pixel = width * height;
    if (pixel > 3145728) {
      if (oldWidth == width && oldHeight != height) {
        props.imageSize.height = height - Math.ceil((pixel - 3145728) / width / 64) * 64;
      } else if (oldWidth != width && oldHeight == height) {
        props.imageSize.width = width - Math.ceil((pixel - 3145728) / height / 64) * 64;
      }
    }
    updateSelector();
  },
  { deep: true }
);
const selectSize = ref('');

const options = [
  {
    label: 'Nomal',
    options: [
      {
        value: '832x1216',
        label: 'Normal Portrait (832x1216)'
      },
      {
        value: '1216x832',
        label: 'Normal Landscape (1216x832)'
      },
      {
        value: '1024x1024',
        label: 'Normal Square (1024x1024)'
      }
    ]
  },
  {
    label: 'Large',
    options: [
      {
        value: '1024x1536',
        label: 'Large Portrait (1024x1536)'
      },
      {
        value: '1536x1024',
        label: 'Large Landscape (1536x1024)'
      },
      {
        value: '1472x1472',
        label: 'Large Square (1472x1472)'
      }
    ]
  },
  {
    label: 'Wallpaper',
    options: [
      {
        value: '1088x1920',
        label: 'Wallpaper Portrait (1088x1920)'
      },
      {
        value: '1920x1088',
        label: 'Wallpaper Landscape (1920x1088)'
      }
    ]
  },
  {
    label: 'Small',
    options: [
      {
        value: '512x768',
        label: 'Small Portrait (512x768)'
      },
      {
        value: '768x512',
        label: 'Small Landscape (768x512)'
      },
      {
        value: '640x640',
        label: 'Small Square (640x640)'
      }
    ]
  }
];
const rawSize = options.flatMap((element) => element.options.map((option) => option.value));

const exchangeSize = () => {
  const width = props.imageSize.width;
  const height = props.imageSize.height;

  props.imageSize.width = Number(height);
  props.imageSize.height = Number(width);
};
const updateSelector = () => {
  const newSize = `${props.imageSize.width}x${props.imageSize.height}`;
  // 检查是否存在匹配的尺寸
  if (rawSize.some((size) => size === newSize)) {
    selectSize.value = newSize;
  } else {
    selectSize.value = 'Custom';
  }
};
updateSelector();
const updateSize = () => {
  const [width, height] = selectSize.value.split('x');
  props.imageSize.width = Number(width);
  props.imageSize.height = Number(height);
};
</script>
<style scoped>
#exchange-icon:hover {
  cursor: pointer;
}
</style>
