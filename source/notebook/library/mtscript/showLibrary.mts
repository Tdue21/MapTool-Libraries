[h: ns = dsnb.getNamespace()]
[h: playerName = getPlayerName()]
[h: userData = getLibProperty("userPreferences", ns)]
[h, if(userData == "") : userData = json.set("{}", playerName, json.set("{}", "asFrame", 0))]
[h: userPrefs = json.get(userData, playerName)]
[h: asFrame = Number(json.get(userPrefs, "asFrame")) == 1]

[h:frameOptions = json.set("{}", 
    "isGM", if(isGM(), json.true, json.false),
    "playerName", playerName,
    "userPrefs", userPrefs,
    "notebooks", getLibProperty("notebooks", ns)
)]

[h:options = "width=300; height=500; temporary=1; noframe=0; input=1; value=" + base64.encode(frameOptions))]
[h,if(asFrame): 
    html.frame5("Notebook Library", "lib://" + ns + "/library.html", options); 
    html.dialog5("Notebook Library", "lib://" + ns + "/library.html", options)]