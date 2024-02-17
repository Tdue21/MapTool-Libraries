[h:assert(json.length(macro.args) > 0, "Missing the notebook parameter.", 0)]

[h:data     = json.get(macro.args, 0)]
[h:ns       = dsnb.getNamespace()]
[h:notebook = base64.decode(data)]

[h:title    = json.get(notebook, "title")]
[h:books    = getLibProperty("notebooks", ns)]
[h:book     = dsnb.getRecord(books, "title", title)]
[h:index    = json.indexOf(books, book)]

[if(index == -1), code:{
    [h:books = json.append(books, notebook)]
};{
    [h:books = json.set(books, index, notebook)]
}]

[h:setLibProperty("notebooks", books, ns)]