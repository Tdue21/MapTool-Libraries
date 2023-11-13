[r:namespace="net.dovesoft.notebook"]

[h:data = data.getStaticData(namespace, "/public/data/userguide.json")]
[h:setLibProperty("notebooks", data, namespace)]

[h:broadcast("onFirstInit loaded")] 
