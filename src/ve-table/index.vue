<template>
  <div 
   class="zj-table" 
   :style="{ height: this.tableContainerHeight }"
  >
    
    <template v-if="buttons.length > 0 || $slots.toolbar">
        <ve-toolbar 
          :buttons="buttons"
          :selectable="selectable"
          :selectRows="selectRows"
          :currentRow="currentRow"
        >
            <template #toolbar>
                <slot name="toolbar" />
            </template>
        </ve-toolbar>
    </template>
    <ve-table-content />
    <ve-page />
  </div>
</template>

<script>
// import Schema from 'async-validator'
import { Table } from 'element-ui'

import VePage from './ve-page'
import VeTableContent from './ve-table-content'
import VeToolbar from './ve-toolbar'




// const tableProps = {
//   defaultExpandAll: Table.props.defaultExpandAll,
//   treeProps: Table.props.treeProps,
//   expandRowKeys: Table.props.expandRowKeys
// }

export default {
  name: "VeTable",
  components: {
      VeToolbar,
      VeTableContent,
      VePage,
  },
  props: {
    ...Table.props,
    // 表格数据
    data: {
      type: Array,
      default: () => [],
    },
    /**
     * 字段列信息
     *  {
     *    label: '名称',
     *    prop: '字段属性',
     *    // 表头嵌套
     *    nests: [],
     *    editable: 是否可编辑,
     *    field: {}// 编辑的字段属性,
     *    beforeEdit: (row,column,cellValue,index) => true 编辑前触发，返回true可编辑
     *  }
     *
     */
    columns: {
      type: Array,
      default: () => [],
    },
    // 工具条按钮
    buttons: {
      type: Array,
      default: () => [],
    },
    // 是否分页
    pagination: {
      type: Boolean,
      default: true,
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10,
    },
    // 总条数
    total: {
      type: Number,
      default: 0,
    },
    // 当前页码
    currentPage: {
      type: Number,
      default: 1,
    },
    // 是否显示复选框
    selectable: {
      type: Boolean,
      default: true,
    },
    // 是否显示序号列
    sequence: {
      type: Boolean,
      default: false,
    },
    /**
     * 默认表格的高度是充满父容器的
     * 如果height 设置为 'auto',则表格高度将会根据内容自动撑起来
     */
    height: {
      type: [Number, String],
      default: 0,
    },
    // 表格是否排序
    sortable: {
      type: Boolean,
      default: false,
    },
    // 行唯一值
    rowKey: {
      type: String,
      default: "id",
    },
  },
  data() {
    return {
      // 复选框选中的行
      selectRows: [],
      // 点击行选中的当前行
      currentRow: undefined,
      // 内部高度，动态计算
      innerHeight: 0,
      // 行编辑开启的行索引集合
      editRowsKey: [],
      // 行编辑的编辑数据，key值为行索引
      editRowsData: {},
      // 分页条的高度 TODO: 暂时写死，
      paginationHeight: 52,
      // 按钮区域的高度 TODO: 暂时写死
      buttonHeight: 42,
    };
  },
  computed: {
    // 计算表格区域高度
    tableHeight() {
      const {
        height,
        innerHeight,
        pagination,
        buttons,
        buttonHeight,
        paginationHeight,
      } = this;
      if (height) {
        let customHeight = height;
        if (typeof customHeight === "string") {
          if (customHeight.endsWith("px")) {
            customHeight = parseFloat(customHeight);
          }
        }
        if (typeof customHeight === "number") {
          return (
            customHeight -
            (pagination ? paginationHeight : 0) -
            (buttons.length ? buttonHeight : 0)
          );
        }
        return customHeight;
      } else {
        return innerHeight;
      }
    },
    // 计算表格容器的高度
    tableContainerHeight() {
      const { height } = this;
      if (height) {
        if (typeof height === "number") {
          return `${height}px`;
        }
        return height;
      }
      return "100%";
    },
  },
};
</script>