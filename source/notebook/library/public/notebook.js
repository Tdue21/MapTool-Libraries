/* ######################################################################## */
/* # Data Classes
/* ######################################################################## */

/**
 * 
 */
class LibrarySettings {

    /**
     * 
     */
    constructor() {
        this.noteBooks = [];
        this.userSettings = [];
    }
}

/**
 * 
 */
class UserSettings {

    /**
     * 
     * @param {*} userName 
     * @param {*} asFrame 
     * @param {*} isGM 
     */
    constructor(userName = null, asFrame = false, isGM = false) {
        this.userName = userName;
        this.asFrame = asFrame;
        this.isGM = isGM;
    }
}

/**
 * 
 */
class Notebook {
    /**
     * 
     * @param {*} title 
     * @param {*} owner 
     * @param {*} summary 
     * @param {*} accent 
     * @param {*} isPrivate 
     * @param {*} readonly 
     */
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

    /**
     * 
     * @param {*} name 
     * @param {*} uri 
     * @param {*} content 
     */
    addPage(name, uri = null, content = null) {
        pages.push(new BookPage(name, uri, content));
        Log.json(this.pages);
    }

    /**
     * 
     * @param {*} name 
     */
    removePage(name) {
        const page = this.pages.find((page) => page.name === name);
        const index = this.pages.indexOf(page);

        this.pages.splice(index, 1);
        Log.json(this.pages);
    }
}

/**
 * 
 */
class BookPage {

    /**
     * 
     * @param {*} name 
     * @param {*} uri 
     * @param {*} content 
     */
    constructor(name, uri = null, content = null) {
        this.name = name;
        this.uri = uri;
        this.content = content;
    }
}

/* ######################################################################## */
/* # Utility Classes
/* ######################################################################## */

/**
 * 
 */
class Log {
   
    /**
     * 
     * @param {string} message 
     * @param {Error} error 
     */
    static error(message, error = undefined) {
        let output = `<h4>${message}</h4>`;
        if (error != undefined) {
            output += `<pre>${error}\n${error.stack}</pre>`;
        }
        MapTool.log(output);
    }
    
    /**
     * 
     * @param {string} message 
     */
    static message(message) {
         MapTool.log(message); 
    }

    /**
     * 
     * @param {JSON} json 
     */
    static json(json) { 
        evaluateMacro(`[h:data='${JSON.stringify(json)}'][h:broadcast("<pre>" + json.indent(data) + "</pre>")]`); 
    }
}

/**
 * 
 */
class Transport {
    /**
     * 
     * @param {string} data 
     * @returns {JSON} The decoded JSON object
     */
    static decode(data) {
        const decoded = atob(data);
        const json = JSON.parse(decoded);
        return json;
    }

    static encode(data) {
        const text = JSON.stringify(data);
        const encoded = btoa(text);
        return encoded;
    }
}

/**
 * 
 */
class Helpers {
    
    /**
     * 
     * @param {*} type 
     * @param {*} options 
     * @returns 
     */
    static createElement(type, options) {
        let element = document.createElement(type);
        if (options != undefined) {
            let keys = Object.keys(options);
            for (let prop of keys) {
                element[prop] = options[prop];
            }
        }
        return element;
    }
}

/**
 * Wrapper class containing shims for MapTool functions.
 */
class MT {
    
    /**
     * Returns the name of the current player.
     * @returns {string} Playername.
     */
    static getPlayerName() {
        return MTScript.evalMacro("[r:getPlayerName()]");
    }

    /**
     * Returns true if the player is GM, otherwise false.
     * @returns {boolean} 
     */
    static isGM() {
        return Number(MTScript.evalMacro("[r:isGM()]")) == 1;
    }

    /**
     * Returns information about the library associated with the supplied namespace.
     * @param {string} ns - Namespace of the library.
     * @returns {json} Object with library info.
     */
     static getLibraryInfo(ns) {
        MTScript.setVariable("ns", ns);
        let value = MTScript.evalMacro("[r:library.getInfo(ns)]");
        return JSON.parse(value);
    }   

