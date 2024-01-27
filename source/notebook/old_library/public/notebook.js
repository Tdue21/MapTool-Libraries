"use strict";
const ns = "net.dovesoft.notebook";

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
 * Utility functions for logging to the chat window.
 */
const Log = {

    /**
     * 
     * @param {string} message 
     * @param {Error} error 
     */
    error(message, error = undefined) {
        let output = `<h4>${message}</h4>`;
        if (error != undefined) {
            output += `<pre>${error}\n${error.stack}</pre>`;
        }
        MapTool.log(output);
    },

    /**
     * 
     * @param {string} message 
     */
    message(message) {
        MapTool.log(message);
    },

    /**
     * 
     * @param {JSON} json 
     */
    asJson(json) {
        evaluateMacro(`[h:data='${JSON.stringify(json)}'][h:broadcast("<pre>" + json.indent(data) + "</pre>")]`);
    }
}

/**
 * Utility functions used for encoding and decoding data for transporting.
 */
const Transport = {
    /**
     * 
     * @param {string} data 
     * @returns {JSON} The decoded JSON object
     */
    decode(data) {
        const decoded = MT.atob(data);
        const json = JSON.parse(decoded);
        return json;
    },

    encode(data) {
        const text = JSON.stringify(data);
        const encoded = MT.btoa(text);
        return encoded;
    }
}

/**
 * General helper functions.
 */
const Helpers = {

    /**
     * 
     * @param {*} type 
     * @param {*} options 
     * @returns 
     */
    createElement(type, options) {
        let element = document.createElement(type);
        if (options != undefined) {
            let keys = Object.keys(options);
            for (let prop of keys) {
                element[prop] = options[prop];
            }
        }
        return element;
    },

    /**
     * Helper function for reading the latest version of the library from github.
     * @returns A string containing the latest version.
     */
    getLatestVersion() {
        const updateLink = "https://raw.githubusercontent.com/Tdue21/MapTool-Notebook/master/build/latest.txt";
        //const updateLink = "https://raw.githubusercontent.com/Tdue21/MapTool-Libraries/main/release/notebook-latest.txt";
        const latest = MTScript.evalMacro(`[r:REST.get("${updateLink}")]`);
        return latest;
    },

    /**
     * Input a string containing a template, which can be anything really, but 
     * usually html and a json object containing options for the template. 
     * @param {string} template - string with the template.
     * @param {json} options - json object with options.
     * @returns {string} - returns the finished string.
     */
    evalTemplate(template, options) {
        let wrapper = "";
        try {
            wrapper = `"use strict";\r\n`;
            wrapper += `let options=${JSON.stringify(options)};\r\n`;
            wrapper += `let html=\`${template}\`;\r\n\r\nreturn html`;

            return Function(wrapper)();
        } catch (error) {
            MT.printException("evalTemplate: " + wrapper, error);
        }
    },

    /**
     * 
     * @param {*} width 
     * @param {*} height 
     * @param {*} data 
     * @returns 
     */
    getDialogOptions(width, height, data) {
        return `width=${width}; height=${height}; temporary=1; noframe=0; input=1; value=${data}`;
    }
}

/**
 * Wrapper class containing shims for MapTool functions.
 */
