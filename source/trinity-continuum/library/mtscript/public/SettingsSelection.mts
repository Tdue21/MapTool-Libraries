[h:assert(isGM() == 1, "Only available to GM.", 0)]

[h,switch(macro.args),code: 
	case "StartMap": {
		[h:maps  = getAllMapNames()]
		[h:maps  = listsort(maps,"N")]
		[h:start = tcc.readSetting("startMap")]
		[h:res   = input("start|"+maps+"|Start map|list|value=string select="+listfind(maps,start))]
		
		[h:abort(res)]
		[h:tcc.writeSetting("startMap",start)]
	};	
	case "Theme": {
		[h:themesJson = getLibProperty("Themes", tcc.getNamespace())]
		[h:themes     = json.fields(themesJson, ",")]
		[h:selected   = tcc.readSetting("theme")]
		[h:index      = listFind(themes,selected)]	
		[h:res        = input("selected|"+themes + "|Select theme|list|value=string select="+index)]

		[h:abort(res)]
		[h:tcc.writeSetting("theme", selected)]
	};
	case "Sources": {
		[h:sources   = tcc.getTraits("sources")]
		[h:selected  = tcc.readSetting("sources")]
		[h:inputText = ""]
		
		[h,foreach(source, json.fields(sources), ""),code:{
			[h:value=json.get(sources, source)]
			[h:inputText = listAppend(inputText, source + "|" + json.contains(selected, source) + "|" + value + "|CHECK", "##")]
		}]	

		[h:status = input(inputText)]
		[h:abort(status)]

		[h:selected=""]
		[h,foreach(source, json.fields(sources), ""),if(eval(source) == 1): selected = json.append(selected, source)]
		[h:tcc.writeSetting("sources", selected)]
	};
	default: {
	}]

[h,if(isDialogVisible("Settings")==1),code:{
[macro("Campaign Settings@" + getMacroLocation()):""]
};{}]