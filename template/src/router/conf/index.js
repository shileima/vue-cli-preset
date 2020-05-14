import Home from '@/views/home/Home.vue'
const About = () => import(/* webpackChunkName: 'about' */ '@/views/about/About.vue')

const config = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'home',
      pv: {
        page_type: 'home',
        page_name: 'home'
      }
    }
  }, {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: 'about',
      pv: {
        page_type: 'about',
        page_name: 'about'
      }
    }
  }
]

export default config