const MT = {

    /**
     * Returns the name of the current player.
     * @returns {string} Playername.
     */
    getPlayerName() {
        return MTScript.evalMacro("[r:getPlayerName()]");
    },

    /**
     * Returns true if the player is GM, otherwise false.
     * @returns {boolean} 
     */
    isGM() {
        return Number(MTScript.evalMacro("[r:isGM()]")) == 1;
    },

    /**
     * Returns information about the library associated with the supplied namespace.
     * @param {string} ns - Namespace of the library.
     * @returns {json} Object with library info.
     */
    getLibraryInfo(ns) {
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
    getLibProperty(name, ns) {
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
    setLibProperty(name, value, ns) {
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
    getStaticData(ns, path) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("path", path);
        return MTScript.evalMacro("[r:data.getStaticData(ns, path)]");
    },

    /**
     * Formats and prints a message with an error and stack trace to the chat window.
     * @param {string} message - The message to print.
     * @param {Error} error - The error to print.
     */
    printException(message, error) {
        MapTool.chat.broadcast(`${message}<br><pre>${error}\n${error.stack}</pre>`);
    },

    /**
     * Formats and prints a message to the chat window.
     * @param {string} message - The message to print.
     */
    printMessage(message) {
        MapTool.chat.broadcast(`<pre>${message}</pre>`);
    },

    /**
     * Encodes the supplied text to base64.
     * @param {string} data - The plain string text.
     * @returns {string} The encoded base64 string.
     */
    btoa(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:base64.encode(jsData)]");
    },

    /**
     * Decodes a base64 encode string to plain text.
     * @param {string} data - The encoded string.
     * @returns {string} The decoded text.
     */
    atob(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:base64.decode(jsData)]");
    },

    /**
     * Opens a dialog with the supplied dialogName, uri and options string. 
     * @param {string} dialogName - Name of the dialog. Unique for the window. 
     * @param {string} uri - Uri of the html page that should be displayed in the dialog.
     * @param {string} options - Dialog options, like height, width etc. 
     */
    showDialog(dialogName, uri, options) {
        MTScript.setVariable("dialogName", dialogName);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.dialog5(dialogName, uri, options)]");
    },

    /**
     * Closes the dialog with the supplied name if it exists.
     * @param {*} dialogName - Name of the dialog.
     */
    closeDialog(dialogName) {
        MTScript.setVariable("dialogName", dialogName);
        MTScript.evalMacro("[h:closeDialog(dialogName)]");
    },

    /**
     * Opens a frame with the supplied name, uri and options string. 
     * @param {string} frameName - Name of the frame. 
     * @param {string} uri - Uri of the html page that should be displayed in the frame.
     * @param {string} options - Frame options, like height, width etc. 
     */
    showFrame(frameName, uri, options) {
        MTScript.setVariable("frameName", frameName);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.frame5(frameName, uri, options)]");
    },

    /**
     * Closes the frame with the supplied name if it exists.
     * @param {string} frameName - Name of the frame.
     */
    closeFrame(frameName) {
        MTScript.setVariable("dialogName", frameName);
        MTScript.evalMacro("[h:closeFrame(dialogName)]");
    },

    /**
     * Opens an overlay with the supplied name, uri and options string. 
     * @param {string} nme - Name of the overlay. 
     * @param {string} uri - Uri of the html page that should be displayed in the overlay.
     * @param {string} options - Overlay options. 
     */
    showOverlay(name, uri, options) {
        MTScript.setVariable("name", name);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.overlay(name, uri, options)]");
    },

    /**
     * Closes the overlay with the supplied name if it exists.
     * @param {string} name - Name of the overlay.
     */
    closeOverlay(name) {
        MTScript.setVariable("name", name);
        MTScript.evalMacro("[h:closeOverlay(name)]");
    },

    /**
     * Checks if an overlay with the supplied name is registered. Returns true if there is.
     * @param {string} name - Name of the overlay.
     * @returns  {boolean} - True if an overlay of the supplied name exists.
     */
    isOverlayRegistered(name) {
        MTScript.setVariable("name", name);
        return MTScript.evalMacro("[r:isOverlayRegistered(name)]") === 1;
    },

    /**
     * Checks if an overlay with the supplied name is visible. Returns true if there is.
     * @param {string} name - Name of the overlay.
     * @returns  {boolean} - True if an overlay of the supplied name is visible.
     */
    isOverlayVisible(name) {
        MTScript.setVariable("name", name);
        return MTScript.evalMacro("[r:isOverlayVisible(name)]") === 1;
    },

    /**
     * Sets the visibility of an overlay with the supplied name.
     * @param {string} name - Name of the overlay.
     * @param {boolean} isVisible - The state of the overlay-
     */
    setOverlayVisible(name, isVisible) {
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
function evaluateMacro(body, callBack = undefined) {
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
 * Function for showing the welcome screen. 
 */
function showWelcome() {
    console.log("Running showWelcome");
    try {
        let data = MT.getStaticData(ns, "/public/data/welcome.html");
        let gitLatest = Helpers.getLatestVersion();
        let libData = MT.getLibraryInfo(ns);

        let final = Helpers.evalTemplate(data, {
            latest: gitLatest,
            version: libData.version,
            doUpdate: gitLatest.localeCompare(libData.version) > 0
        });
        MT.printMessage(final);
    } catch (error) {
        MT.printException("showWelcome", error);
    }
}
MTScript.registerMacro("showWelcome", showWelcome);

/**
 * 
 */
function showOverlay() {
    console.log("Running showOverlay");
    try {
        const overlayName = "Library";
        const data = {
            gm: MT.isGM(),
            player: MT.getPlayerName()
        }

        if (!MT.isOverlayRegistered(overlayName)) {
            MT.showOverlay("Library", `lib://${ns}/overlay.html`, "zorder=90;value=" + Transport.encode(data));
        }

        if (!MT.isOverlayVisible(overlayName)) {
            MT.setOverlayVisible(overlayName, true);
        }
    } catch (error) {
        MT.printException("showOverlay", error);
    }
}
MTScript.registerMacro("showOverlay", showOverlay);

/**
 * 
 */
function showLibrary() {
    console.log("Running showLibrary");
    try {
        const _playerName = MT.getPlayerName();
        const json = MT.getLibProperty("notebooks", ns);
        console.log(json);
        const _notebooks = JSON.parse(json);
        const _userPrefs = getUserPreferences(_playerName);
        const data = {
            "isGM": MT.isGM(),
            "playerName": _playerName,
            "asFrame": _userPrefs.asFrame,
            "notebooks": _notebooks
        };

        let options = getDialogOptions(260, 500, transEncode(data));
        MT.showFrame("Notebook Library", `lib://${ns}/library.html`, options);
    } catch (error) {
        MT.printException("showLibrary", error);
    }
}
MTScript.registerMacro("showLibrary", showLibrary);

/**
 * 
 */
function showAbout() {
    console.log("Running showAbout");
    try {
        let data = MT.getLibraryInfo(ns);
        let options = Helpers.getDialogOptions(400, 450, data.version);
        MT.showDialog("About", `lib://${ns}/about.html`, options);
    } catch (error) {
        MT.printException("showAbout", error);
    }
}
MTScript.registerMacro("showAbout", showAbout);

/**
 * 
 */
function initLibrary() {
    console.log("Running initLibrary");
    try {
        let data = MT.getStaticData(ns, "/public/data/userguide.json");
        MT.setLibProperty("notebooks", data, ns);
    } catch (error) {
        MT.printException("initLibrary", error);
    }
}
MTScript.registerMacro("initLibrary", initLibrary);

/**
 * 
 * @param {*} id 
 */
function editNotebook(id) {
    console.log("Running initLibrary");
    try {

    } catch (error) {
        MT.printException("initLibrary", error);
    }
}
MTScript.registerMacro("editNotebook", editNotebook);


/**
 * 
 * @param {*} userName 
 * @returns 
 */
function getUserPreferences(userName = "") {
    try {
        let userPref = {};
        let raw = MT.getLibProperty("userPreferences", ns);
        if (isJson(raw)) {
            let userPreferences = JSON.parse(raw);
            if(userName != "") {
                userPref = userPreferences[userName];
            } else {
                userPref = userPreferences;
            }
        }
        return userPref;
    } catch (error) {
        MT.printException("getUserPreferences", error);
    }
}
MTScript.registerMacro("getUserPreferences", getUserPreferences);

/**
 * 
 * @param {*} userName 
 * @param {*} userPrefs 
 */
function setUserPreferences(userName, userPrefs) {
    try {
        const playerName = transDecode(userName);
        const userPref = transDecode(userPrefs);
        let userPreferences = getUserPreferences();
        let usersPrefs = userPreferences[playerName];

        const keys = Object.keys(userPref);
        for(let key of keys) {
            usersPrefs[key] = userPref[key];
        }
        userPreferences[playerName] = usersPrefs;
        MT.setLibProperty("userPreferences", userPreferences, ns);
    } catch (error) {
        MT.printException("setUserPreferences", error);
    }
}
MTScript.registerMacro("setUserPreferences", setUserPreferences);
