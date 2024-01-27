[h:assert(argCount() >= 1, "The first parameter of showBook must be action type (show, edit).", 0)]
[h:assert(argCount() >= 2, "The second parameter of showBook must be a notebook object.", 0)]

[h:action = arg(0)]
[h:notebook = arg(1)]

[html.dialog5("Notebook", "lib://" + dsnb.getNamespace() + "/notebook.html")]
