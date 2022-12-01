<template>
    <div class="fixed top-0 left-0 min-h-screen w-full z-10 transition-all flex items-center justify-center">
        <div class="z-30 bg-base-300 p-4 rounded-md shadow-md w-96 transition-all flex flex-col gap-4">
            <h1 class="transition-all self-center">Modal Window Title</h1>
            <p class="transition-all">
                Are you sure you want to delete item 
                <span class="text-error">
                    "1"
                </span>  ?
            </p>
            <div class="transition-all self-end flex items-center gap-4">
                <button class="transition-all btn-outline btn btn-success" @click="SET_DEL_TODO">
                    Yes
                </button>
                <button class="transition-all btn-outline btn btn-error" @click="SET_CLOSE_MODAL">
                    Cancel
                </button>
            </div>
        </div>
        <div class="absolute top-0 left-0 min-h-screen w-full bg-black opacity-50 z-20 transition-all"
            @click="SET_CLOSE_MODAL"></div>
    </div>
</template>

<script>
export default {
    computed: {

    },
    methods: {
        // SET_CLOSE_MODAL() {
        //     this.$store.commit('SET_CLOSE_MODAL')
        // },
        // SET_DEL_TODO() {
        //     this.$store.commit('SET_DEL_TODO')
        // }
    }
}
</script>