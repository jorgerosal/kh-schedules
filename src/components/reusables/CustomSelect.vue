<template>
    <div class="select field" @mouseleave="hideOptions">
        <label :for="id">{{ label }}</label>
        <input :id="id" class="input" type="text" :placeholder="placeholder" readonly @click.stop="toggleOptions"
            :value="selectedDisplayValue" />
        <div :class="ddClasses">
            <div class="dd-items" v-for="item in items" :key="item[id]" @click="setOption(item)">
                {{ item[display] }}
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref } from 'vue';

    const props = defineProps({
        modelValue: {
            type: [String, Number],
            default: '',
        },
        items: {
            type: Array,
            default: () => [],
        },
        id: {
            type: String,
            default: 'id',
        },
        display: {
            type: String,
            default: 'name',
        },
        placeholder: {
            type: String,
            default: 'Select an option',
        },
        label: {
            type: String,
            default: null,
        },
    });

    const emit = defineEmits(['update:modelValue']);

    const isOpen = ref(false);

    const selectedItem = computed(() => props.items.find(item => item[props.id] === props.modelValue));

    const selectedDisplayValue = computed(() => selectedItem.value ? selectedItem.value[props.display] : '');

    const ddClasses = computed(() => ({
        'dd-holder': true,
        show: isOpen.value,
    }));

    function toggleOptions() {
        isOpen.value = !isOpen.value;
    }

    function hideOptions() {
        isOpen.value = false;
    }

    function setOption(item) {
        emit('update:modelValue', item[props.id]);
        hideOptions();
    }
</script>

<style scoped>
    .input
    {
        display: block;
        width: 100%;
        border: none;
        border-bottom: 1px solid rgba(128, 128, 128, 0.308);
        padding: 10px;
        outline: none;
        font-size: 15px;
        font-weight: 600;
        color: #3da8ea;
        cursor: pointer;
    }

    .select
    {
        position: relative;
        cursor: pointer !important;
    }

    .dd-holder.show
    {
        display: flex;
        opacity: 1;
    }

    .dd-holder
    {
        display: none;
        opacity: 0;
        position: absolute;
        width: 100%;
        background: white;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        z-index: 1;
        top: calc(100% - 1px);
        transform: translateY(0);
        transition: opacity 0.3s;
        flex-direction: column;
    }

    .dd-items
    {
        cursor: pointer;
        padding: 10px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(128, 128, 128, 0.795);
    }

    .dd-items:hover
    {
        color: gray;
    }

    .field label
    {
        color: gray;
        font-size: 12px;
    }
</style>
