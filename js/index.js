"use strict";

// 마우스 커서 - JS

let mouseCursor = document.querySelector("#cursor");
window.addEventListener("scroll", cursor);
window.addEventListener("mousemove", cursor);
function cursor(e) {
  mouseCursor.style.left = e.pageX + "px";
  mouseCursor.style.top = e.pageY - scrollY + "px";
}

const mainTextBox = document.querySelector(".main_section .text_box");

mainTextBox.addEventListener("mouseover", cursorHover);
mainTextBox.addEventListener("mouseout", cursorOut);

const header = document.querySelector("header");

header.addEventListener("mouseover", cursorHover);
header.addEventListener("mouseout", cursorOut);

function cursorHover() {
  mouseCursor.classList.add("hover");
}
function cursorOut() {
  mouseCursor.classList.remove("hover");
}
