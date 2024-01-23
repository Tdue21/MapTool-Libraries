"use strict";

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
    try {
        let r = await fetch("./macro/EvaluateMacro", { method: "POST", body: macro });
        return await r.text();
    } catch (error) {
        console.log(error.stack);
    }
}

class MT {

    /**
     * Returns the name of the player for the client that it executes on. 
     * @returns {String}
     */
    static async getPlayerName() {
        return await evaluateMacro("[r:getPlayerName()]");
    }

    /**
     * @param {String} player
     * @returns {boolean} 
     */
    static async isGM(player = undefined) {
        let result = (player != undefined)
            ? evaluateMacro(`[r:isGM("${player}")]`)
            : evaluateMacro(`[r:isGM()]`);
        return Number(await result) == 1;
    }

    /**
     * 
     * @param {String} ns 
     * @returns {String}
     */
    static async getLibraryInfo(ns) {
        return await evaluateMacro(`[r:library.getInfo("${ns}")]`);
    }

    /**
     * 
     * @param {String} topic 
     * @returns {String}
     */
    static async getInfo(topic) {
        return await evaluateMacro(`[r:getInfo("${topic}")]`);
    }
    /**
     * 
     * @param {String} name 
     * @param {String} ns 
     * @returns {String}
     */
    static async getLibProperty(name, ns) {

        if (typeof MapTool === typeof undefined) {
            if (name === "Personae") {
                return (await fetch("./data/personae.json")).text();
            } else if (name === "Sources") {
                return (await fetch("./data/sources.json")).text();
            }
        }
        else {
            return await evaluateMacro(`[r:getLibProperty("${name}", "${ns}")]`);
        }
    }

    /**
     * 
     * @param {String} name 
     * @param {String} value 
     * @param {String} ns 
     * @returns {String}
     */
    static async setLibProperty(name, value, ns) {
        return await evaluateMacro(`[r:setLibProperty("${name}", "${value}", "${ns}")]`);
    }

    static async macroLinkText(macroName, output, args, target) {
        if (typeof MapTool === typeof undefined) {
            return `macro://${macroName}/${output}/${target}?${JSON.stringify(args)}`;
        } else {
            return await evaluateMacro(`[r:macroLinkText("${macroName}", "${output}", "${args}", "${target}")]`);
        }
    }
}