<template>
    <div
        @click="showModalEditTodo"
        :class="{'bg-rose-900': (name && reason), 'text-slate-200': (name && reason)}" 
        class="bg-base-300 w-[300px] flex flex-col items-center justify-center h-28 relative rounded-lg cursor-pointer transition">
        <template v-if="(name && reason)">
            <span>Клиент: {{name}}</span>
            <span>Причина: {{ reason }}</span>
        </template>
        <template v-else>
            <i class="fa-solid fa-plus text-3xl"></i>
        </template>
        <span class="absolute top-2 left-2">
            {{ timeOn }}
        </span>
    </div>
</template>

<script>

export default {

    data () {
        return {
            showModal: false
        }
    },

    props: {
        timeOn: {required: true, default: null},
        name: {default: ''},
        reason: {default: ''}
    },
    
}
</script>