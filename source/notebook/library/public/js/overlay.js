"use strict";

const { createApp } = Vue;
createApp({
    data() {
        return {
            asFrame: false
        }
    },

    methods: {
        async onClick(event) {
            try {
                let id = event.target.id;

                if (id === "quill") {
                    await MT.showLibrary();
                } else if (id === "add") {
                    await MT.showBook('edit', '', this.asFrame);
                } else if (id === "about") {
                    await MT.showAbout();
                }
            } catch (error) {
                console.log("### overlay: " + error.stack);
            }
        },

        async onInit() {
            try {
                this.asFrame = await MT.getLibProperty("asFrame");
            } catch (error) {
                console.log("### overlay: " + error.stack);
            }
        }
    },

    mounted() {
        this.onInit();
    }
}).mount('#app');