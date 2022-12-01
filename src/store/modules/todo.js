import { getMinutes } from "../../helpers/time";
export default {

    state: {
        todos: [
            {
                id: '30.11.2022',
                active: true,
                items: [
                    {
                        time_on: '8:00',
                        time_off: '8:20',
                    },
                ]
            }, 
            {
                id: '1.12.2022',
                active: false,
                items: [
                    {
                        time_on: '8:00',
                        time_off: '8:20',
                        name: 'петр Васильевич',
                        reason: 'Вредный клиент',
                    },
                ]
            },
            {
                id: '2.12.2022',
                active: false,
                items: [
                    {
                        time_on: '8:00',
                        time_off: '8:20',
                        name: 'петр Васильевич',
                        reason: 'Вредный клиент',
                    },
                ],
            },
        ],
    },

    getters: {

        getTodos: (state) => {
            return state.todos
        },

        getSortTodos: (state) => (value) => {
            let sortTodos = []
            if (value === 1) {
                state.todos.forEach(item => {
                    let isFreeDay = 0
                    for (let i = 0; i < item.items.length; i++) {
                        if (!item.items[i].name && !item.items[i].reason) {
                            isFreeDay++
                        }
                    }
                    isFreeDay === item.items.length ? sortTodos.push(item) : []
                })
            } else {
                state.todos.forEach(item => {
                    let isFreeDay = 0
                    for (let i = 0; i < item.items.length; i++) {
                        if (item.items[i].name && item.items[i].reason) {
                            isFreeDay++
                        }
                    }
                    isFreeDay === item.items.length ? sortTodos.push(item) : []
                })
            }
            const id = sortTodos.length ? sortTodos[0].id : null
            if (id) {
                state.todos.forEach( (item) => {
                    if (item.id === id) {
                        item.active = true
                    } else {
                        item.active = false
                    }
                })
            }
            return sortTodos
        },

        getTodoActive: (state) => {
            let todo = []
            state.todos.forEach(item => {
                if (item.active) {
                    todo = item
                }
            })
            return todo
        },

        getSortTodoActive: (state, getters) => (value) => {
            const todo = getters.getTodoActive
            const sortTodo = {
                id: todo.id,
                active: true,
                items: [],
            }
            if (value === 1) {
                todo.items.forEach(item => {
                    if (item.name && item.reason) {
                        sortTodo.items.push(item)
                    }
                })
            } else {
                todo.items.forEach(item => {
                    if (!item.name && !item.reason) {
                        sortTodo.items.push(item)
                    } 
                })
            }
            return sortTodo
        },
        getTodoTimingIntersection: (state, getters) => (value) => {
            const todo = getters.getTodoActive
            let isIntersection = true
            const minuteTimeOnNew = getMinutes(value.time_on)
            const minuteTimeOffNew = getMinutes(value.time_off)
            for (let i = 0; i < todo.items.length; i++) {
                if (i !== value.index) {
                    const minuteTimeOnOld = getMinutes(todo.items[i].time_on)
                    const minuteTimeOffOld = getMinutes(todo.items[i].time_off)
                    if (minuteTimeOnNew <= minuteTimeOffOld && minuteTimeOnNew >= minuteTimeOnOld) {
                        isIntersection = false
                        break
                    }
                    if (minuteTimeOffNew <= minuteTimeOffOld && minuteTimeOffNew >= minuteTimeOnOld) {
                        isIntersection = false
                        break
                    }
                }
            }
            return isIntersection
        }
    },

    mutations: {
        CHANGE_ACTIVE_TODO (state, id) {
            state.todos.forEach(item => {
                item.id === id ? item.active = true : item.active = false
            });
        },

        DEL_TODO_ITEM (state, data) {
            state.todos.forEach(item => {
                if (item.id === data.id) {
                    for (let i = 0; i < item.items.length; i++) {
                        if (i === data.index) {
                            item.items.splice(data.index, 1)
                        }
                    }
                } 
            })
        },
        
        CHANGE_TODO_ITEM (state, data) {
            state.todos.forEach(item => {
                if (item.id === data.id) {
                    for (let i = 0; i < item.items.length; i++) {
                        if (i === data.index) {
                            item.items[i].time_on = data.time_on
                            item.items[i].time_off = data.time_off
                            item.items[i].name = data.name
                            item.items[i].reason = data.reason
                        }
                        
                    }
                    item.items.sort((a, b) => {
                        const minuteTimeOn = getMinutes(a.time_on)
                        const minuteTimeOff = getMinutes(b.time_on)
                        if (minuteTimeOn > minuteTimeOff) return 1;
                        if (minuteTimeOn == minuteTimeOff) return 0;
                        if (minuteTimeOn < minuteTimeOff) return -1
                    })
                } 
            })
        },

        ADD_TODO (state, data) {
            state.todos.forEach(item => {
                if (item.id === data.id) {
                    item.items.push(data)
                    item.items.sort((a, b) => {
                        const minuteTimeOn = getMinutes(a.time_on)
                        const minuteTimeOff = getMinutes(b.time_on)
                        if (minuteTimeOn > minuteTimeOff) return 1;
                        if (minuteTimeOn == minuteTimeOff) return 0;
                        if (minuteTimeOn < minuteTimeOff) return -1
                    })
                } 
            })
        }
    }
}