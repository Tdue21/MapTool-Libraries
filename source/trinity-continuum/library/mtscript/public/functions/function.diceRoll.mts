[h:dicePool  = arg(0)]
[h:dice      = arg(1)]
[h:results   = ""]
[h:success   = 0]
[h:botches   = 0]
[h:text      = ""]
[h:degree    = ""]
[h:index     = 0]
[h:img       = tableImage("Images",2,36)]

[h:tokenName = getSelectedNames()]
[h,if(tokenName == ""):tokenName=if(isGM(), "GM", getPlayerName())]

[h:cell="border:2px solid #444;border-right-color:#ccc;border-bottom-color:#ccc;padding:4px;padding-bottom:3px;background-color:#eee"]
[h:style=strformat("vertical-align:middle;display:inline-block;background:transparent url(%{img}) no-repeat center;" + 
		"width:32px; height:32px;font-weight:bold; text-align:center; border:0px solid gray;padding:5px")]         
[h:tableStyle="width:250px;border: 4px solid #ccc;border-right-color: #444; border-bottom-color: #444; background-color:#888"]
[h:resultStyle="border:2px solid black;text-align:center;padding:5px;font-weight:bold;background-color:"]

[h:output = strformat('
<table style="%{tableStyle}">
	<tr>
		<td style="%{cell}">
			<b>%{tokenName}</b> rolls <b>%{dicePool}:</b>
		</td>
	</tr>
	<tr>
		<td style="%{cell}">
			<table>
				<tr>
')];

[r,count(dice),code:{
	[h:roll=eval("1d10")]
	[h:results = json.append(results, roll)]
	[h,if(roll >= 7):success = success + 1]
	[h,if(roll == 1):botches = botches + 1]

	[h:color = json.get(getTableEntry("rollColor", roll), "value")]
	[h:output=output+strformat('
		<td style="%{style}">
			<span style="margin:auto"><font color="%{color}">%{roll}</font></span>
		</td>
	')];
	
	[h:index = index + 1]
	[if(index > 5),code:{
		[h:output=output+'</tr><tr>'];
		[h:index = 0]
	}]	
}]
[h:output=output+'</tr></table></td></tr><tr><td><span>Which is a</span>&nbsp;']

[if(success == 0),code:{
	[if(botches >= 1),code:{
		[h:'<!-- Roll was a botch -->']
		[h:resultStyle=resultStyle+"red;color:black"]
		[h:entry=if(botches > 5, 5, botches)]
		[h:degree=json.get(getTableEntry("RollDegrees", entry), "value")]
		[h:degree=json.get(degree,"botch")]
		[h:text=degree + " botch (" + botches + ")!"]
	};{
		[h:'<!-- Roll was a failure -->']
		[h:resultStyle=resultStyle+"gray;color:white"]	
		[h:text="failure..."]
	}]
};{
	[h:'<!-- Roll was a success -->']
	[h:resultStyle=resultStyle+"green;color:white"]			
	[h:text="success" + getTableEntry("RollDegrees", success)]
	[h:entry=if(success > 5, 5, success)]
	[h:degree=json.get(getTableEntry("RollDegrees", entry), "value")]
	[h:degree=json.get(degree,"success")]
	[h:text=degree + " success (" + success + ")!"]
}]
[h:output=output+strformat('<span style="%{resultStyle}">%{text}</span></td></tr></table>')];

[h:broadcast(output)]
[h:playClip("https://raw.githubusercontent.com/rtakehara/5e-Framework/master/Resources/Audio%20Clips/Dice%209.wav", 1, 1)]
