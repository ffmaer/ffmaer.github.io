// ************
//  functions
// ************
function fix(number, digit = 1) {
  return Number.parseFloat(number.toFixed(digit))
}

function remove_negative(number) {
  return number > 0 ? number : 0;
}

function fixFloat(number){
  if(number.toString().indexOf(".")!=-1){
    return number.toFixed(1);
  }else{
    return number;
  }
}

function daily2Lifetime(daily_hours){
  return daily_hours * max_age * DAYS_PER_YEAR;
}

function monthly2Lifetime(monthly_cost) {
  return monthly_cost * MONTHS_PER_YEAR * adulthood();
}

function isApartmentBought(){
  return toggles["toggle_famous_city"] == 1 || toggles["toggle_lesser_known_city"] == 1;
}

function ageBoughtApartment(){
  if(toggles["toggle_famous_city"] == 1 && toggles["toggle_lesser_known_city"] == 1){
    if(age_bought_famous_city_apartment > age_bought_less_known_city_house){
      return age_bought_less_known_city_house;
    }else{
      return age_bought_famous_city_apartment;
    }
  }else if(toggles["toggle_famous_city"]== -1 && toggles["toggle_lesser_known_city"] == 1){
    return age_bought_less_known_city_house;
  }else if(toggles["toggle_famous_city"] == 1 && toggles["toggle_lesser_known_city"] == -1){
    return age_bought_famous_city_apartment;
  }
}

function writelines(lines, section) {
  for (let line of lines) {
    let p = document.createElement("p")
    p.innerHTML = line;
    section.append(p)
  }
}

function hiddenFadeIn(index) {
  if (index < $(".hidden").length) {
    $(`.hidden:eq(${index})`).fadeTo("slow", 1, function() {
      index++;
      hiddenFadeIn(index)
    });
  }
}

function moveChart(adjust) {
  let text = adjust.parentNode.className == "toggle_content" ? adjust.parentNode.parentNode.parentNode : adjust.parentNode.parentNode;
  let id = text.getAttribute("id");
  if (id == "timetext") {
    timechart_top = -text.getBoundingClientRect().top+10;
  } else if (id == "cashtext") {
    cashchart_top = -text.getBoundingClientRect().top+10;
  }
}

function paddingLeft(element) {
  return parseFloat(window.getComputedStyle(element, null).getPropertyValue('padding-left'));
}

function updateChart(chartname) {
  let chartname_td = document.querySelector(`#${chartname}`);
  for (let div of chartname_td.querySelectorAll("div")) {
    chartname_td.removeChild(div);
  }
  let dict;
  let top_div = document.createElement("div");
  top_div.className = "top_div";
  top_div.style.display = "block";
  let div_padding_left = 5;
  let div_margin_left = 10;
  let longest_div_width = td_width - div_margin_left - div_padding_left;

  if (chartname == "timechart") {
    dict = hours_used;
    top_div.style.height = `${timechart_top}px`;
  } else if (chartname == "cashchart") {
    dict = lifelong_cost;
    top_div.style.height = `${cashchart_top}px`;;
  }
  top_div.style.width = `${longest_div_width}px`;
  chartname_td.append(top_div);

  let item_count = 0;
  for (let item in dict) {
    item_count++;
    if(dict[item]()!=0){
      let width;
      if (chartname == "timechart") {
        let hours = dict[item]();
        width = fix(Math.abs(hours/500), 0);
      } else if (chartname == "cashchart") {
        let dollars = dict[item]();
        width = fix(Math.abs(dollars) / 2000, 0);
      }

      while (width > 0) {
        let itemdiv = document.createElement("div");
        itemdiv.style["margin-left"] = `${div_margin_left}px`;
        itemdiv.style["padding-left"] = `${div_padding_left}px`;
        if (dict[item]() < 0 && item == "Money left") {
          itemdiv.style["background-color"] = "red";
          if (Math.floor(width / longest_div_width) == 1) {
            itemdiv.innerHTML = `<span>Deficit</span><span class='quote'>I know at last what distinguishes man from animals; financial worries. - Romain Rolland</span>`;
          } else {
            itemdiv.textContent = `Deficit`;
          }
        } else if (dict[item]() < 0 && item == "Free time") {
          itemdiv.style["background-color"] = "red";
          itemdiv.textContent = `Deficit`;
        } else if(dict[item]() >0){
          itemdiv.style["background-color"] = item_count % 2 == 0 ? "violet" : "hotpink";
          itemdiv.textContent = `${item}`;
        }
        itemdiv.style.height = "50px";
        if (width > longest_div_width) {
          itemdiv.style.width = `${longest_div_width}px`;
        } else {
          itemdiv.style.width = `${width}px`;
        }
        chartname_td.append(itemdiv);
        itemdiv.style["margin-right"] = itemdiv.scrollWidth - itemdiv.clientWidth;
        itemdiv.style["margin-bottom"] = itemdiv.scrollHeight - itemdiv.clientHeight + 10;
        width -= longest_div_width;
      }
    }
  }
}

