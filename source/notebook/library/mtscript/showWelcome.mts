[h:ns            = dsnb.getNamespace()]
[h:libVersion    = dsnb.getLibraryVersion()]
[h:latestVersion = dsnb.getLatestVersion()]
[h:doUpdate      = dsnb.compareVersions(libVersion, latestVersion) >= 1]

[h:rawData = data.getStaticData(ns, "public/data/welcome.html")]
[h:welcomeText = evalMacro(rawData)]

[h:broadcast(welcomeText)]
