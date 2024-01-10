[h:assert(argCount() > 0, "You must supply a trait group", 0)]
[h:assert(argCount() > 1, "You must supply trait data", 0)]

[h:traitGroup = arg(0)]
[h:traitData = arg(1)]
[h:libData = getLibProperty("traits", getMacroLocation())]
[h:libData = json.set(libData, lower(traitGroup), traitData)]
[h:setLibProperty("traits",libData,getMacroLocation())]
