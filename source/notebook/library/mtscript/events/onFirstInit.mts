[h:ns = replace(getMacroLocation(), "lib:", "")]

<!-- ### load the default data into the campaign ### -->
[h:setLibProperty("notebooks", data.getStaticData(ns, "/public/data/userguide.json"), getMacroLocation())]