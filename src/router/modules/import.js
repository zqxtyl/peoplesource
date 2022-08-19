import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/import/index.vue'),
      meta: { title: '导入', icon: 'lock' }
    }
  ]
}
