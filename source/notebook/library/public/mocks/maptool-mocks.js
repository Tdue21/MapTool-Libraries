/**
 * 
 */
let mockUserData = {
    isGM: 1,
    playerName: "Gertrud",
    asFrame:1,
    noteBooks:[
        {
            id: 1,
            title: "User Guide",
            summary: "This is the summary of the most awesome user guide in the multiverse. Actually, it is so awesome that even AO is in awe of it",
            owner: "net.dovesoft.notebook",
            isPrivate: false,
            accent: "#61003E",
            readonly: true,
            pages: [
                { name: "0. Introduction", uri: "/public/docs/userguide_intro.md" },
                { name: "1. Basic Use", uri: "/public/docs/userguide_basics.md" },
                { name: "2. Syntax", uri: "/public/docs/userguide_syntax.md" },
                { name: "3. Changelog", uri: "/public/docs/userguide_changelog.md" }
            ]
        },
        {
            id: 2,
            title: "Dummy Notebook",
            summary: "This is just a dummy notebook",
            owner: "Thomas",
            isPrivate: true,
            accent: "#A1003E",
            readonly: false,
            pages: [
                { name: "0. Introduction", content: "/public/docs/userguide_intro.md" },
                { name: "1. Basic Use", content: "/public/docs/userguide_basics.md" },
                { name: "2. Syntax", content: "/public/docs/userguide_syntax.md" },
                { name: "3. Changelog", content: "/public/docs/userguide_changelog.md" }
            ]
        }
    ]
};

function fetch(uri, options = null) {
    console.log(`uri: ${uri}; options: ${JSON.stringify(options)}`);
    return new Promise(resolve => resolve(new Response(options?.body)));
}

/**
 * 
 */
const MapTool = {
    /**
     * Returns a Promise with mock data.
     * @returns Promise
     */
    getUserData: function () {
        try {
            return new Promise(resolve => resolve(mockUserData));
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Mock for the MapTool.log js function. Wraps console.log. 
     * @param {string} data 
     */
    log: function (data) {
        console.log(data);
    }
}

const MTScript = {
    registerMacro : function(macroName, callable) {
        console.log(`registerMacro: ${macroName}`);
    }
}

console.log("Library mocks loaded");