status1 = "";
object = [];
label = "";

document.getElementById("findStatus").innerHTML = "Status: No object Detected, click start to start detecting";
document.getElementById("modelStatus").innerHTML = "Status: Model not Loaded, click Start to load model";

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelReady);
    document.getElementById("findStatus").innerHTML = "Status: Detecting Objects...";
    input = document.getElementById("input").value;

    if(input == label){
        video.stop();
        objectDetector.detect(gotResults);
        document.getElementById("findStatus").innerHTML = "Status: " + input + " Detected";

        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(input + " detected");
        synth.speak(utterThis);
    }

    else{
        document.getElementById("findStatus").innerHTML = "Status: " + input + " Not Detected";
    }
}

function modelReady(){
    status1 = "true";
    console.log("Model Loaded");
    document.getElementById("modelStatus").innerHTML = "Status: Model Loaded";
}

function draw(){
    image(video, 0, 0, 480, 380);

    if(status1 != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i < object.length; i++){
            percent = floor(object[i].confidence * 100);
            label = object[i].label;
            x = object[i].x;
            y = object[i].y;
            w = object[i].width;
            h = object[i].height;
            fill(0, 0, 0);
            text(label + " " + percent + "%", x + 15, y + 15);
            noFill();
            rect(x, y, w, h);
        }
    }
}

function gotResults(error, results) {
    if(error){ 
        console.log(error);
    }
    else{
        console.log(results);
        object = results;
    }
}

