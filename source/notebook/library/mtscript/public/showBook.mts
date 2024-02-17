[h:dsnb.debugLog(argCount())]
[h:dsnb.debugLog(macro.args)]

[h:assert(json.length(macro.args) > 0, "The first parameter of showBook must be action type (show, edit).", 0)]
[h:assert(json.length(macro.args) > 1, "The second parameter of showBook must be a notebook object.", 0)]

[h:action   = json.get(macro.args, 0)]
[h:nb       = json.get(macro.args, 1)]
[h:asFrame  = if(json.length(macro.args) > 2, json.get(macro.args, 2), 0)]
[h:ns       = dsnb.getNamespace()]

[if(nb == ''), code:{
    [h:notebook = json.set("{}", "title", "New notebook", "summary", "", "owner", getPlayerName(), "private", json.false, "readonly", json.false, "pages", "[]")]
};{
    [h:notebook = base64.decode(nb)]
}]
[h:broadcast("<pre>" + json.indent(notebook) + "</pre>")]

[h:data     = json.set("{}", "action", action, "notebook", notebook)]

[h:title = "Notebook - " + json.get(notebook, "title")]
[h:options = "width=800; height=600; temporary=1; noframe=0; input=1; value=" + base64.encode(data))]

[h,if(asFrame): 
    html.frame5(title, "lib://" + ns + "/notebook.html", options); 
    html.dialog5(title , "lib://" + ns + "/notebook.html", options)]