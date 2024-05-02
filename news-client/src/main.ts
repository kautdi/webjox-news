import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from './pages/Auth.vue'
import News from './pages/News.vue'
import NewsDetails from './pages/NewsDetails.vue'
import AddNews from './pages/AddNews.vue'

const app = createApp(App)

const routes = [
    { path: '/auth', name: 'Auth', component: Auth },
    { path: '/news', name: 'News', component: News },
    { path: '/add-news', name: 'AddNews', component: AddNews },
    { path: '/newsdetails/:id', name: 'NewsDetails', component: NewsDetails },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

app.use(router)
app.mount('#app');