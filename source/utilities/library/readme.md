# Tdue21's MapTool Utilities

This add-on library for MapTool contains several useful utilities that can 
be utilized by both add-on libraries and library tokens. 

The following utilities are contained within. 

## MapTool UDFs

### dsu.doDebug()

This UDF will return `true (1)` or `false (0)` depending on whether the MapTool logger `macro-logger` is set to `DEBUG` or not. 

**Example**
```
<!-- returns true (1)-->
[h: log.setLevel("macro-logger","DEBUG")]
[h:isDebug = dsu.doDebug()]

<!-- returns false (0)-->
[h: log.setLevel("macro-logger","INFO")]
[h:isDebug = dsu.doDebug()]
```

### dsu.debugLog(message)
| Parameter | Description |
|:--- | :--- |
| *message* | A message to output to broadcast. It will be prefixed with `[DEBUG]`. |
| | |

This UDF will output whatever is passed to it in a `broadcast`, *if* `dsu.doDebug()` is `true`.

```
[h:dsu.debugLog("This is only broadcast, if macro-logger = DEBUG")]
```

### dsu.getRecord(records,key,value,...)
| Parameter | Description |
|:--- | :--- |
| *records* | A json array of objects where the objects have the same keys in each array element. |
| *key* | Main key name that makes record unique. The value of key is unique. |
| *value* | value to find index of object/records - the full object of the record or an array of multiple matching records or none. |
| | |

Full credit for this one goes to AlienMask, but it is simply so useful and I use it in some of the other UDFs. 

There is a reference to it [here](https://discord.com/channels/296230822262865920/296657960720007169/1036004905015574579
) on the MapTool Discord. 

**Example**
```
<!-- level contains the value of the "macro-logger" logger. -->
[h: level = dsu.getRecord(log.getLoggers(), "name", "macro-logger")]
```
   
## MapTool Javascript utilities

These are Javascript functions that I find useful when coding html5 Javascript. They will most likely not work with Graalvm, but should work fine with the
WebView used for `dialog5`, `frame5` and `overlay` functions in MapTool. 

Access them by including this line in the `<head>` section of your html: 
```html
<script src="lib://dovesoft.utilities/tools.js?cachelib=false"></script>
```

### evaluateMacro(macro)
| Parameter | Description |
|:--- | :--- |
| *macro* | A string containing a MapTool macro. This can be as simple or complex as it needs to be. It is executed through use of the `evalMacro` function. |
| | |

This function can be used to execute a MapTool macro from Javascript code in a `dialog5` or the likes. 
This is an async function, so must be called like this: 

```js
<script async>
    "use strict";

    (async () => {
        let data = await evaluateMacro(`[r:getTokens("json")]`);
        foreach(let token of data) {
            // Do something with the tokens returned
        }
    })();
</script>
```

### debugLog(message)
| Parameter | Description |
|:--- | :--- |
| *message* | A message to output to broadcast. It will be prefixed with `[DEBUG]`. |
| | |

This works exactly like the MapTool UDF described earlier. 

### getLibProperty(name, libName) 
| Parameter | Description |
|:--- | :--- |
| *name* | Gets the value of the token property on a library token, or add-on. |
| *libName* | Name of the library token, or namespace of add-on. |
| | |

This is a Javascript wrapper for the MapTool function `getLibProperty`.

### setLibProperty(name, value, libName) 
| Parameter | Description |
|:--- | :--- |
| *name* | Name of the token property on a library token, or add-on. |
| *value* | Value of the token property. |
| *libName* | Name of the library token, or namespace of add-on. |
| | |

This is a Javascript wrapper for the MapTool function `setLibProperty`.

### getPlayerName() 
This is a Javascript wrapper for the MapTool function `getPlayerName`.

### isGM() 
This is a Javascript wrapper for the MapTool function `isGM`.

### getInfo(topic) 
| Parameter | Description |
|:--- | :--- |
| *topic* | The topic to retrieve information about. |
| | |

This is a Javascript wrapper for the MapTool function `isGM`.

### uuidv4()
This simple little function was found somewhere on the Internet, unfortunately I am unable to credit the actual author. 
But basically, it just generates a UUID, also known as a GUID. 
