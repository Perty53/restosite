var form;
window.onload = () => {
  var signup = 'signup.html';
  
  
  document.getElementById('create-link').onclick = () => {
    loading ('#main-content');
  $ajaxUtils.sendGetRequest(signup,
        (resp) => {
         insertHtml("#main-content", signup);
     }, false);
    
  }
 
 
 
 
  form = document.querySelector('form');
  for (let el of form) {
    if (el.type !== 'submit') {
      el.onclick = () => {
        legendOnTop(el.id);
      }
      el.onfocus = () => {
        legendOnTop(el.id);
      }
      el.onblur = () => {
        onBlur(el.id);
      }
    }
    let legends = document.getElementsByClassName('legend');

    for (let legend of legends) {
      legend.onclick = () => {
        legendOnTop(legend.previousSibling.previousSibling.id);
      }
    }
  }
}
function onBlur(elementId) {
  var inputFocused = '#'+elementId;
  var inputLegend2 = inputFocused+"+.legend2";
  if (document.querySelector(inputFocused).value == "")
    document.querySelector(inputLegend2).className = "legend";
};
function legendOnTop(input) {
  container = document.getElementById(input);
  container.focus();
  const clas = "#"+input+"+.legend";
  let legend = document.querySelector(clas);
  //  console.log(legend);
  if (legend)
    legend.className = "legend2";
}