import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createWebHistory, createRouter } from "vue-router";
import PlayersStats from "./views/PlayersStats.vue"
import PlayerStats from "./views/PlayerStats.vue"
import TeamsStats from "./views/TeamsStats.vue"
import store from "./store/store.js";

const routes = [
    {
        path: "/",
        component: PlayersStats,
    },
    {
        path: "/stats/players",
        component: PlayersStats,
    },
    {
        path: "/stats/player/:player_id",
        component: PlayerStats,
    },
    {
        path: "/stats/teams",
        component: TeamsStats,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).use(store).mount('#app')
