[h: namespace     = nb.getNamespace()]
[h: playerName    = getPlayerName()]
[h: notebooks     = getLibProperty("notebooks", nb.getNamespace())]
[h: asFrame       = number(nb.getUserOption(playerName, "asFrame", "0"))]
[h: pageData      = data.getStaticData(namespace, "public/html/library.html")]
[h: isChecked     = if(asFrame == 1, "checked", "")]
[h: notebooksList = ""]

[h,foreach(book, notebooks, ""), code: {

    [h:broadcast("<pre>" + json.indent(book) + "</pre>")]

    [h: private  = json.get(book, "isPrivate") == "true"]
    [h: readonly = json.get(book, "readonly") == "true"]
    [h: owner    = json.get(book, "owner")]
    [h: doNotShow = private && owner != playerName && !isGM()]

    [if(!doNotShow), code: {

        [h: accent   = json.get(book, "accent")]
        [h: title    = json.get(book, "title")]
        [h: summary  = json.get(book, "summary")]
        [h: summary  = if(length(summary) > 100, substring(summary, 0, 97) + "...", summary)]
        [h: icons    = if(private, '<img src="lib://' + namespace + '/images/key.png" title="Private notebook" width="16px">', "")]
        [h: icons    = icons + if(readonly, '<img src="lib://' + namespace + '/images/locked.png" title="Read only notebook" width="16px">', "")]

        [h: notebooksList = notebooksList + strformat('
        
        <button class="button" title="%{summary}">
            <p style="--accent-bg:%{accent}" class="accent">
                <span>%{title}</span>
                <span>By: %{owner}</span>
            </p>            
            %{icons}
        </button>
        ')]
    }]
}]

[h: broadcast("<pre>" + replace(notebooksList, "<", "&lt;") + "</pre>")]

[h:pageData = evalMacro(pageData)]
[h:log.info(pageData)]

[frame5("Notebooks Library", "width=260;height=500;temporary=1;noframe=0;input=1"): {
    [r:pageData]
}]
