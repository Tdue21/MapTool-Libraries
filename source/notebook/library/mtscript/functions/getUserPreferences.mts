[h:playerName = if(argCount() > 0, arg(0), "")]
[h: userData = getLibProperty("userPreferences", ns)]
[h: userPrefs = if(playerName != "", json.get(userData, playerName), userData)]
[h:macro.return = userPrefs]
