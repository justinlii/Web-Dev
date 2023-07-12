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
    <img src="../images/${user}-emoji.png" class="move-icon">
    Computer picked: 
    <img src="../images/${computer}-emoji.png" class="move-icon">`
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
      intervalID = setInterval(() => {
        const playerMove = generateCompMove();
        playGame(playerMove);
      }, 1000);
      const autoplayElement = document.querySelector('.js-autoplay-button');
      autoplayElement.innerHTML = 'Stop Playing';
    }
    else{//we need to stop setInterval using the unique ID
      clearInterval(intervalID); 
      //in order to have access to intervalID here, we can create it outside the function
      const autoplayElement = document.querySelector('.js-autoplay-button');
      autoplayElement.innerHTML = 'Auto Play';
    }
  }

  function reset(){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score'); //remove the 'score' item from memory
    //However, since the score is removed from memory, accessing the memory at a future point results in null (Ex: localStorage.getItem('score'))
    //alert(`Score has been reset \nWins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`);
    const resultElement = document.querySelector('.js-result');
    const movesElement = document.querySelector('.js-moves');
    resultElement.innerHTML = '';
    movesElement.innerHTML = '';

    updateScore();
    document.querySelector('.js-reset-message').innerHTML='';
  }

  function clearResetMessage(){
    document.querySelector('.js-reset-message').innerHTML='';
  }

  function confirmReset(){
    console.log('confirming reset...')
    //pause autoplay if it is active
    if (isAutoPlaying === true){
      isAutoPlaying = !isAutoPlaying;
      console.log(isAutoPlaying);
      autoPlay();
    }

    document.querySelector('.js-reset-message').innerHTML = 
      `Are you sure you want to reset the score? 
      <button 
        class="js-yes-reset">
        Yes</button> 
      <button 
        class="js-no-reset">
        No</button>
      `;
    //let bool;
    document.querySelector('.js-yes-reset').addEventListener('click', () =>{
      //bool = true;
      //console.log('bool'+ bool);
      //return true;
      reset();
    });

    document.querySelector('.js-no-reset').addEventListener('click', () => {
      clearResetMessage();
    });
    //console.log('bool final:' + bool);
  }
  
  //rock EventListeners
  document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
      playGame('rock');
      updateScore(); 
    });

  //paper EventListeners
  document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
    updateScore(); 
  });

  //scissor EventListeners
  document.querySelector('.js-scissor-button')
  .addEventListener('click', () => {
    playGame('scissor');
    updateScore(); 
  });

  //autoPlay EventListener
  document.querySelector('.js-autoplay-button')
    .addEventListener('click', () =>{
      isAutoPlaying = !isAutoPlaying;
      console.log(isAutoPlaying);
      autoPlay();
    });

  //reset EventListener
  document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
      confirmReset();
    })

  document.body.addEventListener('keydown', (event) =>{ //for key presses: PUT THEM IN BODY!
    if (event.key === 'r'){
      playGame('rock');
      updateScore();
    }
    else if (event.key === 'p'){
      playGame('paper');
      updateScore();
    }
    else if (event.key === 's'){
      playGame('scissor');
      updateScore();
    }
    else if (event.key === 'a'){
      isAutoPlaying = !isAutoPlaying;
      console.log(isAutoPlaying);
      autoPlay();
    }
    else if (event.key === 'Backspace'){
      confirmReset();
    }
    console.log(event);
  });

