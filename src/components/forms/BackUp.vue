<template>
    <div class="section-wrapper">
        <div class="form-subtitle">Backup & Restore</div>
        <div class="actions">
            <div class="action-item">
                Create Backup
                <span> <IconGT/> </span>
            </div>
            <div class="action-item">
                Restore Backup
                <span> <IconGT/> </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import IconGT from '../icons/IconGT.vue';

    
</script>

<style scoped>
    .section-wrapper {
        margin: 20px 0 0px;
    }

    .actions {
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .action-item {
        padding: 10px 20px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        border: 1px rgba(250, 250, 250, 0.582) solid;
        border-radius: 4px;
    }

    .action-item:hover {
        color: black;
        border: 1px rgb(218, 218, 218) solid;
        background: rgba(250, 250, 250, 0.301);
    }

    svg {
        height: 20px;
        width: 20px;
        opacity: .3;
    }
</style>