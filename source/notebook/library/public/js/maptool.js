"use strict";

const defNs = "net.dovesoft.notebook";

class MT {

    static async getUserData() { return MapTool.getUserData(); }

    static async showLibrary() { await evaluateMacro("[h:dsnb.showLibrary()]"); }

    static async showBook(action, data, frame) { await evaluateMacro(`[h:dsnb.showBook('${action}', '${data}', ${frame})]`); }

    static async showAbout() { await evaluateMacro("[h:dsnb.showAbout()]"); }

    static async getLibraryVersion() { return await evaluateMacro("[r:dsnb.getLibraryVersion()]"); }

    static async getLibProperty(name, ns = defNs) { return await evaluateMacro(`[r:getLibProperty("${name}", "${ns}")]`); }

    static async setLibProperty(name, value, ns = defNs) { await evaluateMacro(`[r:setLibProperty("${name}", "${value}", "${ns}")]`); }

    static async saveBook(data) { await evaluateMacro(`[r:dsnb.saveBook("${data}")]`); }

    static async getPlayerName() { return await evaluateMacro("[r:getPlayerName()]"); }

    static async isGM() { return Number(await evaluateMacro(`[r:isGM()]`)) == 1; }

    static async getInfo(topic) { return await evaluateMacro(`[r:getInfo("${topic}")]`); }

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
/*
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
*/

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
