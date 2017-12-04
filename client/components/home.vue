<template>
    <div>
    <img src="/images/snower.png" />
    <img id="loading-indicator" v-show="showLoader" src="/images/loader.svg" />
    <input v-model="makeAbsolute" type="checkbox">Make absolute</input>
    <input v-model="convertToCurves" type="checkbox">Convert to Curves</input>
    {{showLoader}}
    <div id="path-holder">
        <textarea v-model="path"></textarea>
    </div>
    <button id="submit-button" @click="normalize">Normalize!</button>

    <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path :d="d" />
    </svg>
    </div>
</template>

<script>
export default {
    name: 'home',
    data: () => ({
        showLoader: false,
        d: '',
        makeAbsolute: false,
        convertToCurves: false,
        path: ''
    }),
    methods: {
        normalize() {
            this.showLoader = true;
            fetch("/normalize", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    makeAbsolute: this.makeAbsolute,
                    convertToCurves: this.convertToCurves,
                    path: this.path
                })
            })
            .then(res => res.json())
            .then(x => {
                this.d = x.path;
                this.showLoader = false;
            });
}
    }
}
</script>