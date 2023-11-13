[h:namespace    = nb.getNamespace()]
[h:updateLink   = "https://raw.githubusercontent.com/Tdue21/MapTool-Libraries/main/release/notebook-latest.txt"]
[h:libInfo      = library.getInfo(namespace)]
[h:libVersion   = json.get(libInfo, "version")]
[h:libLatest    = trim(REST.get(updateLink))]
[h:doUpdate     = js.eval("return args[0].localeCompare(args[1]) > 0;", libLatest, libVersion) == "true"]
[h:welcomeData  = data.getStaticData(namespace, "public/data/welcome.html") ]
[h:welcomeText  = evalMacro(welcomeData)]

[h:broadcast(welcomeText)]
