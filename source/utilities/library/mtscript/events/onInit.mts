[h:prefix = "dsu."]
[h:this = getMacroLocation()]
[h:defineFunction(prefix+"debugLog",  "public/debugLog@"+this)]
[h:defineFunction(prefix+"doDebug",   "public/doDebug@"+this)]
[h:defineFunction(prefix+"getRecord", "functions/getRecord@"+this)]