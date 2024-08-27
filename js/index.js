"use strict";

// 스크롤 트리거 불러오기(플러그인 안정화)

gsap.registerPlugin(ScrollTrigger);

// 마우스 커서 - JS

let mouseCursor = document.querySelector("#cursor");
window.addEventListener("scroll", cursor);
window.addEventListener("mousemove", cursor);
function cursor(e) {
  mouseCursor.style.left = e.pageX + "px";
  mouseCursor.style.top = e.pageY + "px";
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

// 메인섹션 : x,y 축 좌표 - Jquery

$(function () {
  $(document).on("mousemove", function (e) {
    $(".posX").text(e.pageX);
    $(".posY").text(e.pageY);
  });
});

// 헤더 색상 반전

let vwHeight = window.innerHeight;

document.addEventListener("scroll", invertHeader);

function invertHeader() {
  if (scrollY > vwHeight) {
    header.style.filter = "invert(100%)";
  } else if (scrollY == 0) {
    header.style.filter = "invert(0%)";
  }
}

// 섹션1 스크롤 트리거 - GSAP

gsap.to(".section1 .img_box", {
  scrollTrigger: {
    trigger: ".section1",
    start: "0% 50%",
    end: "30% 50%",
    scrub: 1,
    markers: false,
  },
  transform: "rotateY(0deg)",
});
