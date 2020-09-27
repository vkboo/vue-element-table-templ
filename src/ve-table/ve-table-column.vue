<template>
  <el-table-column v-bind="column.attrs" v-on="column.listeners">
    <!-- 嵌套的情况 -->
    <template v-if="column.nests && column.nests.length > 0">
      <el-table-column
        v-for="(col, colIdx) of column.nests"
        :key="colIdx"
        v-bind="col"
        v-on="col.events"
      ></el-table-column>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "VeTableColumn",
  props: {
    columnData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      column: Object.create(null),
    };
  },
  created() {
    const {
      events = {},
      minWidth = "100",
      nests = [],
      ...rest
    } = this.columnData;
    const column = {
      attrs: {
        minWidth: minWidth,
        showOverflowTooltip: true,
        ...rest,
      },
      listeners: {
        ...events,
      },
    };
    // 嵌套
    if (nests.length > 0) {
        column.nests = nests;
    }
    this.column = column;
  },
};
</script>