<template>
  <div class="table__container">
    <el-table
      :data="data"
      highlightCurrentRow
      :rowKey="rowKey"
      border
      @selection-change="$_handleTableSelectionChange"
      @current-change="$_handleTableCrrentChange"
      @sort-change="$_handleSortChange"
      @row-click="$_handleRowClick"
      class="zj-table__body"
      v-on="$listeners"
      v-bind="tableProps"
      ref="table"
    >
      <el-table-column v-if="selectable" type="selection" width="40" fixed="left"></el-table-column>
      <el-table-column
        v-if="sequence"
        :resizable="false"
        label="序号"
        width="50"
        type="index"
        fixed="left"
        align="center"
        :index="$_setColIndex"
      ></el-table-column>
      <!-- 遍历table的数据列 -->
      <template v-for="({
        label, field = {}, align = 'left',
        useSlot = false, formatter, width,
        editable, events, ...rest
      }, index) of cp_showColumns">
        <!-- 渲染嵌套列 -->
        <!-- <el-table-column
          v-if="column.nests && nests.length.length > 0"
          :key="column[rowKey]"
          :label="column.label"
        ></el-table-column> -->
        <!-- 渲染编辑列 -->
        <el-table-column
          :key="index"
          v-if="editable"
          :label="label"
          :width="width"
          :align="align"
          show-overflow-tooltip
          v-on="events"
          v-bind="rest"
        ></el-table-column>
        <el-table-column
          v-else
          :key="index"
          :label="label"
          :width="width"
          :align="align"
          show-overflow-tooltip
          v-on="events"
          v-bind="rest"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { Table } from "element-ui";
const tableProps = {
  defaultExpandAll: Table.props.defaultExpandAll,
  treeProps: Table.props.treeProps,
  expandRowKeys: Table.props.expandRowKeys,
};
export default {
  name: "VeTableContent",
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    rowKey: {
      type: String,
      required: true,
    },
    selectable: {
      type: Boolean,
      required: true,
    },
    sequence: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tableProps: {
        ...Object.keys(tableProps).reduce((result, item) => {
          result[item] = this[item];
          return result;
        }, {}),
        ...this.$attrs,
      },
    };
  },
  computed: {
    cp_showColumns() {
      return this.columns
        .filter((column) => {
          const { hidden } = column;
          if (hidden !== undefined) {
            if (typeof hidden === "function") {
              return hidden({
                columns: this.columns,
                column,
              });
            }
            return hidden;
          }
          return true;
        })
        .map((column) => {
          let newSortable = this.sortable;
          if (column.sortable !== undefined) {
            newSortable = column.sortable ? "custom" : false;
          }
          return {
            ...column,
            sortable: newSortable,
          };
        });
    },
  },
  methods: {
    $_handleTableSelectionChange() {},
    $_handleTableCrrentChange() {},
    $_handleSortChange() {},
    $_handleRowClick() {},
    $_setColIndex(index) {
      return index + 1;
    },
  },
};
</script>