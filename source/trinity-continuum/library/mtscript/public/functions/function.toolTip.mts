[h:traitGroup = arg(0)]
[h:traitName  = arg(1)]

[h:groupData=tcc.getTraits(traitGroup)]
[h:traitData=json.get(groupData,traitName)]
[h:description=json.get(traitData,"description")]

<div class="tooltip">
	[r:traitName]
	<span class="tooltiptext">
		<!-- h:description=replace(description,"\\n","<br>&nbsp;&nbsp;")] -->
		[r:markdownToHTML(description, "GITHUB")]
	</span>
</div>