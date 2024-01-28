"use strict";

const defNs = "net.dovesoft.notebook";

class MT {

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

    static async getLibProperty(name, ns = defNs) {
        return await this.evaluateMacro(`[r:getLibProperty("${name}", "${ns}")]`);
    }

    static async setLibProperty(name, value, ns = defNs) {
        await this.evaluateMacro(`[r:setLibProperty("${name}", "${value}", "${ns}")]`);
    }

    static async showBook(action, notebook, asFrame) {
        await this.evaluateMacro(`[h:dsnb.showBook("${action}", "${notebook}", ${asFrame})]`);
    }

    static async macroLinkText(macroName, args) {
        if (!MapTool.mocked) {
            return await this.evaluateMacro(`[r:macroLinkText("${macroName}", "", "${args}")]`);
        } else {
            MapTool.userdata = args;
            if (macroName.includes("createToken")) {
                return "#createToken?args=" + args;
            } else
                if (macroName.includes("showStatBlock")) {
                    return "./statblock.html?args=" + args;
                }
                else if (macroName.includes("deleteStatBlock")) {
                    return "#delete?args=" + args;
                }
        }
    }
}

class Utils {

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

    static parse(data) {
        try {
            const regex = /\[(\w*?):(.*?)\]/gi;
            const result = data.replace(regex, (m, p1, p2, o, s) => {
                console.log(m);
                let result = MT.evaluateMacro(m);
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

