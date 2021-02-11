//var checkTask;
var currentTime =new Date().getTime();
var taskObj={
    task:[],
    date:[],
    time:[],
    dateObj:[],
    delayStatus:[]
};
//checkTask=setInterval(alertFunc, 30000);
        function addTask(){
            getData();
            displayData();
        }; 
        function deleteTask(){
            let deleteValue=document.getElementsByName("taskDelete")[0].value;
            var deleteID=parseInt(deleteValue)-1;
            
           // console.log()
            if(typeof deleteID !='number')
                prompt("Enter proper ID");
            else {
                taskObj.task.splice(deleteID,1);
                taskObj.date.splice(deleteID,1);
                taskObj.time.splice(deleteID,1);
                document.getElementById("taskList").innerHTML =`${deleteID+1}`+":"+taskObj.task[deleteID]+" Has been removed";
                displayData();
            }
        }
        function getData(){
            taskObj.task.push(document.getElementsByName("task")[0].value);
            taskObj.date.push(document.getElementsByName("taskDate")[0].value);
            taskObj.time.push(document.getElementsByName("taskTime")[0].value);
            taskObj.dateObj.push(convertDate());
            console.log(taskTime);
            if(currentTime>taskTime)
                taskObj.delayStatus=true;
                else taskObj.delayStatus=false;
        }
        function displayData(){
            var taskStringCurrent= "",taskStringDelay="",i,len=taskObj.task.length
            for(i=0;i<len;i++)
           {
            if(task.dateObj.delayStatus)
            taskStringDelay=taskStringDelay+`${i+1}`+": "+ taskObj.task[i]+taskObj.date[i]+taskObj.time[i]+"<br>";
            else
            taskStringCurrent= taskStringCurrent +`${i+1}`+": "+ taskObj.task[i]+taskObj.date[i]+taskObj.time[i]+"<br>";
           }
           document.getElementById("taskListf").innerHTML = taskString;
           document.getElementById("taskListd").innerHTML = taskStringDelay;
           document.getElementById("taskList").innerHTML =`${len}`+":"+taskObj.task[len-1]+" Has been added";
        }
        /*function alertFunc() {
            var current =new Date().getTime();
            
            for(var i=0;i<taskObj.dateObj.length;i++)
            {
                //console.log(taskObj.dateObj[i].getTime());
                if(current>taskObj.dateObj[i].getTime()){
                    prompt(passed(i))
                }
            }       
          }*/

        function convertDate(){
            var dateString =document.getElementsByName("taskDate")[0].value+'T'+document.getElementsByName("taskTime")[0].value+':00';
            var convertDate= new Date(dateString);
            //console.log(convertDate);
            //setTimeout(passed,convertDate-Date.now());
            return convertDate;
        }
        function passIsDue(id){
            return taskObj.task[id]+"is due";
        }
        function taskDelay(id){
            
        }