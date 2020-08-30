window.onload = function() {
    console.log("loaded");
    reportWindowSize();

    document.getElementById("btnExecute").onclick = click;
    /*const interval = setInterval(function() {
        click();
    }, 500);*/
}

const SQUARE_SIZE = 1;

function reportWindowSize() {
    console.log("heigh: " + window.innerHeight);
    console.log("width: " + window.innerWidth);
    const parentElement = document.getElementById("page-main");
    console.log("clientWidth: " + parentElement.clientWidth);

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    ctx.canvas.width  = parentElement.clientWidth;
    ctx.canvas.height = parentElement.clientHeight;
    //---- Safari is different with the height
    //ctx.canvas.height = page.clientHeight;

    ctx.fillStyle = 'rgba(34,34,34, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    console.log("-------RESIZE-------");
    console.log("Canvas width: " + ctx.canvas.width);
    console.log("Canvas height: " + ctx.canvas.height);

    const offsetX = 10;
    const offsetY = 10;

    let years = 5;
    const totalDays = getNumberOfDaysSinceBirthday();
    const customerYears = totalDays / 365;

    let maxY = 0;
    for (let i = 0; i < 40; ++i) {
        let offY = maxY + offsetY + SQUARE_SIZE;
        maxY = drawOneYear(ctx, offsetX, offY, totalDays);
    }
}

let G_COUNTER_DAYS = 0; //Pass to reference

function drawOneYear(ctx, offsetX, offsetY, customerYears) {
    const canvasWidth = ctx.canvas.width;
    const width = SQUARE_SIZE;
    const height = SQUARE_SIZE;
    let counterX = 0;
    let counterY = 0;
    let maxY = 0;
    const SEPARATION = 4;
    for (let i = 0; i < 365; ++i) {
        G_COUNTER_DAYS += 1;

        let x,y;
        let tempX = counterX * (width + SEPARATION) + offsetX;
        let tempY = counterY * (height + SEPARATION) + offsetY;

        if (tempX + width + offsetX > canvasWidth) {
            counterX = 0;
            counterY += 1;

            tempX = counterX * (width + SEPARATION) + offsetX;
            tempY = counterY * (height + SEPARATION) + offsetY;
        }

        counterX += 1;

        x = tempX;
        y = tempY;
        if (y > maxY) {
            maxY = y;
        }

        const drawColor = G_COUNTER_DAYS < customerYears;
        debugger

        //console.log(`Square ${x} ${y}`);
        ctx.beginPath();
        ctx.strokeStyle = drawColor ? "red" : "green";
        ctx.rect(x, y, width, height);
        ctx.stroke();
    }
    return maxY;
}


window.onresize = reportWindowSize;

function click() {
    G_COUNTER_DAYS = 0;
    reportWindowSize();
    return;
/*
    let inputValue = document.getElementById("inputDate").value;
    //debugger
    var mdy = inputValue.split("-");
    let convertedDate = new Date(mdy[0], mdy[1]-1, mdy[2]);
    let days = datediff(convertedDate, parseDate(getTodaysDate()));
    console.log("Days: " + days);
    //getNumberOfDaysSinceBirthday();

    /*var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    var ctx = c.getContext("2d");
    ctx.fillStyle = getRandomColor();
    const x = getRandomNumber(canvas.width);
    const y = getRandomNumber(canvas.height); 
    const width = getRandomNumber(50);
    const height = getRandomNumber(50);
    ctx.fillRect(x, y, width, height);*/
}

function getRandomNumber(top) {
    return Math.floor(Math.random() * top);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}

function getNumberOfDaysSinceBirthday() {
    let inputValue = document.getElementById("inputDate").value;
    var mdy = inputValue.split("-");
    let convertedDate = new Date(mdy[0], mdy[1]-1, mdy[2]);
    let days = datediff(convertedDate, parseDate(getTodaysDate()));
    console.log(`Number of ${days}`);
    return days;
}

function getTodaysDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}