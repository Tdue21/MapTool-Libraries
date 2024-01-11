[h:ns = replace(getMacroLocation(), "lib:", "")]

[h:setLibProperty("Settings", data.getStaticData(ns, "/public/data/settings.json"), getMacroLocation())]
[h:setLibProperty("Themes", data.getStaticData(ns, "/public/data/themes.json"), getMacroLocation())]
[h:setLibProperty("Traits", data.getStaticData(ns, "/public/data/traits.json"), getMacroLocation())]

[h:screenImage = "lib://" + ns + "/images/StoryGuideScreen.png")]
[h: screenId = createMap("00. Storyteller\'s Screen", 
    json.set("{}",
        "player visible", json.false,
        "vision type", "Off",
        "vision distance", 1000,
        "lighting style", "OVERTOP",
        "has fog", json.false,
        "ai rounding", "None"
    )
)]

[h:lobbyImage = "lib://" + ns + "/images/LobbyBackground.png")]
[h: lobbyId = createMap("01. Lobby", 
    json.set("{}",
        "player visible", json.true,
        "vision type", "Off",
        "vision distance", 1000,
        "lighting style", "OVERTOP",
        "has fog", json.false,
        "ai rounding", "None"
    )
)]

[h:tokenParams  = json.set("{}", 
    "name", "Lib:TrinityCore", 
    "label", "Trinity Continuum Campaign Macros",
    "tokenImage", "lib://" + ns + "/images/trinity-token.webp",
	"x", 0,
	"y", 0)]
[h:tokenId = createToken(tokenParams)]

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

[h:broadcast("OnFirstInit Done")]
