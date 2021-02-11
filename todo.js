var checkTask;
var taskObj={
    task:[],
    date:[],
    time:[],
    dateObj:[],
    delayStatus:[]
};
checkTask=setInterval(alertFunc, 30000);
        function addTask(){
            getData();
            displayData();
        }; 
        function deleteTask(){
            let deleteValue=document.getElementsByName("taskDelete")[0].value;
            var deleteID=parseInt(deleteValue)-1;
            if(typeof deleteID !='number')
                prompt("Enter proper ID");
            else {
                taskObj.task.splice(deleteID,1);
                taskObj.date.splice(deleteID,1);
                taskObj.time.splice(deleteID,1);
                taskObj.delayStatus.splice(deleteID,1);
                document.getElementById("taskList").innerHTML =`${deleteID+1}`+":"+taskObj.task[deleteID]+" Has been removed";
                displayData();
            }
        }
        function getData(){
            taskObj.task.push(document.getElementsByName("task")[0].value);
            taskObj.date.push(document.getElementsByName("taskDate")[0].value);
            taskObj.time.push(document.getElementsByName("taskTime")[0].value);
            var taskNewTime=convertDate();
            taskObj.dateObj.push(taskNewTime);
            updateDelayStatus(taskNewTime);
            //setTimmer(taskNewTime);
        }
        function displayData(){
            var taskStringCurrent= "",taskStringDelay="",i,len=taskObj.task.length
            for(i=0;i<len;i++)
           {
            if(taskObj.delayStatus[i])
            taskStringDelay=taskStringDelay+`${i+1}`+": "+ taskObj.task[i]+"  "+getDate(i)+"  "+taskObj.time[i]+"<br>";
            else
            taskStringCurrent= taskStringCurrent +`${i+1}`+": "+ taskObj.task[i]+"  "+getDate(i)+"  "+taskObj.time[i]+"<br>";
           }
           document.getElementById("taskListf").innerHTML = taskStringCurrent;
           document.getElementById("taskListd").innerHTML = taskStringDelay;
           document.getElementById("taskList").innerHTML =`${len}`+":"+taskObj.task[len-1]+" Has been modified";
        }
        function alertFunc() {
            displayData();            
            for(var i=0;i<taskObj.dateObj.length;i++)
            {
            var currentTime =new Date().getTime();
            if(currentTime>taskObj.dateObj[i].getTime())
                taskObj.delayStatus[i]=true;
            else     
                taskObj.delayStatus[i]=false;
                }
            }       

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
        function passIsDue(id){
            prompt(taskObj.task[id]+"is due");
        }
        function setTimmer(userTime){
            if(taskObj.delayStatus(taskObj.delayStatus.length)){
                var TimeInSeconds =new Date().getTime()
                TimeInSeconds=TimeInSeconds-userTime.getTime();
                setTimeout(passIsDue(taskObj.task.length),TimeInSeconds);
                console.log(TimeInSeconds+" Timmer is called")

            }
        }
        function getDate(id)
        {
            
            var currentDate =new Date().getDate();
            var taskDateVar=new Date(taskObj.date[id]);
            var n=taskDateVar.getDate();     
            if(currentDate==n)
                return "Today"; 
            if(currentDate-1==n)
                return "Yesterday";
            else if(currentDate+1==n)
                return "Tomorrow";
            else 
                return taskDateVar.toDateString();            

        }