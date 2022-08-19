import pageTools from '@/components/myPageTools/pageTools'
import UploadExcel from './upLoadExcel'
import UploadImg from './UploadImg'
const components = [pageTools,UploadExcel ,UploadImg]
export default{
	install(Vue){
		components.forEach(component => {
	 	   Vue.component(component.name,component)
	 })
	}
}