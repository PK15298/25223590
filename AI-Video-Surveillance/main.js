status = "";
object = [];

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}


function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    objectname = document.getElementById("objectname").value;
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        object = results;
    }
}
function draw() {
        image(video, 0, 0, 480, 380);
        if (status != "") 
        {
            r = random(255);
            g = random(255);
            b = random(255);

            objectDetector.detect(video, gotResult);
            for (i = 0; i < object.length; i++) {
                document.getElementById("status").innerHTML = "Status: Object Detected";
                //document.getElementById("numberofobjects").innerHTML = "Number of Objects Detected: " + object.length;
                fill(r, g, b);
                percent = floor(object[i].confidence * 100);
                text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
                stroke(r, g, b);
                noFill();
                rect(object[i].x, object[i].y, object[i].width, object[i].height);
            
            if (object[i].label == objectname) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = objectname + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(objectname + "Found");
                synth.speak(utterThis);
            } 
            else {
                document.getElementById("status").innerHTML = objectname + " Not Found";
            }
        }
    }
}