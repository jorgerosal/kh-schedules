<template>
    <div class="notice">
        <div class="content">
            <h4>Notice:</h4>
            <p>
                We are excited to announce the launch of a new version of <span class="app">KH Meetings
                    Scheduler</span>! This new platform comes with improved features such as:
            </p>

            <div>
                <ul>
                    <li>Support for S140 template of the midweek meeting.</li>
                    <li>Support for Auxilary Class assignments</li>
                    <li>Autogeneration of students assignment slips (S-89)</li>
                    <li>Enhanced features in managing publishers and students</li>
                </ul>
            </div>

            <div class="flex">

                <a href="https://jezzar042015.github.io/khms/">Click to redirect to new platform</a>

                <span>
                    or copy the URL below
                </span>
                <span class="url">
                    https://jezzar042015.github.io/khms
                </span>

            </div>

        </div>

    </div>
</template>

<script setup>

</script>

<style scoped>
    .notice
    {
        margin: auto;
        height: 100%;
        width: 900px;
        max-width: 900px;
        font-size: 17px;
        overflow-x: hidden;
    }

    .content
    {
        padding: 30px;
    }

    .app
    {
        font-weight: 600;
        background: linear-gradient(0deg, #373799d0, #373799d0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    h4
    {
        font-size: 1.6em;
        text-transform: uppercase;
        background: linear-gradient(0deg, #373799d0, #373799d0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    p
    {
        margin: 20px 0;
    }

    a
    {
        padding: 15px;
        border-radius: 3px;
        background: #373799d0;
        color: white;
        text-decoration: none;
        cursor: pointer;
        flex: 1;
        font-size: 4.5vw;
    }

    .url
    {
        padding: 15px;
        border-radius: 3px;
        font-family: monospace;
        background: rgba(128, 128, 128, 0.212);
        font-size: 3.5vw;
    }

    .flex
    {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        width: 100%;
        gap: 10px;
    }

    ul
    {
        padding-left: 20px;
    }

    li
    {
        margin-bottom: 10px;
    }

    @media only screen and (min-width: 450px)
    {
        a, .url {
            font-size: 1em;
            max-width: 400px;
        }
    }

</style>