const utilDefNs = "net.dovesoft.utilities";


async function debugLog(message) {
    try {
        let uri = `macro:doDebug@lib:${utilDefNs}`;
        let r = await fetch(uri, { method: "POST", body: null });
        let result = await r.text();

        if (Number(result) === 1) {
            console.log(`[DEBUG] ${message}`);
        }
    } catch (error) {
        console.log(`${utilDefNs}.debugLog("${message}"): ${error.stack}`);
    }
}

async function evaluateMacro(macro) {
    try {
        let uri = `macro:EvaluateMacro@lib:${utilDefNs}`;
        let r = await fetch(uri, { method: "POST", body: macro });
        let result = await r.text();
        return result;

    } catch (error) {
        console.log(`${utilDefNs}.evaluateMacro("${macro}"): ${error.stack}`);
    }
}

function uuidv4() {
    try {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
    } catch (error) {
        console.log(`${utilDefNs}.uuidv4(): ${error.stack}`);
    }
}


class MTUtils {

    static async getUserData() { return MapTool.getUserData(); }

    static async getLibProperty(name, ns = defNs) { return await evaluateMacro(`[r:getLibProperty("${name}", "${ns}")]`); }

    static async setLibProperty(name, value, ns = defNs) { await evaluateMacro(`[r:setLibProperty("${name}", "${value}", "${ns}")]`); }

    static async getPlayerName() { return await evaluateMacro("[r:getPlayerName()]"); }

    static async isGM() { return Number(await evaluateMacro(`[r:isGM()]`)) == 1; }

    static async getInfo(topic) { return await evaluateMacro(`[r:getInfo("${topic}")]`); }
}