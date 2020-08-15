<template>
    <el-table-column
      v-bind="column.attrs"
      v-on="column.listeners"
    >

        <!-- 嵌套的情况 -->
        <el-table-column
            v-bind="column.attrs"
            v-on="column.listeners"
        ></el-table-column>
    
    </el-table-column>
</template>

<script>
export default {
    name: 'VeTableColumn',
    props: {
        columnData: {
            type: Object,
            required: true,
        }
    },
    data () {
        return {
            column: Object.create(null),
        }
    },
    created () {
        const columnData = this.columnData
        if (columnData.nests && columnData.nests.length > 0) {
            this.$_renderNestsColumn();
        } else {
            this.$_renderDefaultColumn();
        }
    },
    methods: {
        /** 嵌套先不做 */
        $_renderNestsColumn () {

        },
        $_renderDefaultColumn () {
            const { events = {}, minWidth = '100', ...rest } = this.columnData
            this.column = {
                attrs: {
                    minWidth: minWidth,
                    showOverflowTooltip: true,
                    ...rest,
                },
                listeners: {
                    ...events
                }
            }
        }
    }
}
</script>