/** * TableList表格组件 */ /** * Table表格 */
<template>
  <div class="table_list_fix">
    <!-- table表格 -->
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :border="border"
      :data="dataSource"
      :header-cell-style="{ background: '#F5F7FA' }"
      size="small"
      style="width: 100%"
      v-bind="options"
    >
      <!--      序号-->
      <el-table-column
        v-if="options && options.index"
        align="center"
        type="index"
        :label="options && options.labelIndex"
        width="55"
      />

      <!-- 表格数据 -->
      <template v-for="(column, index) in columns">
        <!--若有插槽则用此列-->
        <template v-if="column.scopedSlots">
          <el-table-column
            :key="index"
            :align="column.align || 'left'"
            :label="column.label"
            :prop="column.prop"
            :width="column.width"
          >
            <template #default="scope">
              <slot
                :index="scope.index"
                :name="column.scopedSlots"
                :row="scope.row"
              >
              </slot>
            </template>
          </el-table-column>
        </template>
        <!--若无插槽则用此列-->
        <template v-else>
          <el-table-column
            :key="index"
            :align="column.align || 'left'"
            :label="column.label"
            :prop="column.prop"
            :width="column.width"
            show-overflow-tooltip
            v-bind="column.props"
          >
          </el-table-column>
        </template>
      </template>
    </el-table>
    <br />
    <!-- 分页部分 -->
    <el-pagination
      :class="options && options.pageExtendLayout ? '' : 'pagination'"
      v-if="pagination"
      :page-size="pagination.pageSize"
      :page-sizes="[5, 10, 20, 30, 50, 100]"
      :total="dataTotal"
      :current-page="pagination.currentPage"
      background
      @size-change="handleSizeChange"
      @current-change="handleChangePage"
      :layout="
        (options && options.pageExtendLayout) || 'total, prev, pager, next'
      "
    />
  </div>
</template>

<script>
const methods = {
  // 改变分页触发事件
  handleChangePage(val) {
    this.$emit("current-change", val);
  },

  handleSizeChange(page) {
    this.$emit("size-change", page);
  },
};

export default {
  name: "TableList",
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    border: {
      type: Boolean,
      default: () => false,
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    slotcontent: {
      type: Boolean,
      default: () => false,
    },
    dataTotal: {
      type: Number,
      default: 0,
    },
    pagination: Object,
    options: Object,
  },

  data() {
    return {
      multipleSelection: [],
    };
  },

  methods,

  mounted() {
    this.$nextTick(() => {
      this.$emit("toggleRowSelection", this.$refs.multipleTable);
    });
  },

  components: {
    render: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null,
        },
      },
      render: (h, opt) => {
        const params = {
          row: opt.props.row,
          index: opt.props.index,
        };
        if (opt.props.column) params.column = opt.props.column;
        return opt.props.render(h, params);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.table_list_fix {
  overflow: hidden;
}
.table-header {
  padding-top: 10px;
  .table-header_button {
    text-align: right;
    float: right;
    margin-bottom: 12px;
    line-height: 40px;
  }
}
.newjump {
  text-decoration: none;
  color: dodgerblue;
}
.pagination {
  text-align: end;
  padding-bottom: 15px;
}
</style>