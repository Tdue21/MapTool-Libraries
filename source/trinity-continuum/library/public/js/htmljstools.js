"use strict";

if (typeof MapTool === typeof undefined) {

    console.log("No MapTool found!");

    window.MapTool = {

        mocked: true,

        userdata: "",

        getName() { return "name" },

        getKind() { return "kind" },

        log(data) { console.log(data) },

        async getUserData() { return userdata; },

        async fetch(data) {

            if (data.includes("getPlayerName")) { return "mock-player"; } else

            if (data.includes("isGM")) { return true; } else

            if (data.includes("library.getInfo")) { return (await fetch("../../library.json")).text(); } else

            if (data.includes("setLibProperty")) { console.log("MOCK: Writing data to lib property."); } else

            if (data.includes("getLibProperty")) {

                if (data.includes("Personae")) { return (await fetch("./data/personae.json")).text(); } else

                if (data.includes("Sources")) { return (await fetch("./data/sources.json")).text(); } else

                if (data.includes("Themes")) { return (await fetch("./data/themes.json")).text(); } else

                if (data.includes("Traits")) { return (await fetch("./data/traits.json")).text(); }

            } 

        }
    };
}

/**
 * 
 * @param {String} message 
 * @param {Error} error 
 */
function logError(message, error = undefined) {
    let output = `<h4>${message}</h4>`;
    if (error != undefined) {
        output += `<pre>${error}\n${error.stack}</pre>`;
    }
    MapTool.log(output);
}

/**
 * 
 * @param {String} args 
 * @param {Object} callBack 
 */
async function evaluateMacro(macro) {
    if (MapTool.mocked) {
        return await MapTool.fetch(macro);
    }
    else {
        try {
            let uri = "macro:EvaluateMacro@lib:net.dovesoft.trinity-continuum";
            let r = await fetch(uri, { method: "POST", body: macro });
            let result = await r.text();
            return result;

        } catch (error) {
            console.log(error.stack);
        }
    }
}

class MT {

    static async getPlayerName() {
        return await evaluateMacro("[r:getPlayerName()]");
    }

    static async isGM() {
        return Number(await evaluateMacro(`[r:isGM()]`)) == 1;
    }

    static async getLibraryInfo(ns) {
        return await evaluateMacro(`[r:library.getInfo("${ns}")]`);
    }

    static async getInfo(topic) {
        return await evaluateMacro(`[r:getInfo("${topic}")]`);
    }

    static async getLibProperty(name, ns = "net.dovesoft.trinity-continuum") {
        return await evaluateMacro(`[r:getLibProperty("${name}", "${ns}")]`);
    }

    static async setLibProperty(name, value, ns = "net.dovesoft.trinity-continuum") {
        return await evaluateMacro(`[r:setLibProperty("${name}", "${value}", "${ns}")]`);
    }

    static async macroLinkText(macroName, args) {
        if(!MapTool.mocked) {
            return await evaluateMacro(`[r:macroLinkText("${macroName}", "", "${args}")]`);
        } else {
            MapTool.userdata = args;
            if(macroName.includes("createToken"    )) { 
                return "#createToken?args=" + args; 
            } else
            if(macroName.includes("showStatBlock"  )) { 
                return "./statblock.html?args=" + args; 
            } 
            else if(macroName.includes("deleteStatBlock")) { 
                return "#delete?args=" + args; 
            }
        }
    }
}
