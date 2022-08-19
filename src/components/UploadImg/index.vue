<template>
  <div>
    <el-upload
      action="#"
      :http-request="onRequest"
      list-type="picture-card"
    >
      <i class="el-icon-plus" />
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'index',
  props: {},
  data() {
    return {}
  },
  created() {},
  methods: {
    onRequest() {},
  },
  computed: {},
  watch: {},
  mounted() {},
  components: {},
}
</script>
<style scoped lang="scss"></style>
