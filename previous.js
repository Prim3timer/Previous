import {questions} from '/prequiz.js'
let mainBoard = document.getElementById("main");
let theScore = document.getElementById("score");
let score = 0;
let i = 0;
let review = 0;
let anArray = [];

let board = document.getElementById("canvas");
board.style.display = "none";
console.log(board);
let spec = document.getElementById("number");
let q = document.getElementById("info");
let opt = document.querySelectorAll("input[type='radio']");
let lab = document.getElementsByClassName("option");
let clicker = document.getElementsByTagName("button");
let neat = document.createElement("table");
let timeInfo = document.createElement('h5')
let instruction = document.createElement("h5");
let countHub = document.getElementById("timer");
let wright = document.getElementById('copy')
let closure = document.createElement('h3')
let ID

  clicker[2].style.visibility = "hidden";
  clicker[0].style.visibility = 'hidden'
  let forward = 1;
  let backward = 0
  
  let allRadio = () => {
    for (let j = 0; j < opt.length; j++){
      if (opt[j].checked && backward == 0){
        anArray.splice(i-1, 1, opt[j].value) 
      }
      else if (opt[j].checked && forward == 0) anArray.splice(i, 1, opt[j].value)
    }
    // if we get to the end of the questions array, make the next button 
    // grayed out, the submit button visible
    if (i == questions.length){
      clicker[1].style.color = 'gray'
      clicker[1].style.borderColor = 'gray'
       clicker[2].style.visibility = 'visible'
       clicker[2].style.color = 'royalblue'
       clicker[2].style.borderColor = 'cornflowerblue'
       clicker[2].style.backgroundColor = 'cornsilk'
       
       

    }
    console.log(anArray)
    console.log('radio ' + 'backward: ' + backward, 'forward ' + forward, 'i: ' + i + " array's length " + anArray.length)
  }
  
  let act = () => {
    review++
    forward++
    backward = 0
    instruction.style.display = 'none'
    timeInfo.style.display = 'none'
    clicker[0].innerHTML = '<<'
    clicker[0].style.textAlign = 'left'
    clicker[0].style.letterSpacing = '.2rem'
    clicker[0].style.fontWeight = 'bold'
    clicker[1].innerHTML = '>>'
    clicker[1].fontWeight = 'bold'
    clicker[1].style.textAlign = 'right'
    clicker[1].style.letterSpacing = '.2rem'
    console.log('foward ' + 'backward: ' + backward, 'forward ' + forward, 'i: ' + i + " array's length " + anArray.length)
    clicker[0].style.visibility = 'visible'
   
    
    if (i > 0) {
      // maike the previous button grayed until the second question
      // is displayed
        clicker[0].style.color = 'royalblue'
        clicker[0].style.borderColor ='cornflowerblue'
        clicker[0].style.backgroundColor = 'cornsilk'
    }
    else{
      clicker[0].style.borderColor ='gray'
      clicker[0].style.color = 'gray'
      clicker[0].style.backgroundColor = 'darkgray'

    }
    clicker[1].style.color = 'royalblue'
    clicker[1].style.borderColor ='cornflowerblue'
    clicker[1].style.backgroundColor = 'cornsilk'
    if (i < questions.length){
      if (review < 2) {
        timer()
      }
      if (forward < 2) i ++
      board.style.display = 'block'
      spec.innerHTML = questions[i].id + '.'
      q.innerHTML = questions[i].quiz
      for (let j = 0; j < opt.length; j++){
        lab[j].innerHTML = questions[i].options[j]
        opt[j].value =questions[i].options[j]
        // uncheck the radio buttons when  next question is displayed
        opt[j].checked = false
        // If the user has attempted a previous question, it should
        // be checked when it is returned to.
        if (opt[j].value == anArray[i]) {
          opt[j].checked = true
        }
      }
      if (anArray.length < i) anArray.push('Unattempted')
    }
    if (i >= questions.length-1){
      // let i not become greater than the length of the questions array
      i = questions.length -1
      clicker[1].style.color = 'gray'
      clicker[1].style.borderColor = 'gray'
      clicker[1].style.backgroundColor = 'darkgray'

    }
    i++
    console.log(anArray)
  }
  
  let previous = () => {
    clicker[1].style.color = 'royalblue'
    clicker[1].style.borderColor = 'cornflowerblue'
    clicker[1].style.backgroundColor = 'cornsilk'
    backward++
    forward = 0
    if (i <= 0 ) {
    i = 0
  }
  if (i <= 1){

    clicker[0].style.color = 'gray'
    clicker[0].style.borderColor = 'gray'
    clicker[0].style.backgroundColor = 'darkgray'
  }
    if ( i > 0){
      if (backward < 2 && i != 1) i -= 2
      else i--
      spec.innerHTML = questions[i].id + '.'
      q.innerHTML = questions[i].quiz
      for (let j = 0; j < opt.length; j++){
        lab[j].innerHTML = questions[i].options[j]
        opt[j].value =questions[i].options[j]
        opt[j].checked = false
        if (opt[j].value == anArray[i]) {
          opt[j].checked = true
        }
      }
    }

    console.log(anArray)
    console.log('previous ' + 'backward: ' + backward, 'forward ' + forward, 'i: ' + i + "array's length" + anArray.length)
  }

    
  mainBoard.append(instruction);
  mainBoard.insertBefore(instruction, wright)
  mainBoard.insertBefore(timeInfo, instruction)
  console.log(mainBoard);
  let count = questions.length * 20;
  if (count % 60 == 0) {timeInfo.innerHTML = `You have ${(count/60)}
  minutes to answer ${questions.length} questions`}
  else timeInfo.innerHTML = `You have ${Math.floor(count/60)} minutes and ${count%60} seconds to 
  answer ${questions.length} questions.`
  instruction.innerHTML = `Do not not click the browser's back button or try to refresh/reload
  this page during the test.
  Click the 'Start' button to begin.</br>`
