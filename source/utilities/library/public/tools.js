/**
 * 
 * @param {*} message 
 */
async function debugLog(message) {
    try {
        let uri = `macro:doDebug@lib:dovesoft.utilities`;
        let r = await fetch(uri, { method: "POST", body: null });
        let result = await r.text();

        if (Number(result) === 1) {
            console.log(`[DEBUG] ${message}`);
        }
    } catch (error) {
        console.log(`dovesoft.utilities.debugLog("${message}"): ${error.stack}`);
    }
}

/**
 * 
 * @param {*} macro 
 * @returns 
 */
async function evaluateMacro(macro) {
    try {
        let uri = `macro:EvaluateMacro@lib:dovesoft.utilities`;
        let r = await fetch(uri, { method: "POST", body: macro });
        let result = await r.text();
        return result;

    } catch (error) {
        console.log(`dovesoft.utilities.evaluateMacro("${macro}"): ${error.stack}`);
    }
}

/**
 * 
 * @param {*} name 
 * @param {*} libName 
 * @returns 
 */
async function getLibProperty(name, libName) {
    return await evaluateMacro(`[r:getLibProperty("${name}", "${libName}")]`);
}

/**
 * 
 * @param {*} name 
 * @param {*} value 
 * @param {*} libName 
 */
async function setLibProperty(name, value, libName) {
    await evaluateMacro(`[r:setLibProperty("${name}", "${value}", "${libName}")]`);
}

/**
 * 
 * @returns 
 */
async function getPlayerName() {
    return await evaluateMacro("[r:getPlayerName()]");
}

/**
 * 
 * @returns 
 */
async function isGM() {
    return Number(await evaluateMacro(`[r:isGM()]`)) == 1;
}

/**
 * 
 * @param {*} topic 
 * @returns 
 */
async function getInfo(topic) {
    return await evaluateMacro(`[r:getInfo("${topic}")]`);
}

/**
 * 
 * @returns 
 */
function uuidv4() {
    try {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
    } catch (error) {
        console.log(`dovesoft.utilities.uuidv4(): ${error.stack}`);
    }
}
