"use strict";

const { createApp } = Vue;
createApp({
    data() {
        return {
            books: [],
            asFrame: false,
            isGM: false,
            playerName: null
        }
    },

    methods: {
        async openBook(event) {
            try {
                let book = this.books.find(x => x.id === event.target.id);
                let data = btoa(JSON.stringify(book.data));
                await MT.showBook('show', data, this.asFrame);
            } catch (error) {
                console.log("### library: " + error.stack);
            }
        },

        async newBook() {
            await MT.showBook('edit', '', this.asFrame);
        },

        async checkChanged(event) {
            await MT.setLibProperty("asFrame", this.asFrame ? 1 : 0);
        },

        async onInit() {
            try {
                const rawdata = await MT.getUserData();
                let userData = JSON.parse(atob(rawdata));
                this.isGM = userData.isGM;
                this.playerName = userData.playerName;
                this.asFrame = userData.asFrame;

                for (const book of userData.notebooks) {
                    if ((!book.private || (this.playerName === book.owner) || this.isGM)) {
                        this.books.push({
                            id: btoa(book.title),
                            title: decodeURIComponent(book.title),
                            summary: decodeURIComponent(book.summary),
                            accent: book.accent,
                            owner: book.owner,
                            private: book.private,
                            data: book
                        });
                    }
                }
            } catch (error) {
                console.log("### library: " + error.stack);
            }
        }
    },

    mounted() {
        this.onInit();
    }
}).mount('#app');


async () => {
    function BookInfo(bookData) {
        let self = this;

        self.title = decodeURIComponent(bookData.title);
        self.summary = decodeURIComponent(bookData.summary);
        self.accent = "--accent-bg: " + bookData.accent;
        self.owner = bookData.owner;
        self.private = bookData.private;

        self.data = bookData;
    }

    function LibraryViewModel() {
        let self = this;

        try {
            let userData = JSON.parse(atob(rawdata));
            let isGM = userData.isGM;
            let playerName = userData.playerName;

            let bookArray = [];
            for (const book of userData.notebooks) {
                if ((!book.private || (playerName === book.owner) || isGM)) {
                    bookArray.push(new BookInfo(book));
                }
            }
            self.books = ko.observableArray(bookArray);
            self.asFrame = ko.observable(userData.asFrame);

            self.checkChanged = async function () {
                await MT.setLibProperty("asFrame", self.asFrame() ? 1 : 0);
            };

            self.openBook = async function (book) {
                await MT.showBook('show', btoa(JSON.stringify(book.data)), self.asFrame());
            };

        } catch (error) {
            console.log(error);
        }
    }

    const rawdata = await MT.getUserData();
    ko.applyBindings(new LibraryViewModel());
};
