let startTime;
let endTime;
let x;

document.getElementById("start-button").addEventListener("click",function(){
    startTime=new Date(document.getElementById("start-input").value).getTime();
    endTime=new Date(document.getElementById("end-input").value).getTime();

    if(!startTime || !endTime || startTime>=endTime){
        alert("Please enter valid Start and End Times.");
        return;
    }
    clearInterval(x);
    x=setInterval(updateTimer,1000);
});


function updateTimer(){

    const currTime=new Date().getTime();

    const distanceCovered=currTime-startTime;
    //time -> milli seconds
    const distancePending=endTime-currTime;

    //calculate days,minutes,hrs,secs
    // 1 day= 24*60*60*1000 ms

    const oneDayInMillis=(24*60*60*1000);  
    const oneHourInMillis=(60*60*1000);
    const oneMinInMillis=(60*1000);
    const oneSecondInMillis=1000;

    const days = Math.floor(distancePending/oneDayInMillis);//divide islie ki convert kro millisec ko days
                                                            //hrs mins secs mai 
    const hrs = Math.floor((distancePending%oneDayInMillis)/oneHourInMillis);//mod krdo 1 din se fr hrs nikaal lo
    const mins = Math.floor((distancePending%oneHourInMillis)/oneMinInMillis);//mod krdo 1 hr se fr hrs nikaal lo
    const secs = Math.floor((distancePending%oneMinInMillis)/oneSecondInMillis);//mod krdo 1 min se fr hrs nikaal lo

    //populate in ui
    document.getElementById("days").innerHTML=days;
    document.getElementById("hours").innerHTML=hrs;
    document.getElementById("minutes").innerHTML=mins;
    document.getElementById("seconds").innerHTML=secs;

    //calculate width percentage for progress bar
    const totalDistance=endTime-startTime;
    const percentageDistance=(distanceCovered/totalDistance)*100;
    //set width for progress bar
    document.getElementById("progress-bar").style.width=percentageDistance+"%";
    
    if(distancePending<=0){
        clearInterval(x);
        document.getElementById("countdown").innerHTML="EXPIRED";
        document.getElementById("progress-bar").style.width="100%";
    }
}