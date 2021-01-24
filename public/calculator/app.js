
const wrapper = document.getElementById('wrapper');


var operation_text = "";
var text = document.getElementById("calculator_screen")
var code;
var is_code = false;


function operation()
{
  if(operation_text.includes("NaN")) return "";

  let index_code = operation_text.indexOf(code);
  let n1 = parseFloat(operation_text.slice(0,index_code));
  let n2 = parseFloat(operation_text.slice(index_code+1,operation_text.length));
  
  switch (code)
  {
    case "+":
      return n1+n2;

    case "-":
      return n1-n2;

    case "*":
      return n1*n2;

    case "/":
      return n1/n2;
  }
}


wrapper.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  let id = event.target.id;

  if(id == "btn+" || id == "btn-" || id == "btn/" || id == "btn*")
  {
    if(is_code) operation_text = operation();
    else is_code = true;
    code = document.getElementById(id).textContent;
  }

  switch(id)
  {
    case "btnc":
      operation_text = "";
        break;
      
    case "btn-supr":
      operation_text = operation_text.slice(0,-1);
        break;
    
    case "btn_result":
      if(is_code) 
      {
        operation_text = operation();
        is_code = false;
      }
      break;

    default:
      operation_text += document.getElementById(id).textContent;
  }
  text.setAttribute('value',operation_text);
});


//JQUERY FOR CSS THINGS
$(document).ready(function(){
  $(".btn-op").hover(function(){
    $(this).parent("div").css("background-color", "rgb(20, 30, 78)");
    }, function(){
    $(this).parent("div").css("background-color", "rgb(7, 11, 31)");
  });

  $(".btn-number").hover(function(){
    $(this).parent("div").css("background-color", "rgb(14, 38, 87)");
    }, function(){
    $(this).parent("div").css("background-color", "rgb(10, 28, 63)");
  });
});
