<!-- ##################################################################### -->
<!-- # All-in-one macro for handling traits. The default is a dialog,    # -->
<!-- # which shows all traits of one type in a table. Actions taken will # -->
<!-- # call back with one or more arguments:                             # -->
<!-- #	- dialogState: Determines how to act on macro call.              # -->
<!-- #  	- Possible values: <empty> | close | delete | show |         # -->
<!-- #                         edit | process                            # -->
<!-- #	- name: Name of the path being handled.                          # -->
<!-- ##################################################################### -->
[h:dialogName = "Manage Skills"]
[h:dialogArgs = "width=500;height=700;temporary=1;input=0;closebutton=0;noframe=0"]
[h:macroName  = dialogName + "@this"]
[h:traitName  = "skills"]
[h:collection = tcc.getTraits(traitName)]
[h:sources    = tcc.getTraits("sources")]
[h:ns         = tcc.getNamespace()]

[h,if(json.contains(macro.args, "name") == 1): name = json.get(macro.args, "name"); name = ""]
[h,if(name != ""): selected = json.get(collection, name); selected = "{}"]

<!-- ##################################################################### -->
<!-- # Determine dialogState                                             # -->
<!-- ##################################################################### -->
[h,if(macro.args == ""):dialogstate="";dialogstate=upper(json.get(macro.args, "dialogState"))]

<!-- ##################################################################### -->
<!-- # Closes the dialog                                                 # -->
<!-- ##################################################################### -->
[h,if("CLOSE" == dialogState),code:{
	[h,if(isDialogVisible(dialogName) == 1):closeDialog(dialogName)]
}]

<!-- ##################################################################### -->
<!-- # Process delete state                                              # -->
<!-- ##################################################################### -->
[h,if("DELETE" == dialogState),code:{
	[h:assert(isGM(), dialogName + ": Only GM may delete entries.",0)]

	[h:res=input("del|Do you wish to delete the trait '" + name + "'?|Delete|LABEL|SPAN=TRUE")];
	[h:abort(res)]

	[h:collection=json.remove(collection, name)]
	[h:tcc.setTraits(traitName, collection)]

	[h,macro(macroName):""]
}]

<!-- ##################################################################### -->
<!-- # Show details dialog with data                                     # -->
<!-- ##################################################################### -->
[h,if("SHOW" == dialogState),code:{	
	[h:source = json.get(selected, "source")]
	[h,if(json.contains(sources,source)):toolTip=json.get(sources,source);toolTip=""]
	
	[dialog5(dialogName, dialogArgs):{
	<!DOCTYPE html>
	<html>
	<head>
		<link rel="stylesheet" type="text/css" href="lib://[r:tcc.getNamespace()]/css/[r:tcc.getTheme()].css">
		<link rel="stylesheet" type="text/css" href="lib://[r:tcc.getNamespace()]/css/main.css">
		<title>Trait Details - [r:name]</title>
	</head>
	<body>
		<ul class="menu">
			<li>[r:macroLink("Close",macroName, "",json.set("{}","dialogState",""))]</li>
			<li>[r:macroLink("Edit",macroName, "",json.set("{}","dialogState","edit","name",name))]</li>
		</ul>

		<div class="showTrait">
			<h3>[r:name] <span>[r:capitalize(json.get(selected,"type"))]</span></h3>
			[r:markdownToHTML(json.get(selected,"description"))]
			<p><b>Example connections:&nbsp;</b>[r:json.toList(json.get(selected,"connections"), ", ")]</p>
			<p><b>Skills:&nbsp;</b>[r:json.toList(json.get(selected,"skills"), ", ")]</p>
			<p><b>Edges:&nbsp;</b>[r:json.toList(json.get(selected,"edges"), ", ")]</p>
			<p><b>Source:&nbsp;</b><span class="tooltip">[r:json.get(selected, "source")]
				<span class="tooltiptext">[r:tooltip]</span>
				</span>
			</p>
		</div>
	</body>
	</html>
	}]
}]

