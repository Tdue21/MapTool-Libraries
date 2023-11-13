[h: playerName = getPlayerName()]
[h: notebooks  = getLibProperty("notebooks", nb.getNamespace())]
[h: asFrame    = nb.getUserOption(playerName, "asFrame", "0")]

[h: data = json.set("{}", "playerName", playerName, "isGM", isGM(), "asFrame", asFrame, "notebooks", notebooks)]
[h: broadcast("<pre>" + json.indent(data) + "</pre>")]

