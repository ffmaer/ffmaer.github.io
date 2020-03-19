// ************
//  DOM
// ************
for (let td of document.querySelectorAll("td")) {
  td.style.width = `${td_width}px`;
}
for(let table of document.querySelectorAll("table")){
  table.style.width = page_width;
}

let timetext = document.querySelector("#timetext")
let cashtext = document.querySelector("#cashtext")

// let titlediv = document.createElement("div");
// titlediv.setAttribute("class", "titlediv");
// titlediv.textContent = "Chapter I";
// timetext.append(titlediv)

writelines(lines, timetext)

// let titlediv2 = document.createElement("div");
// titlediv2.setAttribute("class", "titlediv");
// titlediv2.textContent = "Chapter II";
// cashtext.append(titlediv2)

writelines(lines2, cashtext);

hiddenFadeIn(0)

updateChart("timechart");
updateChart("cashchart");

// ************
//  buttons
// ************
let adjusts = document.querySelectorAll(".adjust");
for (let adjust of adjusts) {
  let number = adjust.querySelector('.number');
  let increment = adjust.getAttribute("increment");
  adjust.querySelector('.increase').onclick = function() {
    let value = fixFloat(parseFloat(number.textContent)+parseFloat(increment));
    for (let num of document.getElementsByClassName(number.className)) {
      num.textContent = value;
    }
    moveChart(adjust);
    updateValues();
  }
  adjust.querySelector('.decrease').onclick = function() {
    let value = fixFloat(parseFloat(number.textContent) - parseFloat(increment))
    if(value >= 0){
      for (let num of document.getElementsByClassName(number.className)) {
        num.textContent = value;
      }
      moveChart(adjust);
      updateValues();
    }
  }
}

let toggles_buttons = document.querySelectorAll(".toggle");
for (let toggle of toggles_buttons) {
  let toggle_contents = toggle.parentNode.querySelectorAll('.toggle_content');
  for (let toggle_content of toggle_contents) {
    toggle_content.style.display = "none";
  }
  toggle.onclick = function() {
    for (let toggle_content of toggle_contents) {
      if (toggle_content.style.display == "none") {
        toggle_content.style.display = "inline";
      } else {
        toggle_content.style.display = "none";
      }
    }
    eval(`toggles["${toggle.getAttribute("var_name")}"] *= -1`);
    moveChart(toggle);
    updateValues();
  }
}