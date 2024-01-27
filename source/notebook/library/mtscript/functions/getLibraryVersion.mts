[h:ns = dsnb.getNamespace()]
[h:libInfo = library.getInfo(ns)]
[h:libVersion = json.get(libInfo, "version")]
[r:libVersion]