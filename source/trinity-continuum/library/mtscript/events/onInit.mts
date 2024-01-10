<!-- Setting up User Defined Functions -->
[h:prefix = "tcc."]
[h:this = getMacroLocation()]
[h:defineFunction(prefix+"statBlock",    "Statblock Dialog@"+this)]
[h:defineFunction(prefix+"loading",      "overlay/loading@"+this)]
[h:defineFunction(prefix+"getNamespace", "functions/function.getNamespace@"+this)]

[h:defineFunction(prefix+"debugLog",     "functions/function.debugLog@"+this)]
[h:defineFunction(prefix+"dicePool",     "functions/function.dicePool@"+this)]
[h:defineFunction(prefix+"getTheme",     "functions/function.getTheme@"+this)]
[h:defineFunction(prefix+"getTraits",    "functions/function.getTraitGroup@"+this)]
[h:defineFunction(prefix+"readSetting",  "functions/function.readSetting@"+this)]
[h:defineFunction(prefix+"rollDicePool", "functions/function.rollDicePool@"+this)]
[h:defineFunction(prefix+"selectMap",    "functions/function.selectMap@"+this)]
[h:defineFunction(prefix+"setTraits",    "functions/function.setTraitGroup@"+this)]
[h:defineFunction(prefix+"toolTip",      "functions/function.tooltip@"+this)]
[h:defineFunction(prefix+"writeSetting", "functions/function.writeSetting@"+this)]

[h:defineFunction(prefix+"clearChat",    "functions/function.clearChat@"+this)]
[h:defineFunction(prefix+"showSettings", "Campaign Settings@"+this)]

[h:tcc.loading("Defining Functions ...")]


<!-- Reading output settings -->
[h:outputPC=tcc.readSetting("outputPC")]
[h:outputGM=tcc.readSetting("outputGM")]
[h:output=if(isGM()==1,outputGM,outputPC)]

<!-- Setting start map -->
[h:startMap=tcc.readSetting("startMap")]

[macro("Welcome@this"):""]

<!-- Setting up deferred macro calls -->
[h:link = macroLinkText("events/deferredCalls@this")]
[h:execLink(link,1)]

<!-- All done. Closing up -->
[h:closeOverlay("loading")]