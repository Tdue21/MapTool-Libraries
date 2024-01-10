[overlay("loading","zorder=999"):{
	
    <!DOCTYPE html>
    <html>
    <body>
        <div style="background-color: black;opacity: 0.7;width: 100%;height: 100%;"></div>
        
        <div style="position:absolute;max-width:50%;top:50%;left:50%;margin-right:-50%;transform:translate(-50%, -50%);"+
                   "padding:15px;text-align:center;color:white;">
            <h1 style="text-align:center;color:white;margin:0px;padding-bottom:5px">Loading Framework</h1>
            <h4 style="text-align:center;color:white;margin:0px;padding:0px">[r:if(argCount() > 0, arg(0), "")]</h4>
        </div>
    </body>
    </html>
    
    }]
    
    [h:'<!--input("junk|0|Pause|CHECK")-->'] 