export const imgError = {
  //当被绑定的元素插入到dom中时
  inserted: function (el, { value }) {
    //聚焦元素
    if( !el.src ){
      el.src = value
    }else{
      el.onerror = function (){
        el.src = value
      }
    }
  },
  update:function (el,{value}) {
    if(!el.src) {
      el.src = value
    }
  }
};
