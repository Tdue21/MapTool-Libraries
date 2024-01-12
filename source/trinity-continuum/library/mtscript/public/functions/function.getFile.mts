[h:assert(argCount() == 1, "You must supply a file name.", 0)]
[h:fileName = arg(0)]
[h:ns = tcc.getNamespace()]
[r:"lib://" + ns + "/" + fileName]