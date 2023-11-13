[[h:assert(argCount() == 3, "The UDF 'nb.SetUserOption' requires 3 arguments: userName, key and value.")]]

[h:userName  = arg(0)]
[h:key       = arg(1)]
[h:value     = arg(2)]

[h:assert(userName != "", "UserName must not be empty.")]
[h:assert(key != "", "Key must not be empty.")]

[h:namespace = nb.GetNamespace()]

[h:data = getLibProperty("userPreferences", namespace)]
[h:log.info(data)]
[h:data = if(json.type(data) == "OBJECT", data, "{}")]
[h:log.info(data)]
[h:options = if(json.contains(data, userName), json.get(data, userName), "{}")]
[h:log.info(options)]

[h:options = json.set(options, key, value)]
[h:data = json.set(data, userName, options)]
[h:log.info(data)]

[h:setLibProperty("userPreferences", data, namespace)]