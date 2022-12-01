<template>
    <div class="fixed top-0 left-0 min-h-screen w-full z-10 transition-all flex items-center justify-center">
        <div class="z-30 bg-base-300 p-4 rounded-md shadow-md transition-all flex flex-col gap-4">
            <div class="flex gap-4 items-center justify-center">
                <h1 class="transition-all self-center text-gray-200">
                    {{activeTodoId}}
                </h1>
                <input 
                    v-model="time_on" 
                    @blur="v$.time_on.$touch" 
                    class="input input-bordered input-primary w-[75px] text-slate-200" />
                -
                <input 
                    v-model="time_off" 
                    @blur="v$.time_off.$touch" 
                    class="input input-bordered input-primary w-[75px] text-slate-200" />
            </div>
            <div class="flex flex-col gap-4">
                <input 
                    v-model="name" 
                    placeholder="ФИО" 
                    @blur="v$.name.$touch" 
                    class="input input-bordered input-primary w-full text-slate-200" />
                <input 
                    v-model="reason" 
                    placeholder="ОПИСАНИЕ" 
                    @blur="v$.reason.$touch" 
                    class="input input-bordered input-primary w-full text-slate-200" />
            </div>
            <div class="transition-all self-center flex items-center gap-8">
                <button
                    @click="changeTodoItem" 
                    class="transition-all btn btn-success">
                        Сохранить
                </button>
                <button 
                    @click="delTodoItem"
                    :disabled="!isAdmin"
                    class="transition-all btn btn-error">
                        Удалить
                </button>
                <button 
                    @click="$emit('closeModal')"
                    class="transition-all btn btn-info">
                        Закрыть
                </button>
            </div>
        </div>
        <div 
            @click="$emit('closeModal')"
            class="absolute top-0 left-0 min-h-screen w-full bg-black opacity-50 z-20 transition-all">
        </div>
    </div>
</template>

<script>

import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { useToast } from "vue-toastification";
import { getMinutes } from "../../helpers/time";

export default {

    setup: () => ({ 
        v$: useVuelidate(),
        toast: useToast() 
    }),

    data () {
        return {
            time_on: this.selectedItem.time_on,
            time_off: this.selectedItem.time_off,
            name: this.selectedItem.name,
            reason: this.selectedItem.reason,
        } 
    },
    validations() {
        return {
            name: { 
                maxValue: maxLength(255), 
                validateTextFields: this.validateTextFields 
            },
            reason: { 
                maxValue: maxLength(255), 
                validateTextFields: this.validateTextFields
            },
            time_on: { 
                required, 
                minLength: minLength(4), 
                maxValue: maxLength(5), 
                validateTime: this.validateTimeOn,
                validateIntersectionTime: this.validateIntersectionTime,
                validateTimeDifference: this.validateTimeDifference
            },
            time_off: { 
                required, 
                minLength: minLength(4),
                maxValue: maxLength(5), 
                validateTime: this.validateTimeOff, 
                validateIntersectionTime: this.validateIntersectionTime,
                validateTimeDifference: this.validateTimeDifference 
            },
        }
    },

    props: {
        selectedItem: {required: true},
        activeTodoId: {required: true},
        selectedIndexItemTodo: {required: true},
    },

    computed: {

        isAdmin () {
            return this.$store.getters['auth/isAdmin']
        },

        isIntersection () {
            return this.$store.getters.getTodoTimingIntersection({
                time_on: this.time_on,
                time_off: this.time_off,
                index: this.selectedIndexItemTodo
            })
        }

    },

    methods: {
        
        delTodoItem () {
            this.$store.commit('DEL_TODO_ITEM', {
                id: this.activeTodoId,
                index: this.selectedIndexItemTodo
            })
            this.toast.success('Успешно удалено')
            this.$emit('closeModal')
        },

        validateTimeOn () {
            if (this.time_on.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) {
                return true
            } else {
                return false
            }
        },

        validateTimeOff () {
            if (this.time_off.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) {
                return true
            } else {
                return false
            }
        },

        validateTimeDifference () {
            let minuteTimeOn = getMinutes(this.time_on)
            let minuteTimeOff = getMinutes(this.time_off)
            if (minuteTimeOn < minuteTimeOff) {
                return true
            } else {
                return false
            }
        },

        validateTextFields () {
            if (!this.name && !this.reason) {
                return true
            } else if (this.name && this.reason) {
                return true
            } else {
                return false
            }
        },

        validateIntersectionTime () {
            if (this.isIntersection) {
                return true
            } else  {
                return false
            }
        },

        async changeTodoItem () {
            const result = await this.v$.$validate()
            if (result) {
                    this.$store.commit('CHANGE_TODO_ITEM', {
                    id: this.activeTodoId,
                    index: this.selectedIndexItemTodo,
                    name: this.name,
                    reason: this.reason,
                    time_off: this.time_off,
                    time_on: this.time_on,
                })
                this.toast.success('Успешно изменено')
                this.$emit('closeModal')
            } else {
                const errorName = this.v$.$errors[0].$propertyPath
                const validator = this.v$.$errors[0].$validator
                let errorMessage = ''
                if (errorName === 'name' || errorName === 'reason') {
                    errorMessage = 'Поле ФИО и описание должны быть пустыми или заполнены'
                } else {
                    validator === 'validateIntersectionTime' ? errorMessage = 'Пересечение времени =(' : errorMessage = 'Неверно введено время'
                }
                this.toast.error(errorMessage)
            }
        }
    }
}
</script>
