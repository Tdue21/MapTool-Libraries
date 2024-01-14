/**
 * Wrapper class containing shims for MapTool functions.
 */
class MT {

    static getPlayerName() {
        return MTScript.evalMacro("[r:getPlayerName()]");
    }

    static isGM() {
        return Number(MTScript.evalMacro("[r:isGM()]")) == 1;
    }

    static getLibraryInfo(ns) {
        MTScript.setVariable("ns", ns);

        return MTScript.evalMacro("[r:library.getInfo(ns)]");
    }

    static getLibProperty(name, ns) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("name", name);

        return MTScript.evalMacro("[r:getLibProperty(name, ns)]");
    }

    static setLibProperty(name, value, ns) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("name", name);
        MTScript.setVariable("value", value);

        MTScript.evalMacro("[h:setLibProperty(name, value, ns)]");
    }

    static getStaticData(ns, path) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("path", path);

        return MTScript.evalMacro("[r:data.getStaticData(ns, path)]");
    }

    static encode(data) {
        MTScript.setVariable("jsData", data);

        return MTScript.evalMacro("[r:encode(jsData)]");
    }

    static decode(data) {
        MTScript.setVariable("jsData", data);

        return MTScript.evalMacro("[r:decode(jsData)]");
    }

    static btoa(data) {
        MTScript.setVariable("jsData", data);

        return MTScript.evalMacro("[r:base64.encode(jsData)]");
    }

    static atob(data) {
        MTScript.setVariable("jsData", data);

        return MTScript.evalMacro("[r:base64.decode(jsData)]");
    }

    static htmlDialog5(dialogName, uri, options) {
        MTScript.setVariable("dialogName", dialogName);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.dialog5(dialogName, uri, options)]");
    }

    closeDialog(dialogName) {
        MTScript.setVariable("dialogName", dialogName);

        MTScript.evalMacro("[h:closeDialog(dialogName)]");
    }

    static htmlFrame5(frameName, uri, options) {
        MTScript.setVariable("frameName", frameName);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.frame5(frameName, uri, options)]");
    }

    static closeFrame(frameName) {
        MTScript.setVariable("dialogName", frameName);

        MTScript.evalMacro("[h:closeFrame(dialogName)]");
    }

    static htmlOverlay5(name, uri, options) {
        MTScript.setVariable("name", name);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.overlay(name, uri, options)]");
    }

    static closeOverlay(name) {
        MTScript.setVariable("name", name);

        MTScript.evalMacro("[h:closeOverlay(name)]");
    }

    static isOverlayRegistered(name) {
        MTScript.setVariable("name", name);

        return MTScript.evalMacro("[r:isOverlayRegistered(name)]") === 1;
    }

    static isOverlayVisible(name) {
        MTScript.setVariable("name", name);

        return MTScript.evalMacro("[r:isOverlayVisible(name)]") === 1;
    }

    static setOverlayVisible(name, isVisible) {
        MTScript.setVariable("name", name);
        MTScript.setVariable("isVisible", isVisible ? 1 : 0);
        MTScript.evalMacro("[r:setOverlayVisible(name, isVisible)]");
    }
}

class MTUtilities {


    /**
     * Formats and prints a message with an error and stack trace to the chat window.
     * @param {string} message - The message to print.
     * @param {Error} error - The error to print.
     */
    static printException(message, error) { 
        MapTool.chat.broadcast(`${message}<br><pre>${error}\n${error.stack}</pre>`); 
    }

    /**
     * Formats and prints a message to the chat window.
     * @param {string} message - The message to print.
     */
    static printMessage(message) { 
            MapTool.chat.broadcast(`<pre>${message}</pre>`); 
    }
}
