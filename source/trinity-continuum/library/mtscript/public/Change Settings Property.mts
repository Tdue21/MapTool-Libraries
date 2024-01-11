[h:doProcess = json.get(macro.args, "doProcess")]
[h:fieldName=json.get(macro.args,"field")]

[h,if(doProcess == "1"),code:{
	[h:delete=json.get(macro.args,"delete")]
	[h:cancel=json.get(macro.args,"cancel")]
	[h:cancel=if(cancel=="cancel",0,1)]
	[h:abort(cancel)]

	[h:value=json.get(macro.args,"value")]
	[h:value=replace(value,"\\s*\$","")]
	[h:tcc.writeSetting(fieldName, encode(value))]

	[h,if(isDialogVisible("Settings")==1),code:{
		[macro("Campaign Settings@this"):""]
	};{}]
	[h:return(0)]	
}]

[h:fieldValue=decode(tcc.readSetting(fieldName))]

[dialog5(fieldName + " - Edit", "width=650; height=535; temporary=1; input=1; noframe=0"): {
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="lib://[r:tcc.getNamespace()]/css/[r:tcc.getTheme()].css">
	<link rel="stylesheet" type="text/css" href="lib://[r:tcc.getNamespace()]/css/main.css">
</head>
<body>
	[h: processorLink = macroLinkText("Change Settings Property@this", "")]
	<form id="propForm" action="[r:processorLink]" method="json">
		<ul class="menu">
			<li><input type="submit" name="button" value="Save"></li>
			<li><input type="submit" name="cancel" value="Cancel"></li>
			<li><div class="tooltip">Help
				<span class="tooltiptext">
					<span style="font-size:1.6em"># Heading</span><br>
					<span style="font-weight:bold">**Bold**</span><br>
					<span style="font-style:italic">*Italic*</span><br>
					<span style="text-decoration:underline">_underline_</span><br>
					<span style="text-decoration:line-through">~~strikethrough~~</span><br>
					<span style="text-decoration:underline">&#91;link&#93;(url)</span><br>
				</span>
			</li>
		</ul>
		
		<textarea name="value" style="width:100%;height:100%;box-sizing:border-box">[r:fieldValue]</textarea>
		<input type="hidden" name="field" value="[r:fieldName]">
		<input type="hidden" name="doProcess" value="1">
	</form>
</body>
</html>
}]