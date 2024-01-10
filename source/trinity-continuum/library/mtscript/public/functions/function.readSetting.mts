[h:field=arg(0)]
[h:settings=getLibProperty("Settings", getMacroLocation())]
[h:value=json.get(settings,field)]
[h:macro.return=value]