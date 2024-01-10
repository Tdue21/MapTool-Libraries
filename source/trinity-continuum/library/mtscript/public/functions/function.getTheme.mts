[h:themes=getLibProperty("Themes", getMacroLocation())]
[h:selection=tcc.readSetting("theme")]
[h:theme=json.get(themes,selection)]
[h:macro.return=theme]