<!-- ##################################################################### -->
<!-- # Show edit dialog for data                                         # -->
<!-- ##################################################################### -->
[h,if("EDIT" == dialogState),code:{
	[h:assert(isGM(), dialogName + ": Only GM may edit entries.",0)]
	[h:tcc.debugLog("Selected: " + selected)]
	[h:type       = if(selected == "", "", json.get(selected, "type"))]
	[h:description= if(selected == "", "", json.get(selected,"description"))]
	[h:connections= if(selected == "", "", json.toList(json.get(selected,"connections"),", "))]
	[h:skills     = if(selected == "", "", json.toList(json.get(selected,"skills"),", "))]
	[h:edges      = if(selected == "", "", json.toList(json.get(selected,"edges"),", "))]
	[h:source     = if(selected == "", "", json.get(selected,"source"))]

	[dialog5(dialogName, dialogArgs):{
	<!DOCTYPE html>
	<html>
	<head>
		<link rel="stylesheet" type="text/css" href="lib://[r:tcc.getNamespace()]/css/[r:tcc.getTheme()].css">
		<link rel="stylesheet" type="text/css" href="lib://[r:tcc.getNamespace()]/css/main.css">
		<title>Edit Trait - [r:name]</title>
	</head>
	<body>
		[h:processLink=macroLinkText(macroName,"")]
		<form id="editForm" action="[r:processLink]" method="json">
			<ul class="menu">
				<li><a href="#" onclick="document.getElementById('editForm').submit()">Save</a></li>
				<li>[r:macroLink("Cancel", macroName, "", json.set("{}","dialogState","show","name",name))]</li>
				<li>
					<div class="tooltip">Help
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
			<div class="showTrait">
				<label for="name">Name</label><br>
				<input id="name" name="name" type="text" value="[r:name]"><br>
				
				<label for="type">Name</label><br>
				<select id="type" name="type"> 
					<option value="origin"  [r,if(type == "origin" ):"selected";""]>Origin</option>
					<option value="role"    [r,if(type == "role"   ):"selected";""]>Role</option>
					<option value="society" [r,if(type == "society"):"selected";""]>Society</option>
				</select><br>

				<label for="description">Description</label><br>
				<textarea id="description" name="description">[r:description]</textarea><br>
				
				<label for="connections">Possible Connections</label><br>
				<input id="connections" name="connections" type="text" value="[r:connections]"><br>
		
				<label for="skills">Skills</label><br>
				<input id="skills" name="skills" type="text" value="[r:skills]"><br>
		
				<label for="edges">Edges</label><br>
				<input id="edges" name="edges" type="text" value="[r:edges]"><br>
		
				<label for="source">Source</label><br>
				<select id="source" name="source">
					[r,foreach(src,json.fields(sources),""),code:{
						[h:sourceValue=json.get(sources,src)]						
						<option value="[r:src]" [r,if(src == source):"selected"]>[r:sourceValue]</option>						
						[h:'']
					}]
				</select><br>
			<div>
			<input name="dialogState" type="hidden" value="process">
			<input name="oldName" type="hidden" value="[r:name]">
		</form>
		
[r:'
<script>
	function submitForm() {
		document.getElementById("editForm").submit();
	}
</script>
']
	</body>
	</html>
	}]
	[h:'']	
}]

<!-- ##################################################################### -->
<!-- # Process trait changes state                                       # -->
<!-- ##################################################################### -->
[h,if("PROCESS" == dialogState),code:{
	[h:oldName = json.get(macro.args, "oldName")]
	[h,if(json.contains(collection, oldName)):trait=json.get(collection, oldName);trait=""]
	
	[h:trait=json.set(trait, "name",        json.get(macro.args, "name"))]
	[h:trait=json.set(trait, "type",        json.get(macro.args, "type"))]
	[h:trait=json.set(trait, "description", json.get(macro.args, "description"))]
	[h:trait=json.set(trait, "connections", json.fromList(json.get(macro.args, "connections"), ","))]
	[h:trait=json.set(trait, "skills",      json.fromList(json.get(macro.args, "skills"),","))]
	[h:trait=json.set(trait, "edges",       json.fromList(json.get(macro.args, "edges"),","))]
	[h:trait=json.set(trait, "source",      json.get(macro.args, "source"))]
		
	[h,if(oldName != "" && oldName != name):collection = json.remove(collection, oldName)]
	[h:collection=json.set(collection, name, trait)]
	[h:tcc.setTraits(traitName,collection)]
	
	[h,if(isDialogVisible(dialogName) == 1),macro(macroName):json.set("{}","dialogState","show","name",name)]
}]

<!-- ##################################################################### -->
<!-- Reload dialog if returning from substate                            # -->
<!-- ##################################################################### -->
[h,if(dialogState != ""),code:{
	[h:abort(0)]
}]

<!-- ##################################################################### -->
<!-- Default state: Showing list of traits                               # -->
<!-- ##################################################################### -->
[dialog5(dialogName, dialogArgs):{
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="lib://[r:tcc.getNamespace()]/css/[r:tcc.getTheme()].css">
	<link rel="stylesheet" type="text/css" href="lib://[r:tcc.getNamespace()]/css/main.css">
	<script src="lib://[r:tcc.getNamespace()]/js/sortTable.js"></script>
<title>Traits List</title>
</head>
<body>
	<ul class="menu">
		<li>[r:macroLink("Close",macroName, "",json.set("{}","dialogState","close"))]</li>
		<li>[r:macroLink("Add", macroName, "", json.set("{}", "dialogState","edit","name","","add", 1))]</li>
	</ul>

	<div style="padding:5px;padding-right:10px">
	<table id="traitsTable" class="table">
		<tr>
			<th onclick="sortTable('traitsTable', 0)">Name</td>
			<th onclick="sortTable('traitsTable', 1)">Type</td>
			<th onclick="sortTable('traitsTable', 2)">Source</td>
			<th>Delete</td>
		</tr>
		<tr>
			[h:fields=json.fields(collection)]
			
			[r,foreach(field, fields, "</tr><tr>"),code:{
				[h:path=json.get(collection, field)]
				
				<td>[r:macroLink(field,macroName, "", json.set("{}","dialogState","show","name",field))]</td>
				<td>[r:capitalize(json.get(path,"type"))]</td>
				<td>[r:json.get(path,"source")]</td>
				<td>
					[h:linkText=macroLinkText(macroName, "", json.set("{}","dialogState","delete","name",field))]
					<a href="[r:linkText]"><img width="24" height="24" src="[r:tcc.getImage('icons/trashcan.png')]"></a>
				</td>
			}]
		</tr>
	</table>
	</div>
</body>
</html>
}]