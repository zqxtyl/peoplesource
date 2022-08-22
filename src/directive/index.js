import store from '@/store'
export const  imgError =  {
    inserted( el , { value } ){
            // 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个事件 => onerror
            if(!el.src){
          el.src=value

            }else{
              el.onerror=function(){
                el.src=value
              }
            }

      },
      // 当更新的时候el.src为空的时候执行
      update( el , { value }){
        if(!el.src){
          el.src=value
            }
      }

}    

export const isHas={
  inserted(el,binding){
    console.log(el);
    console.log(binding);
    const has=store.state.permission.points.includes(binding.value)
    if(!has){
      el.remove()
    }
  }
}
