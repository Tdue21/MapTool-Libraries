[dialog5("About","width=420;height=340;temporary=1;noframe=0;input=1"):{
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="[r:tcc.getFile('css/main.css')]">
</head>
<body style="margin:10px">
    <div style="margin:auto;width:80%;margin-top:10px;margin-bottom:10px">
        <img src="[r:tcc.getImage('TrinityContinuum.png')]" alt="Trinity Continuum" style="margin:auto;width:300px">
    </div>
    <p>
        <i>Trinity Continuum</i> is &copy; 2019 Onyx Path Publishing and all rights are reserved. 
        This <i>MapTool</i> Framework is a work dedicated to this fantastic roleplaying game. 
        No violation of copyrights or trademarks are intended. 
    </p>
    <table style="width:100%;border-spacing:0px;border-collapse:collapse">
        <tr>
            <td><b>MapTool Version:</b> [r:json.get(getInfo("client"),"version")]</td>
            <td style="text-align:right"><a href="#">Check for Latest Version</a></td>
        </tr>
        <tr>
            <td><b>Framework Version:</b> [r:tcc.getVersion()]</td>
            <td style="text-align:right"><a href="#">Report a bug</a></td>
        </tr>
    </table>
    </p>
</body>
</html>  
}]    