[h:assert(argCount() == 2, "This function requires two version strings as input.")]

[h:'<!-- extract function arguments and convert to json arrays -->']
[h:first = json.fromList(arg(0), "\\.")]
[h:second = json.fromList(arg(1), "\\.")]
[h:firstLength = json.length(first)]
[h:secondLength = json.length(second)]

[h:'<!-- Pad first array if its length is less than the second -->']
[while(firstLength < secondLength),code:{
	[h:first = json.append(first, 0)]	
	[h:firstLength = json.length(first)]
}]

[h:'<!-- Pad second array if its length is less than the first -->']
[while(firstLength > secondLength),code:{
	[h:second = json.append(second, 0)]
	[h:secondLength = json.length(second)]
}]

[h:'<!-- Compare the array values, position by position. -->']
[h:'<!-- If different, return -1 if first is greater, and 1 if second is greater. -->']
[for(index, 0, firstLength), code: {
	[h:firstElement = number(json.get(first, index))]
	[h:secondElement = number(json.get(second, index))]
	[h,if(secondElement > firstElement): return(0, 1)]
	[h,if(secondElement < firstElement): return(0, -1)]
}]

[h:'<!-- Return 0 if both arrays are identical after padding -->']
[h: return(0, 0)]