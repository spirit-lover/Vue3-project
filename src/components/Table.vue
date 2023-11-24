/** * TableList表格组件 */ /** * Table表格 */
<template>
  <div class="table_list_fix">
    <!-- 扩展性内容 -->
    <slot name="content_context"></slot>
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
      v-on="tableEvents"
      @selection-change="handleSelectionChange"
    >
      <!-- 复选框 -->
      <el-table-column
        v-if="
          options && options.selection && (!options.isShow || options.isShow())
        "
        style="width: 55px"
        type="selection"
      />

      <el-table-column
        v-if="options && options.index"
        :label="options && options.labelIndex"
        align="center"
        type="index"
        width="55"
      />

      <!-- 表格数据 -->
      <template v-for="(column, index) in columns">
        <el-table-column
          v-if="!column.isShow || (column.isShow && column.isShow())"
          :key="index"
          :align="column.align"
          :label="column.label"
          :prop="column.prop"
          :width="column.width"
          show-overflow-tooltip
          v-bind="column.props"
        >
          <template slot-scope="scope">
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span
                  @click="column.click && column.click(scope.row, scope.$index)"
                  v-html="column.formatter(scope.row, column, scope.$index)"
                ></span>
              </template>

              <!-- 跳转操作 -->
              <template v-else-if="column.newjump">
                <router-link
                  :to="column.newjump(scope.row, column, scope.$index)"
                  class="newjump"
                  v-bind="{ target: '_blank', ...column.target }"
                  >{{ scope.row[column.prop] || column.content }}
                </router-link>
              </template>

              <!-- slot插槽 -->
              <template v-else-if="column.slot">
                <slot :index="index" :row="scope.row" :slotName="column.slot" />
              </template>

              <!-- 操作按钮 -->
              <template v-else-if="column.children">
                <template v-for="(btn, key) in column.children">
                  <span
                    v-if="
                      !btn.isShow ||
                      (btn.isShow && btn.isShow(scope.row, scope.$index))
                    "
                    :key="key"
                  >
                    <el-button
                      :disabled="
                        btn.disabled && btn.disabled(scope.row, scope.$index)
                      "
                      :icon="btn.icon"
                      :loading="scope.row?.loading"
                      :plain="btn.plain"
                      :size="btn.size || 'small'"
                      :type="btn.type ? btn.type : 'primary'"
                      style="padding: 6px"
                      @click="btn.method(scope.row, scope.$index)"
                      >{{ btn.label }}</el-button
                    >
                  </span>
                </template>
              </template>
            </template>

            <template v-else>
              <render
                :column="column"
                :index="index"
                :render="column.render"
                :row="scope.row"
              ></render>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <br />
    <!-- 分页部分 -->
    <el-pagination
      v-if="pagination"
      :class="options && options.pageExtendLayout ? '' : 'pagination'"
      :current-page="pagination.currentPage"
      :layout="
        (options && options.pageExtendLayout) || 'total, prev, pager, next'
      "
      :page-size="pagination.pageSize"
      :page-sizes="[5, 10, 20, 30, 50, 100]"
      :total="dataTotal"
      background
      @size-change="handleSizeChange"
      @current-change="handleChangePage"
    />
  </div>
</template>

<script>
const methods = {
  // 复选框选中项
  handleSelectionChange(val) {
    this.multipleSelection = val;
    this.$emit("handleSelectionChange", Array.from(val));
  },

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
    tableEvents: Object,
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
