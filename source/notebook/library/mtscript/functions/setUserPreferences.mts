<!-- #########################################################################
let userPrefs = {
    "player" : {
        "asFrame" : true
    }
}
########################################################################## -->

[h:assert(argCount() >= 1, "The first parameter of setUserPreferences must be playerName.", 0)]
[h:assert(argCount() >= 2, "The first parameter of setUserPreferences must be a user preferences object.", 0)]

[h:playerName = arg(0)]
[h:userPrefs  = arg(1)]

[h: rawData = getLibProperty("userPreferences", ns)]
[h: userData = json.get(rawData, playerName)]
[h, foreach(pref, json.fields(userPrefs)), code: {
    [h:json.set(userData, pref, json.get(userPrefs, pref))]
}]
[h:rawData = json.set(rawData, playerName, userData)]
[h: setLibProperty("userPreferences", rawData, ns)]
