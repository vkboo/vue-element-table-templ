<template>
  <div class="zj-table__toolbar">
    <div class="zj-table__buttons">
      <ve-buttons 
        v-if="buttons.length > 0"
        :buttons="buttons"
        :selectable="selectable"
        :selectRows="selectRows"
        :currentRow="currentRow"
      />
      <slot name="toolbar" />
    </div>
  </div>
</template>

<script>
import VeButtons from './ve-buttons'
export default {
  name: "VeToolbar",
  components: {
      VeButtons,
  },
  props: {
    // 工具条按钮
    buttons: {
      type: Array,
      default: () => [],
    },
    // 是否显示复选框
    selectable: {
      type: Boolean,
      default: true,
    },
    selectRows: {
        type: Array,
        default: () => [],
    },
    currentRow: {
        type: Array,
        default: undefined,
    },
  },
};
</script>