    /**
     * Returns the value of a property from a library property. 
     * @param {string} name - Name of the property to get.
     * @param {string} ns - Name(space) of the library to use.
     * @returns {string} The value of the property.
     */
    static getLibProperty(name, ns) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("name", name);
        return MTScript.evalMacro("[r:getLibProperty(name, ns)]");
    }

    /**
     * Sets the supplied library property of the associated namespace to 
     * the supplied value.
     * @param {string} name - Name of the property to set.
     * @param {string} value - Value of property.
     * @param {string} ns - Name(space) of the library to use.
     */
    static setLibProperty(name, value, ns) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("name", name);
        MTScript.setVariable("value", value);
        MTScript.evalMacro("[h:setLibProperty(name, value, ns)]");
    }

    /**
     * Reads the static data from the supplied path in the supplied namespace.
     * @param {string} ns - Name of the library to use.
     * @param {string} path - Path of the resource to get.
     * @returns {string} - Content of the resource. If it's an image, an asset id is returned.
     */
    static getStaticData(ns, path) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("path", path);
        return MTScript.evalMacro("[r:data.getStaticData(ns, path)]");
    }

    /**
     * Formats and prints a message with an error and stack trace to the chat window.
     * @param {string} message - The message to print.
     * @param {Error} error - The error to print.
     */
    static printException(message, error) {
        MapTool.chat.broadcast(`${message}<br><pre>${error}\n${error.stack}</pre>`);
    };

    /**
     * Formats and prints a message to the chat window.
     * @param {string} message - The message to print.
     */
    static printMessage(message) {
         MapTool.chat.broadcast(`<pre>${message}</pre>`);
    }

    /**
     * Encodes the supplied text to base64.
     * @param {string} data - The plain string text.
     * @returns {string} The encoded base64 string.
     */
    static btoa(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:base64.encode(jsData)]");
    }

    /**
     * Decodes a base64 encode string to plain text.
     * @param {string} data - The encoded string.
     * @returns {string} The decoded text.
     */
    static atob(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:base64.decode(jsData)]");
    }

    /**
     * Opens a dialog with the supplied dialogName, uri and options string. 
     * @param {string} dialogName - Name of the dialog. Unique for the window. 
     * @param {string} uri - Uri of the html page that should be displayed in the dialog.
     * @param {string} options - Dialog options, like height, width etc. 
     */
    static showDialog(dialogName, uri, options) {
        MTScript.setVariable("dialogName", dialogName);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.dialog5(dialogName, uri, options)]");
    }

    /**
     * Closes the dialog with the supplied name if it exists.
     * @param {*} dialogName - Name of the dialog.
     */
    static closeDialog(dialogName) {
        MTScript.setVariable("dialogName", dialogName);
        MTScript.evalMacro("[h:closeDialog(dialogName)]");
    }


    /**
     * Opens a frame with the supplied name, uri and options string. 
     * @param {string} frameName - Name of the frame. 
     * @param {string} uri - Uri of the html page that should be displayed in the frame.
     * @param {string} options - Frame options, like height, width etc. 
     */
     static showFrame(frameName, uri, options) {
        MTScript.setVariable("frameName", frameName);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.frame5(frameName, uri, options)]");
    }


    /**
     * Closes the frame with the supplied name if it exists.
     * @param {string} frameName - Name of the frame.
     */
    static closeFrame(frameName) {
        MTScript.setVariable("dialogName", frameName);
        MTScript.evalMacro("[h:closeFrame(dialogName)]");
    }


    /**
     * Opens an overlay with the supplied name, uri and options string. 
     * @param {string} nme - Name of the overlay. 
     * @param {string} uri - Uri of the html page that should be displayed in the overlay.
     * @param {string} options - Overlay options. 
     */
    static showOverlay(name, uri, options){
        MTScript.setVariable("name", name);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.overlay(name, uri, options)]");
    }


    /**
     * Closes the overlay with the supplied name if it exists.
     * @param {string} name - Name of the overlay.
     */
    static closeOverlay(name) {
        MTScript.setVariable("name", name);
        MTScript.evalMacro("[h:closeOverlay(name)]");
    }


    /**
     * Checks if an overlay with the supplied name is registered. Returns true if there is.
     * @param {string} name - Name of the overlay.
     * @returns  {boolean} - True if an overlay of the supplied name exists.
     */
    static isOverlayRegistered(name) {
        MTScript.setVariable("name", name);
        return MTScript.evalMacro("[r:isOverlayRegistered(name)]") === 1;
    }


    /**
     * Checks if an overlay with the supplied name is visible. Returns true if there is.
     * @param {string} name - Name of the overlay.
     * @returns  {boolean} - True if an overlay of the supplied name is visible.
     */
     static isOverlayVisible(name) {
        MTScript.setVariable("name", name);
        return MTScript.evalMacro("[r:isOverlayVisible(name)]") === 1;
    }


    /**
     * Sets the visibility of an overlay with the supplied name.
     * @param {string} name - Name of the overlay.
     * @param {boolean} isVisible - The state of the overlay-
     */
     static setOverlayVisible(name, isVisible) {
        MTScript.setVariable("name", name);
        MTScript.setVariable("isVisible", isVisible ? 1 : 0);
        MTScript.evalMacro("[r:setOverlayVisible(name, isVisible)]");
    }
}

/* ######################################################################## */
/* # Global Functions
/* ######################################################################## */

/**
 * Function for evaluating a MapTool macro. It calls the mtscript EvaluateMacro.mts inside the library.
 * @param {string} args - The MapTool macro that should be evaluated. 
 * @param {function} callBack - Response callback. If the caller needs to respond to the macro call.
 */
const evaluateMacro = (body, callBack = undefined) => {
    try {
        let uri = "macro:EvaluateMacro@lib:net.dovesoft.notebook";
        let promise = fetch(uri, { method: "POST", body: body });
        if (callBack) {
            promise.then(
                (response) => response.text().then(
                    fullfilled => callBack(fullfilled),
                    rejected => Log.error("Response", rejected)
                ),
                (rejected) => Log.error("Promise", rejected)
            );
        }
    } catch (error) {
        Log.error("evaluateMacro", error);
    }
}

/**
 * 
 * @param {*} notebookId 
 */
function openNotebook(notebookId) {
    console.log(notebookId);
}
