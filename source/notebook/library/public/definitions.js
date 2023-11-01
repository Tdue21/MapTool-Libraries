class LibrarySettings {

    constructor() {
        this.noteBooks = [];
        this.userSettings = [];
    }
}

class UserSettings {
    constructor(userName = null, asFrame = false, isGM = false) {
        this.userName = userName;
        this.asFrame = asFrame;
        this.isGM = isGM;
    }
}

class Notebook {
    constructor(title, owner, summary = null, accent = "#FFFFFF", isPrivate = false, readonly = false) {
        this.id = Math.round(Date.now() / 1000);
        this.title = title;
        this.summary = summary;
        this.owner = owner;
        this.isPrivate = isPrivate;
        this.accent = accent;
        this.readonly = readonly;
        this.pages = [];
    }

    addPage(name, uri = null, content = null) {
        pages.push(new BookPage(name, uri, content));
        Log.json(this.pages);
    }

    removePage(name) {
        const page = this.pages.find((page) => page.name === name);
        const index = this.pages.indexOf(page);

        this.pages.splice(index, 1);
        Log.json(this.pages);
    }
}

class BookPage {
    constructor(name, uri = null, content = null) {
        this.name = name;
        this.uri = uri;
        this.content = content;
    }
}

