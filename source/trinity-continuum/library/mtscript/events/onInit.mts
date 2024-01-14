<!-- Setting up User Defined Functions -->
[h:prefix = "tcc."]
[h:this = getMacroLocation()]
[h:defineFunction(prefix+"statBlock",    "Statblock Dialog@"+this)]
[h:defineFunction(prefix+"loading",      "overlay/loading@"+this)]
[h:defineFunction(prefix+"manageTraits", "Manage Traits@"+this)]

[h:defineFunction(prefix+"debugLog",     "functions/function.debugLog@"+this)]
[h:defineFunction(prefix+"dicePool",     "functions/function.dicePool@"+this)]
[h:defineFunction(prefix+"getFile",      "functions/function.getFile@"+this)]
[h:defineFunction(prefix+"getImage",     "functions/function.getImage@"+this)]
[h:defineFunction(prefix+"getNamespace", "functions/function.getNamespace@"+this)]
[h:defineFunction(prefix+"getTheme",     "functions/function.getTheme@"+this)]
[h:defineFunction(prefix+"getTraits",    "functions/function.getTraitGroup@"+this)]
[h:defineFunction(prefix+"getVersion",   "functions/function.getVersion@"+this)]
[h:defineFunction(prefix+"readSetting",  "functions/function.readSetting@"+this)]
[h:defineFunction(prefix+"rollDicePool", "functions/function.rollDicePool@"+this)]
[h:defineFunction(prefix+"selectMap",    "functions/function.selectMap@"+this)]
[h:defineFunction(prefix+"setTraits",    "functions/function.setTraitGroup@"+this)]
[h:defineFunction(prefix+"toolTip",      "functions/function.tooltip@"+this)]
[h:defineFunction(prefix+"writeSetting", "functions/function.writeSetting@"+this)]

[h:defineFunction(prefix+"clearChat",    "functions/function.clearChat@"+this)]
[h:defineFunction(prefix+"showSettings", "Campaign Settings@"+this)]

[h:tcc.loading("Defining Functions ...")]

[macro("Welcome@this"):""]

<!-- Setting up deferred macro calls -->
[h:link = macroLinkText("events/deferredCalls@" + this)]
[h:execLink(link,1)]

<!-- Loading overlays -->
[h:tcc.loading("Loading overlays ...")]
[macro("overlay/miniMenu@this"):""]

<!-- All done. Closing up -->
[h:closeOverlay("loading")]

[h:broadcast("OnInit Done")]
