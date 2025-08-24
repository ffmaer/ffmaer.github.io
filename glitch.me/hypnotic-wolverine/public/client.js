// client-side js
// run by the browser each time your view template is loaded

(function(){
  console.log('hello world :o');
  
  // our default array of dreams
  const dreams = [
  ];
  
  // define variables that reference elements on our page
  const dreamsList = document.getElementById('dreams');
  const dreamsForm = document.forms[0];
  const dreamInput = dreamsForm.elements['dream'];
  
  // a helper function that creates a list item for a given dream
  const appendNewDream = function(dream) {
    const newListItem = document.createElement('li');
    newListItem.innerHTML = dream;
    dreamsList.appendChild(newListItem);
  }
  
  // iterate through every dream and add it to our page
  if(dreams.length > 0){
    dreams.forEach( function(dream) {
      appendNewDream(dream);
    });
  }
  
  // listen for the form to be submitted and add a new dream when it is
  dreamsForm.onsubmit = function(event) {
    // stop our form submission from refreshing the page
    event.preventDefault();
    
    // get dream value and add it to the list
    console.log(dreamInput.value);  
    if(dreamInput.value.length == 1){
      document.getElementById('notice').innerHTML = '';
      $.get('/test',{word: dreamInput.value},function(data){
        if(data.pass){
          document.getElementById('info').innerHTML = '报名信息：'+data.info;  
        }else{
          dreams.push(dreamInput.value);
          appendNewDream(dreamInput.value);
          if(dreams.length == 1){
            document.getElementById('no').innerHTML = "以下尝试不对哦 :o";  
          }
          // reset form 
          dreamInput.value = '';
          dreamInput.focus();
        }
      });
    }else if(dreamInput.value.length > 1 || dreamInput.value.length == 0){
      document.getElementById('notice').innerHTML = '必须是一个字！';
    }
    
  };
  
})()