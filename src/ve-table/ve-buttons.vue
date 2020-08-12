<template>
  <div>
      <template 
        v-for="(button,index) of actionsData"
      >
        <template v-if="button.children && button.children.length > 0">
            <el-dropdown :key="index" @command="dropdownClick">
              <template>
                <slot v-if="button.useSlot" name="button" />
                <el-button v-else :key="index" @click="button.click">
                    {{button.text}}
                    <template v-if="button.children && button.children.length > 0">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </template>
                </el-button>
              </template>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item 
                    v-for="({id, text, click, ...rest}) of button.children"
                    :command="id" 
                    :key="id" 
                    @click="click"
                    v-bind="rest"
                >
                    {{ text }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </template>
        <template v-else>
            <slot v-if="button.useSlot" name="button" />
            <el-button v-else :key="index" @click="button.click">
                {{button.text}}
                <template v-if="button.children && button.children.length > 0">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </template>
            </el-button>
        </template>

        
      </template>
  </div>
</template>

<script>
import { throttle } from 'lodash'
export default {
  name: "VeButtons",
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