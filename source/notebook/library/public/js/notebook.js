class bookPage {
    constructor() {
        this.id = "";
        this.name = "";
        this.content = "";
        this.uri = "";
    }
}

class notebook {
    
    constructor() {
        this.id = "";
        this.title = "";
        this.summary = "";
        this.accent = "";
        this.owner = "";
        this.private = false;
        this.readonly = false;
        this.pages = [];
        this.data = "";
    }

    static create() {
        return new notebook();
    }

    static list() {

    }

    static load(notebookId) {

    }

    save() {

    }

    delete() {

    }

    addPage() {
        return new bookPage();
    }

    deletePage() {

    }

}