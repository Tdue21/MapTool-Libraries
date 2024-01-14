[h:ns         = tcc.getNamespace()]
[h:welcome    = decode(tcc.readSetting("welcomeMessage"))]
[h:playerName = getPlayerName()]
[h:mtVersion  = json.get(getInfo("client"),"version")]
[h:fwVersion  = tcc.getVersion()]
[h:image      = tcc.getImage("TrinityContinuum.png")]


[h:html=markdownToHTML(welcome)]
[h:html=replace(html, "<a href=","<font color='#274CBC' style='text-decoration:none'><a href=")]
[h:html=replace(html, "</a>","</a></font>")]
[h:html=replace(html, "<ul>","<ul style='margin-left:15px;margin-bottom:0px'>")]
[h:html=replace(html, "<ol>","<ol style='margin-left:15px;margin-bottom:0px'>")]

[h:html=strformat('
<div style="background-color: #96B7D9;border: 2px solid #005b7f; border-top-width: 1px; border-left-width: 1px; margin:5px; padding:5px">
<h1 style="text-align:center; border-bottom: 2px solid #005b7f; font-size: 16px;margin-bottom:5px;margin-top:3px">Welcome, %{playerName}!</h1>
<image src="%{image}" width="300" align="center"></image>
%{html}
<br>
<b>MapTool Version:</b> %{mtVersion}<br>
<b>Framework Version: </b> %{fwVersion}</div>')]

[h:broadcast(html,"self")]