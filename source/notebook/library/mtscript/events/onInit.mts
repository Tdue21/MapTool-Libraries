<!-- Setting up User Defined Functions -->
[h:prefix = "dsnb."]
[h:this = getMacroLocation()]
[h:defineFunction("debugLog",           "functions/debugLog@"+this)]

[h:defineFunction(prefix+"compareVersions",   "functions/compareVersions@"+this)]
[h:defineFunction(prefix+"doDebug",           "functions/doDebug@"+this)]
[h:defineFunction(prefix+"getLatestVersion",  "functions/getLatestVersion@"+this)]
[h:defineFunction(prefix+"getLibraryVersion", "functions/getLibraryVersion@"+this)]
[h:defineFunction(prefix+"getNamespace",      "functions/getNamespace@"+this)]
[h:defineFunction(prefix+"getRecord",         "functions/getRecord@"+this)]

[h:defineFunction(prefix+"showWelcome", "showWelcome@"+this)]
[h:defineFunction(prefix+"showAbout",   "showAbout@"+this)]
[h:defineFunction(prefix+"showOverlay", "showOverlay@"+this)]
[h:defineFunction(prefix+"showLibrary", "showLibrary@"+this)]
[h:defineFunction(prefix+"showBook",    "showBook@"+this)]

[h:dsnb.showWelcome()]
[h:dsnb.showOverlay()]

[h:broadcast("onInit loaded")]
