[h:assert(isGM() == 1, "Only available to GM.", 0)]
[h:ns=tcc.getNamespace()]

[dialog5("Settings", "width=350; height=600; temporary=0; noframe=0; input=1"):{
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="[r:tcc.getFile('css/' + tcc.getTheme() + '.css')]">
	<link rel="stylesheet" type="text/css" href="[r:tcc.getFile('css/main.css')]">
	<title>Settings</title>
</head>
<body>
	<div style="margin:5px;margin-right:10px">

	<table class="settings">
		<caption>General</caption>
		<tr>
			<td>[r:macroLink("About", "About@this")]</td>
			<td>v[r:tcc.getVersion()]</td>
		</tr>
		<tr>
			<td>[r:macroLink("Starting Map", "SettingsSelection@this","","StartMap")]</td>
			<td>[r:tcc.readSetting("startMap")]</td>
		</tr>
		<tr>
			<td>[r:macroLink("Theme", "SettingsSelection@this","","Theme")]</td>
			<td>[r:tcc.readSetting("theme")]</td>
		</tr>
		<tr>
			<td>[r:macroLink("Sources", "SettingsSelection@this","","Sources"))]</td>
			<td>[r:listCount(json.toList(tcc.readSetting("sources")))] selected.</td>
			</tr>
		<tr>
			<td>[r:macroLink("Welcome Message", "Change Settings Property@this","",json.set("{}","field","welcomeMessage"))]</td>
			<td>&nbsp;</td>
		</tr>
	</table>

	<table class="settings">
		<caption>Manage Traits</caption>
		<tr>
			<td>[r:macroLink("Paths", "Manage Paths@this", "", "")]</td>
			<td>
				[h:traits=tcc.getTraits("paths")]
				[r:listCount(json.toList(json.fields(traits)))]
			</td>
		</tr>
		<tr>
			<td>[r:macroLink("Edges", "Manage Edges@this", "", "")]</td>
			<td>
				[h:traits=tcc.getTraits("edges")]
				[r:listCount(json.toList(json.fields(traits)))]
			</td>
		</tr>
		<tr>
			<td>[r:macroLink("Skills", "Manage Skills@this", "", "")]</td>
			<td>
				[h:traits=tcc.getTraits("skills")]
				[r:listCount(json.toList(json.fields(traits)))]
			</td>
		</tr>
		<tr>
			<td>[r:macroLink("Attributes", "Manage Attributes@this", "", "")]</td>
			<td>
				[h:traits=tcc.getTraits("attributes")]
				[r:listCount(json.toList(json.fields(traits)))]
			</td>
		</tr>
	</table>

	<table class="settings">
		<caption>Compendium</caption>
		<tr>
			<td>[r:macroLink("Dramatis Personae", "Manage Dramatis Personae@this", "", "")]</td>
			<td>
				[h:personae=getLibProperty("Personae", getMacroLocation())]
				[r:json.length(personae)]
			</td>
		</tr>
	</table>
	</div>

</body>
</html>


}]