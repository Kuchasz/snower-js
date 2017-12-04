<template>
    <div>
    <img src="/images/snower.png" />
    <img id="loading-indicator" src="/images/loader.svg" />
    <input id="make-absolute" type="checkbox">Make absolute</input>
    <input id="convert-to-curves" type="checkbox">Convert to Curves</input>
    <div id="path-holder">
        <textarea id="path"></textarea>
    </div>
    <button id="submit-button" @click="say">Normalize!</button>

    <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path id="rendered-path" />
    </svg>
    </div>
</template>

<script>
export default {
    name: 'home',
    data(){
        return {};
    },
    methods: {
        say: () => {
            console.log('GIII!!');
        }
    }
}
</script>