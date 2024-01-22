
[h:data = data.getStaticData(tcc.getNamespace(), "public/data/personae.json")]
[h:sgc = json.get(data, 4)]
[h:options=json.set("{}", "action", "show", "data", sgc)]

[h:html.frame5("Stat Block", "lib://" + tcc.getNamespace() + "/statblock.html", "value=" + options)]