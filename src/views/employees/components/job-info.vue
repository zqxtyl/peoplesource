<template>
  <div>
    <i
      @click="
        $router.push('/employees/print?type=jobInfo')
      "
      class="el-icon-printer"
    />
  </div>
</template>
<script>
export default {
  name: 'job-info',
  props: {},
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {},
  watch: {},
  mounted() {},
  components: {},
}
</script>
<style scoped lang="less"></style>
