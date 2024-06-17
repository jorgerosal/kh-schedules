<template>
    <div class="section-wrapper">
        <div class="form-subtitle">Backup & Restore</div>
        <div class="actions">
            <div class="action-item" @click="backup.create">
                Create Backup
                <span>
                    <IconGT />
                </span>
            </div>
            <div class="action-item">
                <label for="fileInput" class="file-label">
                    Restore Backup
                    <input type="file" id="fileInput" accept=".txt" @change="restore" />
                    <span>
                        <IconGT />
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useToast } from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';
    import backup from '@/assets/utils/backups';
    import IconGT from '../icons/IconGT.vue';

    async function restore(e) {
        const $toast = useToast();
        await backup.restore(e);
        $toast.success('Back Up Restored!', {
            position: "top-right"
        });
    }

</script>

<style scoped>
    .section-wrapper
    {
        margin: 20px 0 0px;
    }

    .actions
    {
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    /* .action-item
    {
        padding: 10px 20px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        border: 1px red solid;
        border-radius: 4px;
        } */

    .action-item
    {
        padding: 10px 20px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        border: 1px rgba(250, 250, 250, 0.582) solid;
        /* border: 1px red solid; */
        border-radius: 4px;
    }

    .file-label
    {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        cursor: pointer;
    }

    .file-label input[type="file"]
    {
        display: none;
    }

    .action-item:hover
    {
        color: black;
        border: 1px rgb(218, 218, 218) solid;
        background: rgba(250, 250, 250, 0.301);
    }

    svg
    {
        height: 20px;
        width: 20px;
        opacity: .3;
    }
</style>