//var checkTask;
var summaryObj={
    yesterday:0,
    today:0,
    tomorrow:0
}

var taskObj={
    task:[],
    date:[],
    time:[],
    dateObj:[],
    delayStatus:[],
    timerClear:[]
};

//checkTask=setInterval(alertFunc, 30000);

        function addTask(){
            getObjData();
            appendData();
            summaryData();
        }

        function deleteTask(){

            let deleteValue=document.getElementsByName("taskDelete")[0].value-1;
            var list = document.getElementById("taskList");   
            list.removeChild(list.childNodes[deleteValue]);
            deleteObjData(deleteValue);                      
        }
       function deleteObjData(deleteID)
        {
            if(typeof deleteID !='number')
                prompt("Enter proper ID");
            else {
                taskObj.task.splice(deleteID,1);
                taskObj.date.splice(deleteID,1);
                taskObj.time.splice(deleteID,1);
                taskObj.dateObj.splice(deleteID,1);
                if(taskObj.delayStatus)
                {
                    clearTimeout(taskObj.timerClear[deleteID]);
                    //console.log("Cleared Timeout");
                    //clearSetTimmer(deleteID);  
                }
                taskObj.delayStatus.splice(deleteID,1);
                taskObj.timerClear.splice(deleteID,1);
        }
    }
        

        function getObjData(){
            taskObj.task.push(document.getElementsByName("task")[0].value);
            taskObj.date.push(document.getElementsByName("taskDate")[0].value);
            taskObj.time.push(document.getElementsByName("taskTime")[0].value);
            var taskNewTime=convertDate();
            taskObj.dateObj.push(taskNewTime);
            updateDelayStatus(taskNewTime);
            setTimmer(taskNewTime);
        }

        function appendData(){
            var taskString="",len=taskObj.task.length-1,delayString=" ";
            var node = document.createElement("li");

            if(taskObj.delayStatus[len]){ //console.log("Called");
            node.style.color="red"; 
            delayString=" DELAYED";}
            
            taskString=taskObj.task[len]+"  "+getDate(len)+"  "+taskObj.time[len]+delayString;
            var textnode = document.createTextNode(taskString); 
            node.appendChild(textnode);
            document.getElementById("taskList").appendChild(node);
        }

        // function alertFunc() {          
        //     for(var i=0;i<taskObj.dateObj.length;i++)
        //     {
        //     var currentTime =new Date().getTime();
        //     if(currentTime>taskObj.dateObj[i].getTime())
        //         taskObj.delayStatus[i]=true;
        //     else    
        //         taskObj.delayStatus[i]=false;
        //         }
        //     }       

        function convertDate(){
            var dateString =document.getElementsByName("taskDate")[0].value+'T'+document.getElementsByName("taskTime")[0].value+':00';
            var convertDate= new Date(dateString);
            return convertDate;
        }

        function updateDelayStatus(convertDate){
            var currentTime =new Date().getTime();
            if(currentTime>convertDate.getTime())
                taskObj.delayStatus.push(true);
            else     
                taskObj.delayStatus.push(false);

        }
        

        function setTimmer(userTime){
            var len=taskObj.task.length-1;

            if (!taskObj.delayStatus[len]){
                var TimeInSeconds=userTime.getTime()-(new Date()).getTime();
                //setTimmerID(len);                
                //console.log("Timer set for "+TimeInSeconds);
                let taskName=taskObj.task[len];
               taskObj.timerClear[len]=setTimeout(function passIsDue(){
                    prompt(taskName+" is due now");
                    console.log(TimeInSeconds+" Timmer is called for "+taskName);
                },TimeInSeconds);
                

            }
        }
        // function setTimmerID(id){
        //     SetTimerID.push(id);
        // } 
        // function getTimmerID(){
        //     return SetTimerID.pop();
        // }         
        // function clearSetTimmer(id){
        //     var clearid=0;
        //     for(var i=0;i<SetTimerID.length;i++)
        //     {
        //         if(setTimmerID[i]==id)
        //             clearid=setTimmerID[i];
        //     }
        //     for(var i=0;i<SetTimerID.length;i++)  console.log(i+" ");
        //     console.log(clearid+"id being cleared");
        //     taskObj.dateObj.splice(clearid,1);

        // }


        function getDate(id)
        {
            var current =new Date();
            var currentDate=current.getDate();
            var taskDateVar=new Date(taskObj.date[id]);
            var n=taskDateVar.getDate();
            var lastDayOfMonth = new Date(taskDateVar.getFullYear(),taskDateVar.getMonth()+1,0);
            var lastDayOfMonthc = new Date(current.getFullYear(),current.getMonth()+1,0);
            if(currentDate==lastDayOfMonthc)
            {
                if(taskDateVar==0&&taskDateVar.getMonth()==current.getMonth()-1)
                return "yesterday";                
            }
            if(n==lastDayOfMonth)
            {
                if(currentDate==0&&taskDateVar.getMonth()==current.getMonth()+1)
                return "tomorrow";                
            }
            if(taskDateVar.getMonth()==current.getMonth()&&taskDateVar.getFullYear()==current.getFullYear()){
                if(currentDate==n)
                return "Today"; 
            if(currentDate-1==n&&taskDateVar)
                return "Yesterday";
            else if(currentDate+1==n)
                return "Tomorrow";
            }     
            if(taskDateVar.getFullYear()==current.getFullYear())
                return taskDateVar.toDateString().slice(0, -7);
            else
                return taskDateVar.toDateString();                
            }
            function summaryData(){
                let stringData=getDate(taskObj.task.length-1);
                //console.log("called summary"+stringData);
                switch(stringData) {
                    case "Today":
                      summaryObj.today++;
                      console.log(summaryObj.today+" is for today");
                      break;
                    case "Yesterday":
                      summaryObj.yesterday++;
                      break;
                    case "Tomorrow":
                        summaryObj.tomorrow++;
                      break;
                  } 
                    displaySummary();       
            }
            function displaySummary(){
                document.getElementById("pendingToday").innerHTML="Today: "+summaryObj.today;
                document.getElementById("pendingTomorrow").innerHTML="Tomorrow: "+summaryObj.tomorrow;
                document.getElementById("pendingYesterday").innerHTML="Yesterday: "+summaryObj.yesterday;
            }