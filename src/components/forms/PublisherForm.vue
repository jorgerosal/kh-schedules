<template>
    <ModalDarkBG>
        <div id="form-publisher">
            <div class="form-header">{{ title }}</div>
            <div>
                <input type="text" placeholder="Enter name" v-model="pubName">
                <div class="privileges">
                    <div>Privileges</div>
                    <div class="roles">

                        <span class="field" v-for="r in congStore.roles" :key="r.code">
                            <input type="checkbox" :id="`ck-${r.code}`" :value="r.code" v-model="selectedRoles">
                            <label :for="`ck-${r.code}`">{{ r.display }}</label>
                        </span>
                    </div>
                </div>
            </div>

            <div class="btns">
                <button v-show="viewStore.pubFormMode == 'new'" class="btn-md-inv" @click="addPublisher">
                    Add Publisher
                </button>
                <button v-show="viewStore.pubFormMode == 'update'" class="btn-md-inv" @click="updatePublisher">Update Publisher</button>
                <button v-show="viewStore.pubFormMode == 'update'" class="btn-md-inv" @click="deletePublisher">Delete Publisher</button>
                <button class="btn-md" @click="closeMe">Discard</button>
            </div>
        </div>

    </ModalDarkBG>
</template>

<script setup>
    import { useCongregationStore } from '@/stores/congregation';
    import { useViewStore } from '@/stores/views';
    import { computed, onMounted, ref } from 'vue';
    import ModalDarkBG from '@/components/layouts/ModalDarkBG.vue'
    const viewStore = useViewStore()
    const congStore = useCongregationStore()

    const pubName = ref(null)

    const selectedRoles = ref([])
    const title = computed(() => {
        if (viewStore.pubFormMode == 'new') {
            return "New Person"
        } else {
            return "Update Person"
        }
    })

    function closeMe() {
        viewStore.pubForm = false
    }

    function addPublisher() {
        congStore.addPublisher({
            name: pubName.value,
            roles: [...selectedRoles.value]
        })

        closeMe();
    }

    function updatePublisher() {
        congStore.updatePublisher({
            name: pubName.value,
            roles: [...selectedRoles.value]
        })

        closeMe();
    }

    function deletePublisher() {
        congStore.removePublisher({
            name: pubName.value,
            roles: [...selectedRoles.value]
        })

        closeMe();
    }

    onMounted(() => {
        if (viewStore.pubFormMode == 'update') {
            pubName.value = viewStore.editPublisher.name
            selectedRoles.value = viewStore.editPublisher.roles
        }
    })
</script>

<style scoped>
    input[type="text"]
    {
        width: 100%;
        padding: 10px;
        border: none;
        font-size: 18px;
        border-bottom: 1px solid rgb(192, 192, 192);
        font-weight: 500;
        outline: none;
    }

    .form-header
    {
        color: #FEBE10;
        font-weight: 600;
        font-size: large;
    }

    .btns
    {
        display: flex;
        gap: 10px;
    }

    .roles
    {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
        padding: 10px;
    }

    .field
    {
        display: flex;
        font-size: small;
        justify-content: flex-start;
        gap: 5px;
    }

    .privileges
    {
        padding: 20px;
    }
</style>
