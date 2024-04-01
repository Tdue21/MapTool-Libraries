<!-- 
   UDF by: AliasMask 
   https://discord.com/channels/296230822262865920/296657960720007169/1036004905015574579

   record.get(records,key,value,...): object/records
   
   records - A json array of objects where the objects have the same keys in each array element
   key - Main key name that makes record unique. The value of key is unique.
   value - value to find index of   
   object/records - the full object of the record or an array of multiple matching records or none
   
AM 11-25-21
   This function will return the object of a set of records where a key/value combo can be found.

Updates
   AM 10-27-22 - updated to use multiple keys to find match
-->

[H: assert(math.isOdd(argCount()),"<b color=red>record.get(records,key,value,...) must have matching pairs of key and value.</b>",0)]

[H: readCondition = ""]
[H, for(i,1,argCount(),2): readCondition = json.append(readCondition,strformat("\$[?(@.['%s'] == '%s')]",arg(i),arg(i+1)))]

[H: records = json.path.read(arg(0),json.toList(readCondition," && "),"ALWAYS_RETURN_LIST,SUPPRESS_EXCEPTIONS")]

[H, if(json.length(records) == 1): macro.return = json.get(records,0); macro.return = records]