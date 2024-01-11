[h:assert(argCount() == 1, "You must supply a trait group", 0)]

[h:traitGroup = arg(0)]
[h:libData=getLibProperty("Traits", getMacroLocation())]
[h:groupData=json.get(libData, lower(traitGroup))]

[h:macro.return=groupData]