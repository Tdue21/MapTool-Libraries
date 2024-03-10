class MapTool {

    static async getUserData() {
        console.log(document.location.pathname);
        let userData = null;

        if (document.location.pathname.includes("library.html")) {

            let data = await fetch("./data/userguide.json");
            let notebooks = await data.json();

            userData = {
                isGM: true,
                playerName: "Gertrude",
                asFrame: true,
                notebooks: notebooks
            };

        } else if (document.location.pathname.includes("notebook.html")) {

            let data = await fetch("./data/userguide.json");
            let book = await data.json();
            userData = {
                action:"show",
                notebook:btoa(JSON.stringify(book[1]))
            }
        }

        return btoa(JSON.stringify(userData));
    }

 /*
          } else {
            let data = await Mocks.getMockData("getLibProperty-" + name);
            console.log(`getLibProperty("${name}", "${ns}")] = ${data}`);
            return data;
        }
  
*/
    static async getMockData(dataId) {
        let raw = await fetch("./data/mock-data.json");
        let data = await raw.json();
        return data[dataId];
    }
}

async function fetch(input, init) {

}