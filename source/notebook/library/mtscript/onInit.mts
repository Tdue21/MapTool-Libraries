[h:namespace = "net.dovesoft.notebook"]
[h:prefix    = "nb."]

[h:defineFunction(prefix + "getNamespace", "GetNamespace@lib:" + namespace)]
[h:defineFunction(prefix + "initializeLibrary", "InitializeLibrary@lib:" + namespace)]

[h:defineFunction(prefix + "showWelcome", "ShowWelcome@lib:" + namespace)]
[h:defineFunction(prefix + "showOverlay", "ShowOverlay@lib:" + namespace)]
[h:defineFunction(prefix + "showLibrary", "ShowLibrary@lib:" + namespace)]
[h:defineFunction(prefix + "showAbout", "ShowAbout@lib:" + namespace)]

[h:defineFunction(prefix + "getUserOption", "GetUserOption@lib:" + namespace)]
[h:defineFunction(prefix + "setUserOption", "SetUserOption@lib:" + namespace)]
[h:defineFunction(prefix + "compareVersions", "CompareVersions@lib:" + namespace)]

[h:nb.showWelcome()]
[h:nb.showOverlay()]

[h:broadcast("onInit loaded")]
