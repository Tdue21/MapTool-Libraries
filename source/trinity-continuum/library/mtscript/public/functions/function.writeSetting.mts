[h:field=arg(0)]
[h:value=arg(1)]
[h:settings=getLibProperty("Settings", getMacroLocation())]
[h:settings=json.set(settings,field,value)]
[h:setLibproperty("Settings", settings, getMacroLocation())]
