"use strict"
const dropd = document.getElementById("dropped");
const posx = document.getElementById("posX");
const posy = document.getElementById("posY");
const posjson = document.getElementById("posjson");

var startNow = new Date();	
var mysteryJSON = new Object();
    
dragElement(document.getElementById("dragimg"));

function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;		    				    
        }
      function dragMouseDown(e) {
          var timeNow = new Date();
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        startNow = timeNow.getTime();
    }
      function elementDrag(e) {		  		
          var timeNow = new Date();
          var dragTime = timeNow.getTime();	
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the elements new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
          mysteryJSON["x"] = elmnt.offsetLeft - pos2;
        mysteryJSON["y"] = elmnt.offsetTop - pos2;
            
        mysteryJSON["timeDrag"] = dragTime;
        mysteryJSON["timeStart"] = startNow;
        mysteryJSON["menuMax"] = 0;
    }
    
    function closeDragElement() {
          document.onmouseup = null;
        document.onmousemove = null;
          let tmp = dropd.href;			  
          dropd.href = dropd.href +  encodeURIComponent(JSON.stringify(mysteryJSON));
          dropd.click();
          dropd.href = tmp;
    }

}