

import enLocale from 'element-ui/lib/locale/lang/en'


export default {
  message: {
    hello: "msg hello world",
  },
  hello: "hello world",
  ...enLocale ,
  routes:{
    首页:'dashboard',
    员工:'employees',
    审批:"approver"
  }
};
