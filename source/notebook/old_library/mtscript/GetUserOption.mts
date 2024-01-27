[h: assert(argCount() >= 2, "The UDF 'nb.GetUserOption' requires 2 argument: userName and key. Optional default value.")]

[h: userName = arg(0))]
[h: key      = arg(1))]
[h: default  = if(argCount() == 3, arg(2), "")]

[h: assert(userName != "", "UserName must not be empty.")]
[h: assert(key != "", "Key must not be empty.")]

[h: json = getLibProperty("userPreferences", nb.getNamespace())]
[h:log.info(json)]
[h: json = if(json.type(json) == "OBJECT", json, "{}")]
[h:log.info(json)]

[h: userOptions = if(json.contains(json, userName), json.get(json, userName), "{}")]
[h:log.info(userOptions)]
[h: value = if(json.contains(userOptions, key), json.get(userOptions, key), default)]
[h:log.info(value)]

[r:value]