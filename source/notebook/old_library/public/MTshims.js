const ns = "net.dovesoft.notebook";

/**
 * Wrapper class containing shims for MapTool functions.
 */
const MT = {
    
    /**
     * Returns the name of the current player.
     * @returns {string} Playername.
     */
    getPlayerName: function() { return MTScript.evalMacro("[r:getPlayerName()]"); },

    /**
     * Returns true if the player is GM, otherwise false.
     * @returns {boolean} 
     */
    isGM: function() { return Number(MTScript.evalMacro("[r:isGM()]")) == 1; },

    /**
     * Returns information about the library associated with the supplied namespace.
     * @param {string} ns - Namespace of the library.
     * @returns {json} Object with library info.
     */
     getLibraryInfo: function(ns) {
        MTScript.setVariable("ns", ns);
        let value = MTScript.evalMacro("[r:library.getInfo(ns)]");
        return JSON.parse(value);
    },

    /**
     * Returns the value of a property from a library property. 
     * @param {string} name - Name of the property to get.
     * @param {string} ns - Name(space) of the library to use.
     * @returns {string} The value of the property.
     */
    getLibProperty: function(name, ns) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("name", name);
        return MTScript.evalMacro("[r:getLibProperty(name, ns)]");
    },

    /**
     * Sets the supplied library property of the associated namespace to 
     * the supplied value.
     * @param {string} name - Name of the property to set.
     * @param {string} value - Value of property.
     * @param {string} ns - Name(space) of the library to use.
     */
    setLibProperty: function(name, value, ns) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("name", name);
        MTScript.setVariable("value", value);
        MTScript.evalMacro("[h:setLibProperty(name, value, ns)]");
    }, 

    /**
     * Reads the static data from the supplied path in the supplied namespace.
     * @param {string} ns - Name of the library to use.
     * @param {string} path - Path of the resource to get.
     * @returns {string} - Content of the resource. If it's an image, an asset id is returned.
     */
    getStaticData: function(ns, path) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("path", path);
        return MTScript.evalMacro("[r:data.getStaticData(ns, path)]");
    }, 

    /**
     * Formats and prints a message with an error and stack trace to the chat window.
     * @param {string} message - The message to print.
     * @param {Error} error - The error to print.
     */
    printException: function(message, error) { MapTool.chat.broadcast(`${message}<br><pre>${error}\n${error.stack}</pre>`); },

    /**
     * Formats and prints a message to the chat window.
     * @param {string} message - The message to print.
     */
    printMessage: function(message) { MapTool.chat.broadcast(`<pre>${message}</pre>`); },

    /**
     * 
     * @param {string} data 
     * @returns {string}
     */
    encode: function(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:encode(jsData)]");
    },

    /**
     * 
     * @param {string} data 
     * @returns {string}
     */
    decode: function(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:decode(jsData)]");
    },

    /**
     * Encodes the supplied text to base64.
     * @param {string} data - The plain string text.
     * @returns {string} The encoded base64 string.
     */
    btoa: function(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:base64.encode(jsData)]");
    },

    /**
     * Decodes a base64 encode string to plain text.
     * @param {string} data - The encoded string.
     * @returns {string} The decoded text.
     */
    atob: function(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:base64.decode(jsData)]");
    },

    /**
     * Opens a dialog with the supplied dialogName, uri and options string. 
     * @param {string} dialogName - Name of the dialog. Unique for the window. 
     * @param {string} uri - Uri of the html page that should be displayed in the dialog.
     * @param {string} options - Dialog options, like height, width etc. 
     */
    showDialog: function(dialogName, uri, options) {
        MTScript.setVariable("dialogName", dialogName);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.dialog5(dialogName, uri, options)]");
    },

    /**
     * Closes the dialog with the supplied name if it exists.
     * @param {*} dialogName - Name of the dialog.
     */
    closeDialog: function(dialogName) {
        MTScript.setVariable("dialogName", dialogName);
        MTScript.evalMacro("[h:closeDialog(dialogName)]");
    },

    /**
     * Opens a frame with the supplied name, uri and options string. 
     * @param {string} frameName - Name of the frame. 
     * @param {string} uri - Uri of the html page that should be displayed in the frame.
     * @param {string} options - Frame options, like height, width etc. 
     */
     showFrame: function(frameName, uri, options) {
        MTScript.setVariable("frameName", frameName);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.frame5(frameName, uri, options)]");
    },

    /**
     * Closes the frame with the supplied name if it exists.
     * @param {string} frameName - Name of the frame.
     */
    closeFrame: function(frameName) {
        MTScript.setVariable("dialogName", frameName);
        MTScript.evalMacro("[h:closeFrame(dialogName)]");
    },

    /**
     * Opens an overlay with the supplied name, uri and options string. 
     * @param {string} nme - Name of the overlay. 
     * @param {string} uri - Uri of the html page that should be displayed in the overlay.
     * @param {string} options - Overlay options. 
     */
    showOverlay: function(name, uri, options){
        MTScript.setVariable("name", name);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.overlay(name, uri, options)]");
    },

    /**
     * Closes the overlay with the supplied name if it exists.
     * @param {string} name - Name of the overlay.
     */
    closeOverlay: function(name) {
        MTScript.setVariable("name", name);
        MTScript.evalMacro("[h:closeOverlay(name)]");
    },

    /**
     * Checks if an overlay with the supplied name is registered. Returns true if there is.
     * @param {string} name - Name of the overlay.
     * @returns  {boolean} - True if an overlay of the supplied name exists.
     */
    isOverlayRegistered: function(name) {
        MTScript.setVariable("name", name);
        return MTScript.evalMacro("[r:isOverlayRegistered(name)]") === 1;
    },

    /**
     * Checks if an overlay with the supplied name is visible. Returns true if there is.
     * @param {string} name - Name of the overlay.
     * @returns  {boolean} - True if an overlay of the supplied name is visible.
     */
     isOverlayVisible: function(name) {
        MTScript.setVariable("name", name);
        return MTScript.evalMacro("[r:isOverlayVisible(name)]") === 1;
    },

    /**
     * Sets the visibility of an overlay with the supplied name.
     * @param {string} name - Name of the overlay.
     * @param {boolean} isVisible - The state of the overlay-
     */
     setOverlayVisible: function(name, isVisible) {
        MTScript.setVariable("name", name);
        MTScript.setVariable("isVisible", isVisible ? 1 : 0);
        MTScript.evalMacro("[r:setOverlayVisible(name, isVisible)]");
    }
}