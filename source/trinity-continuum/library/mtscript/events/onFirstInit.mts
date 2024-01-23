[h:ns = replace(getMacroLocation(), "lib:", "")]

<!-- ### load the default data into the campaign ### -->
[h:setLibProperty("Settings", data.getStaticData(ns, "/public/data/settings.json"), getMacroLocation())]
[h:setLibProperty("Themes",   data.getStaticData(ns, "/public/data/themes.json"),   getMacroLocation())]
[h:setLibProperty("Traits",   data.getStaticData(ns, "/public/data/traits.json"),   getMacroLocation())]
[h:setLibProperty("Sources",  data.getStaticData(ns, "/public/data/sources.json"),  getMacroLocation())]
[h:setLibProperty("Personae", data.getStaticData(ns, "/public/data/personae.json"), getMacroLocation())]

<!-- ### create the StoryGuide's screen map for storing tokens and other stuff for the SG only. ### -->
[h:screenImage = "lib://" + ns + "/images/StoryGuideScreen.png")]
[h: screenId = createMap("00. Storyteller\'s Screen", 
    json.set("{}",
        "player visible", json.false,
        "vision type", "Off",
        "vision distance", 1000,
        "lighting style", "OVERTOP",
        "has fog", json.false,
        "ai rounding", "CELL_UNIT",
        "background paint", "#666666",
        "grid", json.set("{}", 
            "type", "None",
            "color", "#333333"
        )
    )
)]

<!-- ### Work-around for placing an image on the background, as createMap does not yet understand lib:// uris ### -->
[h:tokenId = createToken(
    json.set("{}",
        "name","Image:StoryGuideScreen",
        "tokenImage", screenImage,
        "size","Free",
        "layer", "Background"
    )
)]
[h:tokenX = getTokenX(1, tokenId) - (getTokenWidth(tokenId) / 2)]
[h:tokenY = getTokenY(1, tokenId) - (getTokenHeight(tokenId) / 2)]
[h:moveToken(tokenX, tokenY, 1, tokenId)]

<!-- ### Work-around for creating the necessary GM & Campaign buttons, until createMacro supports this. ### -->

<!-- ### First a lib token for holding the buttons. ### -->
[h:libImage = "lib://" + ns + "/images/tokens/trinity-token.webp"]
[h:tokenId = createToken(
    json.set("{}", 
        "name", "Lib:TrinityCore", 
        "label", "Trinity Continuum Campaign Macros",
        "tokenImage", libImage,
        "layer", "Token",
        "size", "0",
        "x", 0,
        "y", 0
    )
)]

<!-- ### Create the Campaign Settings button ### -->
[h:macroParams  = json.set("{}", 
				    "color", "#005D00", 
				    "fontColor", "white", 
				    "autoExecute", 1, 
				    "label", "<b>Campaign Settings</b>", 
				    "tooltip", "<html>Opens the Trinity Continuum Campaign Settings. Drag this button to the <i>GM</i> or <i>Campaign</i> panel.",
				    "playerEditable", 0, 
				    "minWidth", 120,
				    "command", "[h:tcc.showSettings()]")]
[h:createMacro(macroParams, tokenId)]

<!-- ### create the Lobby map for starting map. ### -->
[h:lobbyImage = "lib://" + ns + "/images/LobbyBackground.png")]
[h: lobbyId = createMap("01. Lobby", 
    json.set("{}",
        "player visible", json.true,
        "vision type", "Off",
        "vision distance", 1000,
        "lighting style", "OVERTOP",
        "has fog", json.false,
        "ai rounding", "CELL_UNIT",
        "background paint", "#666666",
        "grid", json.set("{}", 
            "type", "None",
            "color", "#333333"
        )
    )
)]

<!-- ### Work-around for placing an image on the background, as createMap does not yet understand lib:// uris ### -->
[setCurrentMap("01. Lobby")]
[h:tokenId=createToken(json.set("{}",
    "name","Image:LobbyBackground",
    "tokenImage", lobbyImage,
    "size","Free",
    "layer", "Background"))]

[h:tokenX = getTokenX(1, tokenId) - (getTokenWidth(tokenId) / 2)]
[h:tokenY = getTokenY(1, tokenId) - (getTokenHeight(tokenId) / 2)]
[h:moveToken(tokenX, tokenY, 1, tokenId)]
