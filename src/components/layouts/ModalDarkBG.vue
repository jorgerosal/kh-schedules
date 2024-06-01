<template>
    <div id="modal-dark">
        <slot></slot>
    </div>
</template>

<script setup>
    import { onMounted, onUnmounted } from 'vue';

    onMounted(() => {
        document.body.classList.add('no-scroll')
    })

    onUnmounted(()=> {
        document.body.classList.remove('no-scroll')
    })

</script>
