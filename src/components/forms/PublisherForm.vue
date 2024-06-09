<template>
    <ModalDarkBG>
        <div id="form-publisher">
            <div class="form-header">{{ title }}</div>
            <div>
                <input ref="pubInput" type="text" placeholder="Enter name" v-model="pubName">
                <div class="privileges">
                    <div class="section-header">
                        Privileges
                        <span>What parts can this student be assigned?</span>
                    </div>
                    <div class="roles">

                        <span class="field" v-for="r in congStore.roles" :key="r.code">
                            <input type="checkbox" :id="`ck-${r.code}`" :value="r.code" v-model="selectedRoles">
                            <label :for="`ck-${r.code}`">{{ r.display }}</label>
                        </span>
                    </div>
                </div>
            </div>

            <div class="btns-between">
                <div class="btns">
                    <button v-show="viewStore.pubFormMode == 'new'" class="btn-md-inv btn-primary"
                        @click="addPublisher">
                        Add Student
                    </button>
                    <button v-show="viewStore.pubFormMode == 'update'" class="btn-md-inv btn-primary"
                        @click="updatePublisher">
                        Update Student
                    </button>
                    <button class="btn-md" @click="closeMe">Discard</button>
                </div>
                <div class="btns">
                    <button v-show="viewStore.pubFormMode == 'update'" class="btn-md-inv btn-warning"
                        @click="deletePublisher">
                        Delete Student
                    </button>
                </div>
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
    const pubInput = ref(null)

    const focusInput = () => {
        if (pubInput.value) {
            pubInput.value.focus();
        }
    };

    const selectedRoles = ref(["demo"])
    const title = computed(() => {
        if (viewStore.pubFormMode == 'new') {
            return "New Student"
        } else {
            return "Update Student"
        }
    })

    onMounted(focusInput);

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
        color: #3DA8EA;
        font-weight: 600;
        font-size: large;
    }

    .section-header
    {
        color: #3DA8EA;
        font-weight: 600;
        font-size: medium;
        display: flex;
        gap: 15px;
        align-items: center;
    }

    .section-header span
    {
        color: rgb(175, 175, 175);
        font-weight: 400;
        font-size: small;
    }

    .btns
    {
        display: flex;
        gap: 10px;
    }

    .btns-between
    {
        display: flex;
        justify-content: space-between;
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
        cursor: pointer;
    }

    .privileges
    {
        padding: 20px 10px;
    }
</style>