function clickable(class_name, increment=1) {
  variables_to_update.push(class_name);
  let number;
  eval(`number = ${class_name}`);
  return `<div class='adjust' increment='${increment}'><button class='decrease'><</button><button disabled class='number number_${class_name}'>${number}</button><button class='increase'>></button></div>`;
}

function comma(number){
  if(number>=1000){
    number = fix(number,0);
    let comma_seperated = "";
    let number_str = number+"";
    for(let i =0;i<Math.ceil(number_str.length/3);i++){
      if(i==0){
        comma_seperated = number_str.slice(-3);
      }else{
        comma_seperated = `${number_str.slice(-3*(i+1),-3*i)},${comma_seperated}`;
      }
    }
    return comma_seperated;
  }else{
    return number;
  }
}

function dependent(class_name) {
  dependent_variables_to_update.push(class_name);
  let number;
  eval(`number = ${class_name}()`);
  return `<button disabled class='dependent dependent_${class_name}'>${comma(number)}</button>`;
}

function toggle(text, var_name) {
  toggles[var_name] = -1;
  return `<button class='toggle' var_name='${var_name}'>${text}</button>`;
}

function updateVariable(class_name) {
  eval(`${class_name} = Number.parseFloat(document.querySelector(".number_${class_name}").textContent)`);
}

function updateDependentValue(class_name, val) {
  for (let dep of document.querySelectorAll(`.dependent_${class_name}`)) {
    dep.textContent = comma(val);
  }
}

function isWinning(){
  let winning = true;
  for(let toggle_name in toggles){
    if(toggles[toggle_name]==-1){
      winning = false;
      break;
    }
  }
  if(cash_left() < 0 || hours_left() < 0){
    winning = false;
  }
  return winning;
}

function winning(){
  if(isWinning() && !document.querySelector(".winning_message") && !is_winning_message_shown){
    let winning_message = document.createElement("div");
    winning_message.className = "winning_message";
    document.querySelector("body").append(winning_message);
  
    for(let i=0; i<200; i++){
      let pattern = document.createElement("div");
      pattern.className = "hidden_pattern";
      pattern.textContent = "❁";
      pattern.style.position = "fixed";
      pattern.style["z-index"] = 2;
      let size = Math.random()*300+200;
      pattern.style.left = Math.random()*win_width-size/2;
      pattern.style.top = Math.random()*win_height-size/2;
      pattern.style["font-size"] = `${size}px`;
      pattern.style.opacity = 0.8;
      pattern.setAttribute("speed",1);
      winning_message.append(pattern);
    }

    let pattern = document.createElement("div");
    pattern.innerHTML = `
    <p speed='600' class='hidden_pattern'>MISSION COMPLETED</p>
    
    <p speed='600' class='hidden_pattern'>By opening all the folded contents and clearing both the time and the cash deficit, you have reached a winning condition of this game!</p>

    <p speed='600' class='hidden_pattern'>Stay healthy. Live long. We have a plenty of time to do what we like.</p>
    
    <p speed='600' class='hidden_pattern'>Before saying goodbye, thank you for playing this game!</p>
    
    <button onclick='hideWinningMessage()' speed='600' class='winning_message_button hidden_pattern'>Continue ></button>
    `;
    pattern.className = "hidden_pattern winning_text";
    pattern.style.left = `20px`;
    pattern.style.top = `20px`;
    pattern.style.position = `fixed`;
    pattern.style["z-index"] = 3;
    pattern.setAttribute("speed",1);
    winning_message.append(pattern);
  
    fadeInPatterns();
  }
}

function fadeInPatterns(){
  let speed = parseInt($(".hidden_pattern:hidden:first").attr("speed"));
  $(".hidden_pattern:hidden:first").fadeIn(speed,fadeInPatterns);
}

function hideWinningMessage(){
  let msg = document.querySelector(".winning_message");
  msg.parentNode.removeChild(msg);
  is_winning_message_shown = true;
  displaySeal();
}

function displaySeal(){
  if(is_winning_message_shown){
    let seal = document.createElement("div");
    seal.textContent = "❁";
    seal.className = "seal";
    document.querySelector("body").append(seal);
  }
}

function updateValues() {
  for (let var_name of variables_to_update) {
    updateVariable(var_name);
  }

  for (let var_name of dependent_variables_to_update) {
    let func_val;
    eval(`func_val = ${var_name}()`);
    updateDependentValue(var_name, func_val);
  }
  updateChart("timechart");
  updateChart("cashchart");
  winning();
}