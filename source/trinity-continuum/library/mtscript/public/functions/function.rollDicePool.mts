[h:dice      = arg(0)]
[h:target    = arg(1)]
[h:results   = ""]
[h:rresults  = ""]
[h:rerolls   = 0]
[h:success   = 0]
[h:botches   = 0]

[h,count(dice),code:{
	[h:roll    = eval("1d10")]
	[h:results = json.append(results, roll)]
	[h,if(roll == 10)    : rerolls = rerolls + 1]
	[h,if(roll >= target): success = success + 1]
	[h,if(roll == 1)     : botches = botches + 1]
}]

[h,while(rerolls > 0),code:{
	[h:rerolls = rerolls - 1]
	[h:roll    = eval("1d10")]
	[h:rresults = json.append(rresults, roll)]

	[h,if(roll == 10)    : rerolls = rerolls + 1]
	[h,if(roll >= target): success = success + 1]
}]

[h:result = json.set("", "successes", success, "botches", botches, "result", results, "rerolls", rresults)]
[r:result]
