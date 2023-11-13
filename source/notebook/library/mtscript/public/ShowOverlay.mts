[h:namespace   = nb.getNamespace()]
[h:overlayName = "Notebooks"]
[h:data        = json.set("{}", "gm", isGM(), "player", getPlayerName())]
[h:uri         = "lib://" + namespace + "/overlay.html"]

[if(isOverlayRegistered(overlayName) == 0): html.overlay(overlayName, uri, "zorder=100")]
[if(isOverlayVisible(overlayName) == 0): setOverlayVisible(overlayName, true)]

