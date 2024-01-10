<!-- ##################################################################### -->
<!-- # All-in-one macro for character creation.                          # -->
<!-- ##################################################################### -->
[h:dialogName="Character Wizard"]
[h:macroName=dialogName+"@Lib:Core"]

[Dialog5(dialogName, "Height=600; Width=800; Temporary=1; noframe=0; input=1"):{
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="[r:aeon.getTheme()].css@Lib:Core">
	<link rel="stylesheet" type="text/css" href="main.css@Lib:Core">
	<link rel="stylesheet" type="text/css" href="charwiz.css@Lib:Core">
	<title>Character Wizard</title>
</head>
<body>
[r:'
<script>
	let page = 0;
    const maxPage = 7;

	function flipPage(step){
		page += step;
        page = Math.min(maxPage, Math.max(0, page));

        const headers = [...document.getElementsByClassName("header")];
        headers.forEach(header => header.classList.remove("focus"));
        document.getElementById("header"+page).classList.add("focus");		

        const pages = [...document.getElementsByClassName("page")];
        pages.forEach(page => page.style.display="none");
        document.getElementById("page"+page).style.display="block";

        const prevButton = document.getElementById("prevButton");
        if(page === 0) {
            prevButton.setAttribute("disabled", "");
        } else {
            prevButton.removeAttribute("disabled");
        }

        const nextButton = document.getElementById("nextButton");
        if(page === maxPage) {
            nextButton.setAttribute("disabled", "");
        } else {
            nextButton.removeAttribute("disabled");
        }
	}
</script>
']

<table style="width:99%;height:97%">
	<tr>
		<td style="width:25%;background-color:#dedede;vertical-align:top">
			<span id="header0" class="header focus">Introduction</span><br>
			<span id="header1" class="header">Step One: Concept</span><br>
			<span id="header2" class="header">Step Two: Paths</span><br>
			<span id="header3" class="header">Step Three: Skills</span><br>
			<span id="header4" class="header">Step Four: Attributes</span><br>
			<span id="header5" class="header">Step Five: Apply Template</span><br>
			<span id="header6" class="header">Step Six: Finishing Touches</span><br>
			<span id="header7" class="header">Completion</span><br>
		</td>

		<td style="width:75%">
            <div id="page0" class="page" style="display: block">
            	<h1>Introduction</h1>
            	<p>This is the character creation wizard. This will guide you through the 
            	character creation process of the Storypath system, specifically for the <i>Trinity Continuum</i>
            	universe.</p>
            </div>
            <div id="page1" class="page" style="display: none">
            	<h1>Step One: Concept</h1>
            	<label for="character">Character Name</label><br>
            	<input id="character" name="character" type="text"><br>

            	<label for="player">Player Name</label><br>
            	<input id="player" name="player" type="text"><br>

            	<label for="gender">Gender</label><br>
            	<input id="gender" name="gender" type="text"><br>

            	<label for="concept">Determine character concept</label><br>
            	<input id="concept" name="concept" type="text"><br>

            	<label for="aspiration1">1st short-term aspiration</label><br>
            	<input id="aspiration1" name="aspiration1" type="text"><br>

            	<label for="aspiration2">2nd short-term aspiration</label><br>
            	<input id="aspiration2" name="aspiration2" type="text"><br>

            	<label for="aspiration3">Long-term aspiration</label><br>
            	<input id="aspiration3" name="aspiration3" type="text"><br>
            </div>
            <div id="page2" class="page" style="display: none">
            	<h1>Step Two: Paths</h1>
            </div>
            <div id="page3" class="page" style="display: none">
            	<h1>Step Three: Skills</h1>
            </div>
            <div id="page4" class="page" style="display: none">
            	<h1>Step Four: Attributes</h1>
            </div>
            <div id="page5" class="page" style="display: none">
            	<h1>Step Five: Apply Template</h1>
            </div>
            <div id="page6" class="page" style="display: none">
            	<h1>Step Six: Finishing Touches</h1>
            </div>
            <div id="page7" class="page" style="display: none">
            	<h1>Completion</h1>
            </div>
		</td> 
	</tr>
	<tr>
		<td colspan="2" style="text-align:right">
			<button id="prevButton" onclick="flipPage(-1)" disabled>&lt;&lt; Prev</button>
			<button id="nextButton" onclick="flipPage(1)">Next &gt;&gt;</button>
			<!--input type="submit" id="submit" name="submit" value="Done" style="display:none">
			<input type="submit" id="cancel" name="cancel" value="Cancel"-->
		</td>
	</tr>
</table>

</body>
</html>	
}]