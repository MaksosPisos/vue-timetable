import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/todo",
    name: "todo",
    component: () => import("../views/Todo.vue"),
    meta: {
      authorizationRequired: true
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
    meta: {
      authorizationRequired: true
    },
  },
  {
    path: "/404",
    component: () => import("../views/NotFound.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFound.vue"),
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.authorizationRequired) {
    if (localStorage.auth) {
      next()
    } else {
      next({name: 'login'})
    }
  } else {
    next()
  }
})

export default router;