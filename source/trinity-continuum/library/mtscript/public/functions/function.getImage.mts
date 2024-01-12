[h:assert(argCount() == 1, "You must supply an image name.", 0)]
[h:imageName = arg(0)]
[h:ns = tcc.getNamespace()]
[r:"lib://" + ns + "/images/" + imageName]