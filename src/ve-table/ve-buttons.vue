<template>
  <div>
      <template 
        v-for="({click, text, children, useSlot, ...rest},index) of actionsData"
      >
        <template v-if="children && children.length > 0">
            <el-dropdown :key="index" @command="dropdownClick">
              <template>
                <slot v-if="useSlot" name="button" />
               <ve-button 
                v-else 
                :key="index"
                :button="{click, text, children}"
                v-bind="rest"
               >
              </ve-button>
              </template>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item 
                    v-for="({id: _id, text: _text, click: _click, ..._rest}) of children"
                    :command="_id" 
                    :key="_id" 
                    @click="_click"
                    v-bind="_rest"
                >
                    {{ _text }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </template>
        <template v-else>
            <slot v-if="useSlot" name="button" />
            <ve-button 
              v-else 
              :key="index"
              :button="{click, text, children}"
              v-bind="rest">
            </ve-button>
        </template>

        
      </template>
  </div>
</template>

<script>
import { throttle } from 'lodash'
import VeButton from './ve-button'
export default {
  name: "VeButtons",
  components: {
    VeButton,
  },
  props: {
      buttons: {
          type: Array,
          default: () => []
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
  data () {
      return {
          actionsData: [],
      }
  },
  mounted () {
     this.renderButtons()
  },
  methods: {
    // 预处理操作按钮
    _preActionButtons(actions, ...args) {
      /**
       * 分析函数属性
       * @param {Function, String ,Boolean} prop 要分析的属性
       */
      const analyseFunProp = (prop) => {
        return typeof prop === "function" ? prop(...args) : prop;
      };
      return actions
        .filter(({ before = true }) => {
          return analyseFunProp(before);
        })
        .map(({ click, disabled = false, children = [], ...rest }) => {
          // 特殊处理点击事件
          const onClick =
            click &&
            throttle(() => click(...args), 100, {
              trailing: false,
            });
          return {
            click: onClick || (() => ({})),
            disabled: analyseFunProp(disabled),
            children: this._preActionButtons(children, ...args),
            ...rest,
          };
        });
    },
    renderButtons() {
        this.actionsData = this._preActionButtons(this.buttons, [this.selectable ? this.selectRows : this.currentRow],)
    },
    dropdownClick(command) {
        console.log(command)
        // const click = events[command]
        // click(...args)
    }
  },
};
</script>