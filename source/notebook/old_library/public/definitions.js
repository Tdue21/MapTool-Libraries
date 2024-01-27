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






// (async () => {
//             const frame = document.getElementById("frame");
//             const list = document.getElementById("bookContainer");

//             const encoded = await MapTool.getUserData();
//             const data = Transport.decode(encoded);
//             console.log(data);

//             const notebooks = data.noteBooks;
//             for(let book of notebooks) {
//                 if(book.isPrivate && book.owner != data.playerName && !data.isGM) {
//                     continue;
//                 }

//                 const title =  (book.summary.length > 50 ? book.summary.slice(0, 45) + " ..." : book.summary) + `\nOwner: ${book.owner}`;

//                 let content = `<button class="button" title="${title}" onclick="openNotebook('${book.id}');">
//                         <p style="--accent-bg:${book.accent}" class="accent">${book.title}</p>`;
//                 if(book.isPrivate) {
//                     content += `<img src="./images/key.png" title="Private" width="16px">`;
//                 }
//                 if(book.readonly) {
//                     content += `<img src="./images/locked.png" title="Read Only" width="16px">`;
//                 }
//                 content += `</button>`;

//                 list.innerHTML += content;
//             }

//             frame.checked = data.asFrame == 1;
//             frame.addEventListener("input", event => changeAsFrame(data.playerName, frame.checked));
//         })();

