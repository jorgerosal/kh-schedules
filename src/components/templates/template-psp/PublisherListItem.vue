<template>
    <div class="pub-row">
        <div class="pub-name"> {{ p.name }} </div>
        <div class="roles-wrapper">
            <span v-for="r in rolesDisplay" class="role">
                {{ r }}
            </span>
        </div>
    </div>
</template>

<script setup>
    import { useCongregationStore } from '@/stores/congregation';
    import { computed } from 'vue'
    const congStore = useCongregationStore()

    const rolesDisplay = computed(() => {
        const pubRoles = props.p.roles
        if (!pubRoles) return []
        const display = []

        pubRoles.forEach(code => {
            const role = congStore.roles.find(r => r.code == code)
            display.push(role.display)
        });

        return display
    })

    const props = defineProps({
        p: Object
    })
</script>

<style scoped>
    .pub-row
    {
        cursor: pointer;
        padding: 10px;
        font-size: 14px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
        transition: ease-in-out .2s;
        display: grid;
        grid-template-rows: 1fr 1fr;
        gap: 4px
    }

    .pub-name {
        font-weight: 600;
    }

    .pub-row:hover
    {
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    }

    .roles-wrapper
    {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        align-content: flex-start;
    }

    .role
    {
        font-size: x-small;
        padding: 0 5px;
        background: white;
        border: 1px solid #3DA8EA;
        color: #3DA8EA;
        border-radius: 5px;
        display: flex;
        place-items: center;

    }
</style>
