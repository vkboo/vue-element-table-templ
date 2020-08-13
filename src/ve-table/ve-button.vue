<template>
  <el-button 
    @click="button.click"
    v-bind="$attrs"
  >
    {{button.text}}
    <template v-if="button.children && button.children.length > 0">
      <i class="el-icon-arrow-down el-icon--right"></i>
    </template>
  </el-button>
</template>

<script>
export default {
    name: 'VeButton',
    props: {
        button: {
            type: Object,
            required: true,
        }
    }
}
</script>