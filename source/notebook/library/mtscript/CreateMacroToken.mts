[h:tokenName    = "Notebook Library"]
[h:imageUrl     = "lib://net.dovesoft.notebook/images/quill-paper.png"]
[h:macroLabel   = "<b>Open Library</b>"]
[h:macroTooltip = "<html>Opens the Notebook Library. Drag this button to the <i>GM</i> or <i>Campaign</i> panel."]
[h:macroCommand = "[h:nb.showLibrary()]"]
[h:center       = getViewCenter(0, "json")]

[h:tokenParams  = json.set("{}", 
					"name", tokenName, 
					"tokenImage", imageUrl,
					"x", json.get(center, "centerX"),
					"y", json.get(center, "centerY"))]
[h:id = createToken(tokenParams)]

[h:macroParams  = json.set("{}", 
				    "color", "#005D00", 
				    "fontColor", "white", 
				    "autoExecute", 1, 
				    "label", macroLabel, 
				    "tooltip", macroTooltip,
				    "playerEditable", 0, 
				    "minWidth", 120,
				    "command", macroCommand)]

[h:createMacro(macroParams, id)]