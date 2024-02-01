"use strict";

const defNs = "net.dovesoft.notebook";

class MT {

    static async showLibrary() {
        if (typeof MapTool !== typeof undefined) {
            await evaluateMacro("[h:dsnb.showLibrary()]");
        } else {
            console.log("MT.showLibrary()");
        }
    }

    static async showBook(action, data, frame) {
        if (typeof MapTool !== typeof undefined) {
            await evaluateMacro(`[h:dsnb.showBook('${action}', '${data}', ${frame})]`);
        } else {
            console.log(`MT.showbook("${action}", "${data}", ${frame})`);
        }
    }

    static async showAbout() {
        if (typeof MapTool !== typeof undefined) {
            await evaluateMacro("[h:dsnb.showAbout()]");
        } else {
            console.log("MT.showAbout()");
        }
    }

    static async getLibraryVersion() {
        if (typeof MapTool !== typeof undefined) {
            return await evaluateMacro("[r:dsnb.getLibraryVersion()]");
        } else {
            console.log("MT.getLibraryVersion()");
            return "0.1.2-mock";
        }
    }

    static async getUserData() {
        if (typeof MapTool !== typeof undefined) {
            return MapTool.getUserData();
        } else {
            console.log("MapTool.getUserData()")
            return Mocks.getUserData();
        }
    }

    static async getLibProperty(name, ns = defNs) {
        if (typeof MapTool !== typeof undefined) {
            return await this.evaluateMacro(`[r:getLibProperty("${name}", "${ns}")]`);
        } else {
            let data = await Mocks.getMockData("getLibProperty-" + name);
            console.log(`getLibProperty("${name}", "${ns}")] = ${data}`);
            return data;
        }
    }

    static async setLibProperty(name, value, ns = defNs) {
        if (typeof MapTool !== typeof undefined) {
            await this.evaluateMacro(`[r:setLibProperty("${name}", "${value}", "${ns}")]`);
        } else {
            console.log(`MT.setLibProperty("${name}", "${value}", "${ns}")`);
        }
    }


    static async getPlayerName() {
        return await this.evaluateMacro("[r:getPlayerName()]");
    }

    static async isGM() {
        return Number(await this.evaluateMacro(`[r:isGM()]`)) == 1;
    }

    static async getInfo(topic) {
        return await this.evaluateMacro(`[r:getInfo("${topic}")]`);
    }


    static async debugLog(message) {
        try {
            //let uri = "lib://lib:net.dovesoft.notebook/macro/functions/doDebug";
            //let uri = "lib://net.dovesoft.notebook/macro/doDebug";
            //let uri = "lib:net.dovesoft.notebook/macro/functions/doDebug";
            let uri = "macro:doDebug@lib:net.dovesoft.notebook";
            let r = await fetch(uri, { method: "POST", body: null });
            let result = await r.text();
            if (Number(result) === 1) {
                console.log("**DEBUG**: " + message);
            }
        } catch (error) {
            console.log("debugLog: " + error.stack);
        }
    }

    static async evaluateMacro(macro) {
        if (typeof MapTool !== typeof undefined) {
            await this.debugLog("MT.evaluateMacro: " + macro);

            try {
                //let uri = "lib://" + defNs + "/macro/EvaluateMacro";
                let uri = "macro:EvaluateMacro@lib:" + defNs;
                let r = await fetch(uri, { method: "POST", body: macro });
                let result = await r.text();
                return result;

            } catch (error) {
                console.log("### evaluateMacro: " + error.stack);
            }
        } else {
            console.log(`evaluateMacro("${macro}")`);
            return macro;
        }
    }
}

class Utils {

    static onClickEvent(id, eventHandler) {
        document.getElementById(id).addEventListener("click", eventHandler);
    }

    static createElement(type, options = null, children = [], eventListener = null) {
        try {
            let element = document.createElement(type);

            if (options != null) {
                let keys = Object.keys(options);
                for (let prop of keys) {
                    element[prop] = options[prop];
                }
            }

            for (let child of children) {
                element.appendChild(child);
            }

            if (eventListener != null) {
                element.addEventListener(eventListener.type, e => eventListener.func(e));
            }

            return element;
        } catch (error) {
            console.log(error);
        }
    }
}

class MD {

    static async parse(data) {
        try {
            const regex = /\[(\w*?):(.*?)\]/gi;
            const result = data.replace(regex, async (m, p1, p2, o, s) => {
                console.log(m);
                let result = await MT.evaluateMacro(m);
                if (p1 == 'r') {
                    data = result;
                }
            });
            data = result;


            const renderer = {
                image(href, title, text) {
                    try {
                        if (href === null) {
                            return text;
                        }

                        let size = 0;

                        if (href.includes("=")) {
                            let parts = href.split("=");
                            href = parts[0];
                            size = Number(parts[1]);
                        }

                        let out = `<img src="${href}" 
                                        alt="${text}" 
                                        ${(title) ? `title = "${title}"` : ""} 
                                        ${(size != 0 ? `width="${size}px"` : "")}>`;
                        return out;
                    } catch (error) {
                        console.log(error);
                        return false;
                    }
                },
                link(href, title, text) {
                    if (href === "roll") {
                        console.log("href = " + href + "; title = " + title + "; text = " + text)
                    }
                    else {
                        return `<a href="${href}" title="${title}">${text}</a>`
                    }
                }
            };
            marked.use({ renderer });
            return marked.parse(data);
        } catch (error) {
            console.log(error);
        }
    }
}

class Observable {
    constructor(value) {
        this._listeners = [];
        this._value = value;
    }

    notify() {
        this._listeners.forEach(listener => listener(this._value));
    }

    subscribe(listener) {
        this._listeners.push(listener);
    }

    get value() {
        return this._value;
    }

    set value(val) {
        if (val !== this._value) {
            this._value = val;
            this.notify();
        }
    }
}


// let doDebug = false;

// This is a little bad, as it blocks the executing thread.
// It's the only way I can think of to get the debugging value though.

//let x = new XMLHttpRequest();
//x.open("POST", "macro:EvaluateMacro@lib:" + defNs, false);
//x.send("[r: dsnb.doDebug()]");
//doDebug = Number(x.responseText) === 1;

/*
// Asynchronous getting doDebug value.
(async () => {
    const result = await MT.evaluateMacro("[r: dsnb.doDebug()]");
    doDebug = Number(result) === 1;
})();
*/

class Mocks {
    static async getUserData() {
        console.log(document.location.pathname);

        if (document.location.pathname.includes("library.html")) {

            let data = await fetch("./data/userguide.json");
            let notebooks = await data.json();

            let userData = {
                isGM: true,
                playerName: "Gertrude",
                asFrame: true,
                notebooks: notebooks
            };

            return btoa(JSON.stringify(userData));

        } else if (document.location.pathname.includes("notebook.html")) {

            let data = await fetch("./data/userguide.json");
            let book = await data.json();
            return btoa(JSON.stringify(book[0]));
        }
        return null;
    }

    static async getMockData(dataId) {
        let raw = await fetch("./data/mock-data.json");
        let data = await raw.json();
        return data[dataId];
    }
}