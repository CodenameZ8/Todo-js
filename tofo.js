var checkTask;
var taskObj={
    task:[],
    date:[],
    time:[],
    dateObj:[]
};
checkTask=setInterval(alertFunc, 30000);
        function addTask(){
            getData();
            displayData();
        };  
        function deleteTask(){
            var deleteID=parseInt(document.getElementsByName("taskDelete")[0].value)-1;
            
            console.log()
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
            //console.log(document.getElementsByName("taskTime")[0].value);


        }
        function displayData(){
            var taskString= "", i,len=taskObj.task.length
            for(i=0;i<len;i++)
           {
            taskString= taskString +`${i+1}`+": "+ taskObj.task[i]+taskObj.date[i]+taskObj.time[i]+"<br>";
           }
           document.getElementById("taskListf").innerHTML = taskString;
           document.getElementById("taskList").innerHTML =`${len}`+":"+taskObj.task[len]+" Has been added";
        }
        function alertFunc() {
            var current =new Date().getTime();
            
            for(var i=0;i<taskObj.dateObj.length;i++)
            {
                console.log(taskObj.dateObj[i].getTime());
                if(current>taskObj.dateObj[i].getTime()){
                    prompt(passed(i))
                }
            }       
          }

        function convertDate(){
            var dateString =document.getElementsByName("taskDate")[0].value+'T'+document.getElementsByName("taskTime")[0].value+':00';
            var convertDate= new Date(dateString);
            console.log(convertDate);
            return convertDate;
        }
        function passed (id){
            return taskObj.task[id]+"is due";
        }
        function taskDelay(id){
            
        }