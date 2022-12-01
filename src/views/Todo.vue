<template>
    <div class="mx-auto mt-8 max-w-5xl">
        <div class="flex flex-col gap-10">
            <div class="flex self-center">
                <div class="btn-group" v-if="todos.length">
                    <button
                        v-for="todo in todos" key="todo.id"
                        @click="changeTodoActive(todo.id)"
                        :class="{'btn-active': todo.active}"
                        class="btn flex flex-col gap-2">
                        <span>
                            {{todo.id}}
                        </span>
                    </button>
                </div>
                <div v-else>
                    Ничего не найдено =(
                </div>
                <!-- <button>
                    added
                </button> -->
            </div>
            <div
                v-if="isAdmin" 
                class="flex justify-center gap-4">
                <select
                    @change="sortTodoItems"
                    v-model="sortTodoItemsValue"
                    class="select select-primary w-full max-w-xs">
                        <option 
                            v-for="item in textTodoItems" 
                            :value="item.id">
                            {{ item.text }}
                        </option>
                </select>
                <select
                    @change="sortTodosItems"
                    v-model="sortTodosItemsValue"
                    class="select select-primary w-full max-w-xs">
                        <option 
                            v-for="item in textTodosItems" 
                            :value="item.id">
                            {{ item.text }}
                        </option>
                </select>
            </div>
            <div 
                v-if="(todos.length && todoActive.items.length)"
                class="flex flex-wrap gap-4 p-4 justify-center">
                <TodoItem  
                    v-for="(item,index) in todoActive.items" 
                    :key="index" 
                    @click="showModalEditTodo(item, index, todoActive.id)" 
                    :time-on="item.time_on" 
                    :name="item.name"  
                    :reason="item.reason"/>
            </div>
            <div class="flex flex-col flex-wrap gap-4 p-4 justify-center items-center" v-else>
                <p> Ничего не найдено =()</p>
            </div>
            <button
                v-if="isAdmin"
                @click="showModalAddTodo(todoActive.id)"
                class="btn btn-info self-center">
                    <i class="fa-solid fa-plus text-3xl"></i>
            </button>
            <!-- <div>
                <DatePicker v-model:value="time0"></DatePicker>
            </div> -->
        </div>
        <ModalEditTodo 
            v-if="showModalEdit"
            @close-modal="closeModalEdit"
            :selected-item="selectedItem"
            :activeTodoId="activeTodoId"
            :selectedIndexItemTodo="selectedIndexItemTodo"/>
        <ModalAddTodo
            v-if="showModalAdd"
            :activeTodoId="activeTodoId"
            @close-modal="closeModalAdd"/>
    </div>
</template>

<script>
// import DatePicker from 'vue-datepicker-next';
// import 'vue-datepicker-next/index.css';
import ModalEditTodo from '../components/modals/ModalEditTodo.vue'
import ModalAddTodo from '../components/modals/ModalAddTodo.vue'
import TodoItem from '../components/TodoItem.vue'

export default {

    components: {
        TodoItem,
        ModalEditTodo,
        ModalAddTodo,
        // DatePicker
    },

    data () {
        return {
            // time0: null,
            textTodoItems: [
                {
                    text: "Только доступные слоты",
                    id: 0,
                },
                {
                    text: "Только занятые слоты",
                    id: 1,
                },
                {
                    text: "Все слоты",
                    id: 2,
                },
            ],
            sortTodoItemsValue: 2,
            textTodosItems: [
                {
                    text: "Только полностью занятые дни",
                    id: 0,
                },
                {
                    text: "Полностью свободные дни",
                    id: 1,
                },
                {
                    text: "Все слоты",
                    id: 2,
                },
            ],
            sortTodosItemsValue: 2,
            showModalEdit: false,
            showModalAdd: false,
            selectedItem: null,
            activeTodoId: null,
            selectedIndexItemTodo: null,
        };
    },
    computed: {

        todos () {
            return this.sortTodosItemsValue === 2 ? this.$store.getters.getTodos : this.$store.getters.getSortTodos(this.sortTodosItemsValue)
        },
        
        todoActive () {
            return this.sortTodoItemsValue === 2 ? this.$store.getters.getTodoActive : this.$store.getters.getSortTodoActive(this.sortTodoItemsValue)
        },

        isAdmin () {
            return this.$store.getters['auth/isAdmin']
        }

    },
    methods: {

        changeTodoActive (id) {
            this.$store.commit('CHANGE_ACTIVE_TODO', id)
        },

        showModalEditTodo (item, index, activeTodoId) {
            this.showModalEdit = true
            this.selectedItem = item
            this.activeTodoId = activeTodoId
            this.selectedIndexItemTodo = index
        },

        closeModalEdit () {
            this.showModalEdit = false
        },

        showModalAddTodo (activeTodoId) {
            this.showModalAdd = true
            this.activeTodoId = activeTodoId
        },

        closeModalAdd () {
            this.showModalAdd = false
        },
    }
}

</script>