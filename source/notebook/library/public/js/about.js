"use strict";

const { createApp } = Vue;
createApp({
    data() {
        return {
            version:null
        }
    },

    methods: {
        async onInit() {
            try {
                this.version = await MT.getLibraryVersion();
            }
            catch (error) {
                console.log("### about: " + error.stack);
            }
        }
    },

    mounted() {
        this.onInit();
    }
}).mount('#app');
