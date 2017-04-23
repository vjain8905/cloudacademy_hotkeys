// ==UserScript==
// @name         Add in hotkeys
// @namespace    http://varunjain.ca/
// @version      0.1
// @description  Make your quizzes at Cloud Academy more efficient
// @author       Varun Jain
// @match        https://cloudacademy.com/quiz/study/*
// @grant        none
// ==/UserScript==

(function() {

  // Add in hotkey text as html
  function appendSpaceKeys() {
    $('.btns-container').append("<div id='space_hotkey' style='position:relative; z-index: 150; bottom: 0; text-align: center; top: 5px; color: red;'>[spacebar]</div>");
  }

  function appendNumberKeys() {
    var listItems = $(".q-answers li");
    listItems.each(function(index, li) {
        var product = $(li);
        console.log(product);
        product.find('a').prepend("<div id='"+(index+1)+"_hotkey' style='color:red; display: inline; z-index: 150;'>["+(index+1)+"] </div>");
    });
  }

  // Bind clicks to keypresses
  function bindActionKeys() {


    $(document).keydown(function(){
      switch(event.keyCode) {
        case 49:
          $('.q-answers').children('li').children('a')[0].click();
          break;
        case 50:
          $('.q-answers').children('li').children('a')[1].click();
          break;
        case 51:
          $('.q-answers').children('li').children('a')[2].click();
          break;
        case 52:
          $('.q-answers').children('li').children('a')[3].click();
          break;
        case 32:
          event.preventDefault();
          if($('.show-explanation').css('opacity') == "1") {
            $('.show-explanation').click();
          } else if ($('.next-question').css('opacity') == 1) {
            $('.next-question').click();
          }
          break;
        default:
          break;
      }
    });
  }

  // Bind actions on document load
  $( document ).ready(function() {
    if(window.location.href.indexOf("cloudacademy.com/quiz/study") > -1) {
      console.log("It's a CA Quiz");
      bindActionKeys();
      appendSpaceKeys();
      appendNumberKeys();

      with ('.q-text') {
       addEventListener('DOMSubtreeModified', function(event) {
           if(event.target.className =="session-question-container") {
              if(!document.getElementById("1_hotkey")) {
                appendNumberKeys();
              }
          }
        }, false);
      }

    }
  });

})();
