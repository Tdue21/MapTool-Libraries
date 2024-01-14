[h:maps          = listsort(getAllMapNames(), "N")]
[h:processorLink = macroLinkText("functions/function.selectMap@this","")]

[dialog5("Select Map", "width=240; height=400; temporary=1; input=1; noframe=0"):{
    <!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" type="text/css" href="[r:tcc.getFile('css/' + tcc.getTheme() + '.css')]">
        <link rel="stylesheet" type="text/css" href="[r:tcc.getFile('css/main.css')]">    
    </head>
    <body>
        <form action = "[r:processorLink]" method="json">
            [r, foreach(map, maps, ""), code: {
                <div style="width:200px;margin:10px;margin-bottom:0px;margin-top:5px;padding:0px">
                    [h: mapVisible = getMapVisible(map)]
                    [h: hidden = if(mapVisible == 0 && isGM() == 1, "<img style='margin:auto; padding:0px; height: 16px; width: 16px; vertical-align:center' src='" + tcc.getImage("icons/hidden.png") + "'>", "")]
                    [r, if(isGM() == 1 || mapVisible == 1): '<button style="width:200px" type="submit" name="' + map + '" value="' + map + '">' + hidden + "&nbsp;" + map + "</button>"]
                </div>
            }]
        </form>
    </body>
    </html>
}]