instruction.style.lineHeight = '1.5em'
  
    board.insertBefore(countHub, spec);
    let counting = () => {
      countHub.innerHTML = count;
      if (count / 60 <= 30)
      countHub.innerHTML = Math.floor(count / 60) + ":" + (count % 60);
      if (Math.floor(count / 60) >= 1 && count % 60 < 10)
      countHub.innerHTML = Math.floor(count / 60) + ":" + (count % 60);
      if (count / 60 < 10) {
        countHub.innerHTML = "0" + Math.floor(count / 60) + ":" + (count % 60);
      }
      if (count % 60 < 10) {
        countHub.innerHTML = Math.floor(count / 60) + ":" + "0" + (count % 60);
      }
      if (count / 60 < 10 && count % 60 < 10) {
        countHub.innerHTML =
        "0" + Math.floor(count / 60) + ":" + "0" + (count % 60);
      }
      count--;
      
      if (count < 0) {
        window.clearInterval(ID)
        // board.style.display = 'none'
        closure.innerHTML = "Time's Up!"
        mainBoard.insertBefore(closure, clicker[0])
        closure.style.margin = '6rem'
        board.style.display = 'none'
        clicker[0].style.display = 'none'
        clicker[1].style.display = 'none'
        clicker[2].style.visibility = 'visible'
        clicker[2].style.marginLeft =  '8rem'
        clicker[2].style.marginTop =  '-2rem'
        clicker[2].style.color =  'royalblue'
        clicker[2].style.borderColor =  'cornflowerBlue'
        clicker[2].style.backgroundColor =  'cornsilk'
      }
    };
    let timer = () => {
      ID = window.setInterval(counting, 1000)
    }
  //   let stopTimer = () => {
  //   window.clearInterval(ID)
  // }
  
    let truth = () => {
      closure.style.display = 'none'
      theScore.style.marginLeft = "1em";
      theScore.style.marginTop = "2em";
      theScore.style.marginBottom = "1em";
      neat.style.textAlign = "center";
      let row1 = neat.insertRow(0);
      row1.style.fontWeight = "bold";
      let cella = row1.insertCell(0);
      let cellb = row1.insertCell(1);
      let cellc = row1.insertCell(2);
      let celld = row1.insertCell(3);
      let celle = row1.insertCell(4)
      cella.innerHTML = "Q No.";
      cellb.innerHTML = "Question";
      cellb.style.width = '10rem'
      cellc.innerHTML = "Your Answer";
      celld.innerHTML = "Correct Answer";
      celle.innerHTML = 'Comment'
      
      for (let g = 0; g < questions.length; g++){
        // if the the elements of the 'anArray' matches the
        // the answers in the questions array
        if (anArray[g] == questions[g].answer){
          // score incrementts
          score += 100/questions.length
        }
      }
      theScore.innerHTML = "Your Score: " + score.toFixed(0) + "%";
      
      for (let i = questions.length - 1; i >= 0; i--) {
        let row = neat.insertRow(1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4)
        cell1.innerHTML = questions[i].id;
        cell2.innerHTML = questions[i].quiz;
        cell3.innerHTML = anArray[i];
        cell4.innerHTML = questions[i].answer
      cell5.innerHTML = "";
      if (anArray[i] == questions[i].answer) {
        cell5.innerHTML = "RIGHT";
        cell5.style.color = "green";
      } else {
        cell5.innerHTML = "WRONG";
        cell5.style.color = "red"
      }
      if (i % 2 == 0) {
        row.style.backgroundColor = "lightcyan";
      }
      mainBoard.append(neat);
    }
    board.style.display = "none";
    clicker[1].style.display = 'none'
    clicker[2].style.display = "none";
    clicker[0].style.display = 'none'
    theScore.style.textAlign = "center";
  };
  
  clicker[1].addEventListener('click', act)
  clicker[0].addEventListener('click', previous)  
  clicker[2].addEventListener('click', truth)
  for (let j = 0; j < opt.length; j++){
    opt[j].addEventListener('click', allRadio)
  }
  clicker[1].onkeydown = function(){
    console.log('hello world')
    if (i == questions.length-1){

      clicker[1].style.transitionProperty = 'scale box-shadow'
      clicker[1].style.transitionDuration = '.3s'
      clicker[1].style.transfrom = 'scale(1, 1)'
      clicker[1].style.boxShadow = '0.2em 0.3em 0.4em gray'
    }
    else{

      clicker[1].style.transitionProperty = 'scale box-shadow'
      clicker[1].style.transitionDuration = '.3s'
      clicker[1].style.transfrom = 'scale(.9, .9)'
      clicker[1].style.boxShadow = '0em 0em 0em'
    }
  }
  
  
  