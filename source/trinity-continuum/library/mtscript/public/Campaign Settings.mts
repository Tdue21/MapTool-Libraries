[h:assert(isGM() == 1, "Only available to GM.", 0)]
[h:ns=tcc.getNamespace()]
[dialog5("Settings", "width=350; height=600; temporary=0; noframe=0; input=1"):{
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="lib://" + ns + "/css/[r:tcc.getTheme()].css">
	<link rel="stylesheet" type="text/css" href="lib://" + ns + "/css/main.css">
	<title>Settings</title>
</head>
<body>
<div style="margin:5px;margin-right:10px">
<table class="settings">
	<caption>General</caption>
	<tr>
		<td>[r:macroLink("About","About@Lib:Core")]</td>
		<td>v[r,token("Lib:Core"):getProperty("libversion")]</td>
	</tr>
	<tr>
		<td>[r:macroLink("Starting Map","SettingsSelection@Lib:Core","","StartMap")]</td>
		<td>[r:tcc.readSetting("startMap")]</td>
	</tr>
	<tr>
		<td>[r:macroLink("Theme","SettingsSelection@Lib:Core","","Theme")]</td>
		<td>[r:tcc.readSetting("theme")]</td>
	</tr>
	<tr>
		<td>[r:macroLink("Welcome Message","Change Settings Property@Lib:Core","",json.set("{}","field","welcomeMessage"))]</td>
		<td>&nbsp;</td>
	</tr>
</table>

<table class="settings">
	<caption>Character Sheet</caption>
	<tr>
		<td>[r:macroLink("Paths", "Manage Paths@Lib:Core", "", "")]</td>
		<td>
			[h:traits=tcc.getTraits("paths")]
			[r:listCount(json.toList(json.fields(traits)))]
		</td>
	</tr>
	<tr>
		<td>[r:macroLink("Edges", "Manage Edges@Lib:Core", "", "")]</td>
		<td>
			[h:traits=tcc.getTraits("edges")]
			[r:listCount(json.toList(json.fields(traits)))]
		</td>
	</tr>
	<tr>
		<td>[r:macroLink("Skills", "Manage Skills@Lib:Core", "", "")]</td>
		<td>
			[h:traits=tcc.getTraits("skills")]
			[r:listCount(json.toList(json.fields(traits)))]
		</td>
	</tr>
	<tr>
		<td>[r:macroLink("Attributes", "Manage Paths@Lib:Core", "", "")]</td>
		<td>
			[h:traits=tcc.getTraits("attributes")]
			[r:listCount(json.toList(json.fields(traits)))]
		</td>
	</tr>
</table>
</div>

</body>
</html>


}]