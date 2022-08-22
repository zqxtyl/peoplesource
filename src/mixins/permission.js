//可以定义一个对象，该对象最终会将它混入到组件中
// 组件有的，这个对象都可以有
import permissionPoint from "@/constant/permission";
export default {
  data() {
    return {
      point: permissionPoint,
    };
  },
  methods: {
    // 控制按钮权限
    isHas(point) {
      return this.$store.state.permission.points.includes(point);
    },
  },
};
