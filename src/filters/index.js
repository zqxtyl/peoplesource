import dayjs from 'dayjs'
 export const formatTime = (value)=>{
  return dayjs(value).format('YYYY-MM-DD')
}