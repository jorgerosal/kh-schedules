<template>
    <div class="contact-form">
        <div class="form-subtitle">Help & Questions</div>
        <div>
            Do you need assistance or have any questions? Are there any features you would like to request?
        </div>
        <a href="https://m.me/312885485248553" target="_blank">
            <lord-icon src="https://cdn.lordicon.com/ayhtotha.json" trigger="hover" colors="primary:#ffffff">
            </lord-icon>
            Chat Developer
        </a>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .contact-form
    {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    a
    {
        background: #1872aa;
        color: white;
        padding: 8px 20px 8px 18px;
        cursor: pointer;
        transition: ease-in .1s;
        text-decoration: none;
        font-size: small;

        display: inline-flex;
        align-items: center;
        gap: 10px;
        border-radius: 10px;
        max-width: fit-content;
    }

    a:hover
    {
        background: #126599;
    }
</style>