<template>
    <div class="field">
        <label :for="id">{{ label }}</label>
        <input :id="id" class="input" type="text" :placeholder="placeholder" :value="modelValue"
            @input="onInput" @keypress="numeric ? isNumberKey : null" />
    </div>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        modelValue: {
            type: String,
            default: ''
        },
        numeric: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
    });

    const emit = defineEmits(['update:modelValue']);

    // Unique ID for the input field to associate it with the label
    const id = computed(() => `${props.label.replace(/\s+/g, '-').toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`);

    // Emit the value on input
    function onInput(event) {
        emit('update:modelValue', event.target.value);
    }

    // Check if the key is a number key
    function isNumberKey(event) {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }
</script>

<style scoped>
    .field
    {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    .field label
    {
        color: gray;
        font-size: 12px;
    }

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
        color: #3DA8EA;
        cursor: pointer;
    }
</style>