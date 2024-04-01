"use strict";

if(typeof MapTool === typeof undefined) {

    window.fetch = async function(input, init) {
        const response = `Input: ${input} - Init: ${JSON.stringify(init)}`;
        console.log(response);
        
        return Promise.resolve(new Response(response));
    }
}

/*
if (typeof MapTool === typeof undefined) {

    console.log("No MapTool found!");

    window.MapTool = {

        mocked: true,

        getName() { return "name" },

        getKind() { return "kind" },

        log(data) { console.log(data) },

        async getUserData() {
            if (document.location.pathname.includes("library.html")) {

                let data = await fetch("./data/userguide.json");
                let notebooks = await data.json();

                let userData = {
                    isGM: true,
                    playerName: "Gertrude",
                    asFrame: true,
                    notebooks: notebooks
                };

                return btoa(JSON.stringify(userData));
                
            } else if (document.location.pathname.includes("show.html")) {

                let data = await fetch("./data/userguide.json");
                let book = await data.json();
                return btoa(JSON.stringify(book[0]));
            }
            return null;
        },

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
*/