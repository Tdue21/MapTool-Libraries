"use strict";

const { createApp } = Vue;

createApp({
    
    data() {
        return {
            action: 'show',
            title: "This is the title",
            summary: "summary",
            owner: "Thomas",
            private: false,
            readonly: false,
            accent: '#A8A5CA',
            currentPage: "<p>Ouch</p>",
            selected: null,
            selectedPage: {},
            editPages: [],
            pages: []
        }
    },

    computed: {
        doShow() {
            return { display: this.action === 'show' ? 'block' : 'none' }
        },

        doEdit() {
            return { display: this.action !== 'show' ? 'block' : 'none' }
        },

        summaryPage() {
            return {
                id: this.uuidv4(),
                name: "Summary",
                content: this.summary
            }
        }
    },

    methods: {

        /* ********** Edit Book actions ********** */

        async saveNotebook(event) {
            if(event.target.id === "SaveButton") {
                this.pages = [];
                this.pages.push(this.summaryPage);
                this.editPages.forEach(element => this.pages.push(element));

                let notebook = {
                    title: this.title,
                    owner: this.owner,
                    accent: this.accent,
                    readonly: this.readonly,
                    pages: Array.from(this.editPages)
                };

                let data = btoa(JSON.stringify(notebook));
                MT.saveBook(data);
            }
            this.action = 'show';
        },

        async addPage(event) {
            let newPage = {
                id: this.uuidv4(),
                name: "New Page",
                content: ""
            }
            this.editPages.push(newPage);
            this.selected = newPage.id;
            this.selectedPage = newPage;
        },

        async deletePage(event) {
            console.log(this.selectedPage);
        },

        async pageSelect(event) {
            let page = this.pages.find(x => x.id === this.selected);
            this.selectedPage = page;
        },

        /* ********** Show Book actions ********** */

        async editNotebook(event) {
            this.editPages = this.pages.slice(1);
            this.action = 'edit';
        },

        async deleteNotebook(event) {
            this.action = 'delete';
        },

        async pageClick(event) {
            let page = this.pages.find(x => x.id === event.target.id);
            if (page.content) {
                this.currentPage = await MD.parse(page.content)
            } else {
                let rawdata = await fetch(page.uri);
                let content = await rawdata.text();
                this.currentPage = await MD.parse(content);
            }
        },
        
        /* ********** Utility ********** */

        uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                .replace(/[xy]/g, function (c) {
                    const r = Math.random() * 16 | 0,
                        v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
        },

        accentColors(color) {
            let tc = tinycolor(color);
            let background = tc.toHexString();
            let hover = tc.darken(10).toHexString();
            let active = tc.darken(20).toHexString();
            let colorData = {
                '--accent-bg': String(background),
                '--accent-hover-bg': String(hover),
                '--accent-active-bg': String(active),
                '--accent-fg': tc.isLight() ? 'black' : 'white',
                '--accent-hover-fg': tinycolor(hover).isLight() ? 'black' : 'white',
                '--accent-active-fg': tinycolor(active).isLight() ? 'black' : 'white'
            };
            return colorData;
        },

        /* ********** Initialization ********** */

        async onInit() {

            const rawdata = await MT.getUserData();
            let userData = JSON.parse(atob(rawdata));
            this.action = userData.action;
            let notebook = JSON.parse(atob(userData.notebook));

            this.title = notebook.title;
            this.owner = notebook.owner;
            this.accent = notebook.accent ? notebook.accent : "#A8A5CA";
            this.colors = this.accentColors();
            this.readonly = notebook.readonly;
            this.currentPage = await MD.parse(notebook.summary);

            this.pages.push(this.summaryPage);

            for (let page of notebook.pages) {

                console.log(page.name);
                this.pages.push({
                    id: this.uuidv4(),
                    name: page.name,
                    content: page.content,
                    uri: page.uri
                })
            }

            let colors = this.accentColors(this.accent);
            for (const key of Object.keys(colors)) {
                document.documentElement.style.setProperty(key, colors[key]);
            }
        }
    },
    mounted() {
        this.onInit();
    }
}).mount('#app');