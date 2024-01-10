[h:assert(isGM() == 1, "Only available to GM.", 0)]

[h,switch(macro.args),code: 
	case "StartMap": {
		[h:maps=getAllMapNames()]
		[h:maps=listsort(maps,"N")]
		[h:start=aeon.readSetting("startMap")]
		[h:res=input("start|"+maps+"|Start map|list|value=string select="+listfind(maps,start))]
		[h:abort(res)]
		[h:aeon.writeSetting("startMap",start)]
	};	
	case "Theme": {
		[h:themesJson=getLibProperty("Themes", "Lib:Data")]
		[h:themes=json.fields(themesJson, ",")]
		[h:selected=aeon.readSetting("theme")]
		[h:index=listFind(themes,selected)]	
		[h:res=input("selected|"+themes + "|Select theme|list|value=string select="+index)]
		[h:abort(res)]
		[h:aeon.writeSetting("theme", selected)]
	};
	case "Display": {

	};
	default: {
	}]

[h,if(isDialogVisible("Settings")==1),code:{
[macro("Campaign Settings@lib:Core"):""]
};{}]