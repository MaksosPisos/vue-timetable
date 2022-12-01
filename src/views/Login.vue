<template>
    <div class="flex flex-col items-center justify-center">
        <div class="bg-base-300 p-4 flex flex-col gap-2 rounded shadow min-w-[550px]">
            <div class="relative">
                <h3 class=" text-center text-3xl font-bold text-primary-content">
                    Войти в аккаунт
                </h3>
            </div>
            <div class="flex flex-col mx-auto gap-5 pt-4">
                <div class="form-control relative">
                    <span
                        v-show="v$.login.$error"
                        class="text-xs pl-[100px] text-error absolute -top-5">
                            Поле логин обязательно для заполнения
                    </span>
                    <label class="input-group">
                        <span class="min-w-[100px] flex items-center pl-0 gap-1">
                            Логин
                        </span>
                        <input
                            type="text" 
                            placeholder="admin or operator" 
                            v-model="login"
                            @blur="v$.login.$touch"
                            :class="{ 'input-error': v$.login.$error || error }"
                            class="input input-bordered input-primary min-w-[250px] text-slate-200" />
                    </label>
                </div>
                <div class="form-control relative">
                    <span
                        v-if="v$.password.$error" 
                        class="text-xs pl-[100px] text-error absolute -top-5">
                        Поле пароль обязательно для заполнения
                    </span>
                    <label class="input-group">
                        <span class="min-w-[100px] pl-0">Password</span>
                        <input 
                            :type="!showPassword ? 'password' : 'text'"
                            placeholder="Password" 
                            v-model="password"
                            @blur="v$.password.$touch"
                            :class="{ 'input-error': v$.password.$error || error }"
                            class="input input-bordered input-primary min-w-[250px] text-slate-200" />
                    </label>
                    <i    
                        @mousedown="(showPassword = true)" 
                        @mouseup="(showPassword = false)"
                        class="fa-solid fa-eyes absolute top-4 right-3 cursor-pointer text-primary hover:text-secondary transition-colors">
                    </i>
                </div>
                <button 
                    type="submit"
                    :disabled="v$.$invalid"
                    @click="auth"
                    class="btn btn-primary flex items-center gap-2 transition-all">
                        <i class="fa-solid fa-user-alien"></i>
                        <span>Войти</span> 
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { useToast } from "vue-toastification";

export default {

    setup: () => ({ 
        v$: useVuelidate(),
        toast: useToast(),
    }),

    data() {
        return {
            login: '',
            password: '',
            showPassword: false,
            error: ''
        }
    },
    
    validations() {
        return {
            login: { required, minLength: minLength(5) },
            password: { required, minLength: minLength(5) },
        }
    },

    methods: {
        auth () {
            if (this.login === this.password && this.login === 'admin' || this.login === 'operator') {
                this.$store.commit('auth/SET_AUTH', this.login)
                this.$router.push({name: 'todo'})
                this.toast.success(`Функционал для ${localStorage.auth}`)
            } else {
                this.toast.error('Пароль и логин для админа: admin; для оператора: operator')
            }
        }
    },
}
</script>