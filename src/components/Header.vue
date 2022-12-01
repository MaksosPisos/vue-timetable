<template>
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <div class="dropdown">
                <label 
                    tabindex="0" 
                    class="btn btn-ghost lg:hidden">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="h-5 w-5" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </label>
                <ul 
                    tabindex="0"
                    class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <router-link to="/todo">
                            Todo
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/about">
                            About
                        </router-link>
                    </li>
                </ul>
            </div>
            <router-link
                to="/todo" 
                class="btn btn-ghost normal-case text-xl text-primary-content">
                TodoApp
            </router-link>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal p-0 gap-4">
                <li>
                    <router-link to="/todo">
                        Todo
                    </router-link></li>
                <li>
                    <router-link to="/about">
                        About
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <router-link 
                to="/" 
                @click="resetAuth"
                class="btn btn-info">
                Выйти
            </router-link>
        </div>
    </div>
</template>

<script>
import { useToast } from "vue-toastification";
export default {
    setup: () => ({ 
        toast: useToast(),
    }),

    methods: {
        resetAuth() {
            this.$store.commit('auth/RESET_AUTH')
            this.toast.success('Вы вышли из аккаунта')
        }
    }

}

</script>