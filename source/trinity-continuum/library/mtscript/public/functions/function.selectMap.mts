[h,if(json.type(macro.args)=="UNKNOWN"):map=macro.args;map=json.fields(macro.args)]

[h:setCurrentMap(map)]

[h:bgTokens = getTokens(",",json.set("{}", "layer", json.append("[]","BACKGROUND")))]
[h:token=listGet(bgTokens,0)]

[h:top=getTokenY(1,token)]
[h:left=getTokenX(1,token)]
[h:right=getTokenWidth(token)+left]
[h:bottom=getTokenHeight(token)+top]

[h:setViewArea(left,top,right,bottom,1,1)]

[h:goto(0,0)]
[h:setZoom(1)]

[h:overValue=json.get(macro.args,map)]
[h,if(overValue==""),code:{};{
	[h,macro("Mini Menu@Lib:Core"):""]
}]