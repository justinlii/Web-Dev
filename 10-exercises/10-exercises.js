const button = document.querySelector('.js-button');
console.log(button.classList.contains('js-button'));
let buttonsToggled = 0;

function clickButton(buttonType){
  const buttonElement = document.querySelector(`.js-${buttonType}`);

  if(buttonElement.classList.contains('css-toggled')){
    buttonElement.classList.remove('css-toggled');
    buttonsToggled-=1;
  }
  else{
    if(buttonsToggled<1){
      buttonElement.classList.add('css-toggled');
      buttonsToggled=1;
    }
  }
}
