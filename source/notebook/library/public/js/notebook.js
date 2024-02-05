"use strict";

const { createApp } = Vue;
createApp({
    data() {
        return {
            action:'show',
            title: "This is the title",
            summary: "summary",
            owner: "Thomas",
            private: false,
            readonly: false,
            accent: '#A8A5CA',
            currentPage: "<p>Ouch</p>",
            selected: null,
            selectedPage: {},
            pages: []
        }
    },

    computed: {
        doShow() {
            return { display: this.action === 'show' ? 'block' : 'none' }
        },

        doEdit() {
            return { display: this.action !== 'show' ? 'block' : 'none' }
        }

    },

    methods: {
        async editNotebook(event) {
            this.action = 'edit';
        },
        async deleteNotebook(event) {
            this.action = 'delete';
        },
        async saveNotebook(event) {
            this.action = 'show';
        },
        async addPage(event) {
        },
        async deletePage(event) {
        },

        async pageSelect(event) {
            console.log(this.selected);
            let page = this.pages.find(x => x.id === this.selected);
            this.selectedPage = page;
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

        async onInit() {

            const rawdata = await MT.getUserData();
            let userData = JSON.parse(atob(rawdata));
            this.action = userData.action;
            let notebook = JSON.parse(atob(userData.notebook));

            this.title = notebook.title;
            this.owner = notebook.owner;
            this.accent = notebook.accent ? notebook.accent : "#A8A5CA";
            this.colors = this.accentColors();
            this.currentPage = await MD.parse(notebook.summary);

            this.pages.push({
                id: btoa("Summary"),
                name: "Summary",
                content: notebook.summary
            });

            for (let page of notebook.pages) {

                console.log(page.name);
                this.pages.push({
                    id: btoa(page.name),
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

/*
(async () => {
    const rawdata = await MT.getUserData();

    function getColors(color) {
        let tc = tinycolor(color);
        let background = tc.toHexString();
        let hover = tc.darken(10).toHexString();
        let active = tc.darken(20).toHexString();

        return {
            'background': {
                'color': background,
                'hover': hover,
                'active': active,
            },
            'foreground': {
                'color': tc.isLight() ? 'black' : 'white',
                'hover': tinycolor(hover).isLight() ? 'black' : 'white',
                'active': tinycolor(active).isLight() ? 'black' : 'white'
            }
        };
    }

    try {
        let userData = JSON.parse(atob(rawdata));

        let root = document.documentElement;
        let colors = getColors(userData.accent ? userData.accent : "#a8a5ca");

        root.style.setProperty('--accent-bg', colors.background.color);
        root.style.setProperty('--accent-hover-bg', colors.background.hover);
        root.style.setProperty('--accent-active-bg', colors.background.active);

        root.style.setProperty('--accent-fg', colors.foreground.color);
        root.style.setProperty('--accent-hover-fg', colors.foreground.hover);
        root.style.setProperty('--accent-active-fg', colors.foreground.active);
        
        let title = document.getElementById("bookTitle");
        let summary = document.getElementById("summaryEntry");
        let owner = document.getElementById("footerOwner");

        let indexPanel = document.getElementById("indexPanel");
        let pageIndex = document.getElementById("pageIndex");
        let pagePanel = document.getElementById("pagePanel");
        let editBook = document.getElementById("editBook");

        pagePanel.innerHTML = await MD.parse(userData.summary);

        title.innerText = userData.title;
        owner.innerText = userData.owner;
       
        summary.addEventListener("click", async event => pagePanel.innerHTML = await MD.parse(userData.summary));
        userData.pages.forEach(page => pageIndex.appendChild(createPageLink(page.name)));

        function createPageLink(pageName) {
            let link = Utils.createElement("span", {
                id: btoa(pageName),
                innerText: pageName
            });

            let item = Utils.createElement("li", null, [
                Utils.createElement("div", { className: "entry" }, [link])
            ]);

            link.addEventListener("click", async event => {
                await showPage(event.target.id);
            });

            return item;
        }

        async function showPage(pageId) {
            let name = atob(pageId);
            let page = userData.pages.find(page => page.name === name);
            if (page.uri) {
                let rawdata = await fetch(page.uri);
                let content = await rawdata.text();
                pagePanel.innerHTML = await MD.parse(content);
            } else {
                pagePanel.innerHTML = await MD.parse(page.content);
            }
        }
        
    } catch (error) {
        console.error(error.stack);
    }
})();
*/
