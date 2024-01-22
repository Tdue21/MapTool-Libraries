[h:outputPC=tcc.readSetting("outputPC")]
[h:outputGM=tcc.readSetting("outputGM")]
[h:output=if(isGM()==1,outputGM,outputPC)]

[h:info=getInfo("client")]

[overlay("Framework Macros","zorder=4;"):{
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="[r:tcc.getFile('css/overlay.css')]">
</head>
<body>
	<div class="menu">
		<!-------------------Map------------------->
		[h:maps=listsort(getAllMapNames(),"N")]
		[h:visibleMaps=maps]
		[h,foreach(map,maps,""),code:{
			[h,if(getMapVisible(map) == 1):"";visibleMaps=listdelete(visibleMaps,listfind(visibleMaps,map))]				
		}]
		[h,if(isGM()==1):maps=maps;maps=visibleMaps]			
		[h:maps=listsort(maps,"N")]
		[h:image=tcc.getImage("icons/globe.png")]
		[h:hidden=tcc.getImage("icons/hidden.png")]

		[r:macroLink(strformat("<img class='i32' src='%{image}'>"),"Select Map@" + getMacroLocation())]
		<div class="submenu">
			<table class="border">
				<tr>
				[r,foreach(map, maps,"</tr><tr>"),code:{
					<td>
						[r,if(map == getCurrentMapName()):"<b>";""]
						<span>
							[r:macroLink(map, "functions/function.selectMap@" + getMacroLocation(), "", json.fromStrProp(map+"=overlay"))]
							[r,if(getMapVisible(map) == 0):"<img style='width: 16px; height: 16px;' src="+hidden+">"; ""]
						</span>	
						[r,if(map == getCurrentMapName()):"</b>";""]
					</td>
				}]
			</tr>
			</table>
		</div>
	</div>
</body>
</html>
}]