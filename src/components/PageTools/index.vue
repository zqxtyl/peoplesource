<template>
  <el-card class="box-card">
    <el-row type="flex">
      <el-col>
        <el-tag>
          <i :class="leftIcon"></i>
          <slot name="left-tag"></slot>
        </el-tag>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: 'PageTools',
  data() {
    return {}
  },
  props: {
    leftIcon: {
      type: String,
      default: 'el-icon-info',
    },
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
  watch: {},
}
</script>
<style lang='less' scoped>
</style>