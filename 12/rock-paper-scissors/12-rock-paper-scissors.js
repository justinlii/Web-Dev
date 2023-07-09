  let score = JSON.parse(localStorage.getItem('score'));
  let isAutoPlaying = false;  
  let intervalID;
  /*wins: 0, losses: 0, ties: 0*/

  //console.log(localStorage.getItem('score'));
  //console.log(JSON.parse(localStorage.getItem('score')));

  if (score === null || undefined){ //shortcut: (!score),  null is a falsy value. not will create a true statement
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
  }
  updateScore();

  function playGame(userMove){
    let result = '';
    let computerMove = generateCompMove();
    console.log(`Computer move: ${computerMove}`);
    if (userMove == 'scissor'){
      if (computerMove === 'rock'){
        result = 'You lose.';
        //score.losses += 1;
      }
      else if (computerMove === 'scissor'){
        result = 'Tie.';
        //score.ties +=1;
      }
      else {
        result = 'You win.';
        //score.wins += 1;
      }
    }

    else if (userMove == 'paper'){
      if (computerMove === 'rock'){
        result = 'You win.';
        //score.wins += 1;
      }
      else if (computerMove === 'scissor'){
        result = 'You lose.';
        //score.losses +=1;
      }
      else {
        result = 'Tie.';
        //score.ties +=1;
      }
    }

    else if (userMove == 'rock'){
      if (computerMove === 'rock'){
        result = 'Tie.';
        //score.ties+=1;
      }
      else if (computerMove === 'scissor'){
        result = 'You win.';
        //score.wins+=1;
      }
      else {
        result = 'You lose.';
        //score.losses+=1;
      }
    }
    if (result === 'You win.'){
      score.wins +=1;
    }
    else if (result === 'You lose.'){
      score.losses += 1;
    }
    else if (result === 'Tie.'){
      score.ties +=1;
    }
    displayResult(result);
    //localStorage.setItem('message', 'hello');

    //our score is saved at the end of the function
    localStorage.setItem('score', JSON.stringify(score)); //localStorage only takes in Strings, JavaScript object score is converted to a string

    /*alert(`You picked ${userMove}. Computer picked ${computerMove}. ${result} \nWins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`);*/
    displayMovesPlayed(userMove, computerMove);
    updateScore();
  }

  function updateScore(){
    const scoreElement = document.querySelector('.js-score');
    scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
  }

  function reset(){
    const resultElement = document.querySelector('.js-result');
    const movesElement = document.querySelector('.js-moves');
    resultElement.innerHTML = '';
    movesElement.innerHTML = '';

  }

  function displayResult(condition){
    const resultElement = document.querySelector('.js-result');
    if (condition === 'You win.'){
      resultElement.innerHTML = 'You win.';
    }
    else if (condition === 'You lose.'){
      resultElement.innerHTML = 'You lose.';
    }
    else{
      resultElement.innerHTML = 'Tie.';
    }
  }
  function displayMovesPlayed(user, computer){
    document.querySelector('.js-moves').innerHTML 
    = `You picked: 
    <img src="images/${user}-emoji.png" class="move-icon">
    Computer picked: 
    <img src="images/${computer}-emoji.png" class="move-icon">`
  }

  function generateCompMove(){
    const rand = Math.random();
    if (rand >= 0 && rand < 1/3){
      return 'rock'
    } 
    else if (rand >= 1/3 && rand < 2/3){
      return 'paper';
    }
    else{
      return 'scissor';
    }
  }

  
  function autoPlay(){
    if (isAutoPlaying === true){
      intervalID = setInterval(function(){
        const playerMove = generateCompMove();
        playGame(playerMove);
      }, 1000);
    }
    else{//we need to stop setInterval using the unique ID
      clearInterval(intervalID); 
      //in order to have access to intervalID here, we can create it outside the function
    }
    
  }