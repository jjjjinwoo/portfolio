"use strict";

// *lenis

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// *처음 1초동안 스크롤 픽스하기

function blockScroll() {
  document.body.classList.add("no-scroll");
}

function unblockScroll() {
  document.body.classList.remove("no-scroll");
}

// Block scroll immediately
blockScroll();

// Unblock scroll after 1 second
setTimeout(unblockScroll, 1000);

// *스크롤 트리거 불러오기(플러그인 안정화)

gsap.registerPlugin(ScrollTrigger);

// *마우스 커서 - JS

let mouseCursor = document.querySelector("#cursor");
let mouseCursorF = document.querySelector("#cursorF");
window.addEventListener("mousemove", cursorF);
window.addEventListener("mousemove", cursor);

function cursor(e) {
  // 페이지 내에서의 마우스 좌표를 추적
  // 마우스 위치에 따라 커서 위치를 업데이트
  mouseCursor.style.left = e.clientX + "px";
  mouseCursor.style.top = e.clientY + "px";
}

function cursorF(e) {
  gsap.to(mouseCursorF, {
    duration: 1,
    left: e.clientX,
    top: e.clientY,
  });
}

const addHoverListeners = (elements) => {
  elements.forEach((element) => {
    element.addEventListener("mouseover", () =>
      mouseCursorF.classList.add("hover")
    );
    element.addEventListener("mouseout", () =>
      mouseCursorF.classList.remove("hover")
    );
  });
};

// *최상단일때 마우스 커서 색상 바꾸기

document.addEventListener("scroll", cursorBG);

function cursorBG() {
  if (scrollY == 0) {
    mouseCursor.style.backgroundColor = "white";
  } else if (scrollY >= vwHeightHalf) {
    mouseCursor.style.backgroundColor = "black";
  }
}

// 모든 필요 요소에 대해 이벤트 리스너 추가
addHoverListeners(document.querySelectorAll("span"));
addHoverListeners(document.querySelectorAll("button"));
addHoverListeners(document.querySelectorAll("h2"));
addHoverListeners(document.querySelectorAll("img"));
addHoverListeners(document.querySelectorAll("p"));
addHoverListeners(document.querySelectorAll("i"));
addHoverListeners(document.querySelectorAll("li"));
addHoverListeners(document.querySelectorAll("a"));
addHoverListeners(document.querySelectorAll(".section4 .card_wrap"));

// *햄버거 버튼 클릭시

const menuBtn = document.querySelector("header .menu .menu_btn");
const menuIcon = document.querySelector("header .menu_icon");
let menuNum = 0;

menuBtn.addEventListener("click", menuClick);

function menuClick() {
  if (menuNum == 0) {
    menuIcon.classList.add("on");
    menuNum++;
    if (window.matchMedia("(max-width: 767px)").matches) {
      document.querySelector("#rnb").style.opacity = "0";
    }
  } else {
    menuIcon.classList.remove("on");
    menuNum--;
    if (window.matchMedia("(max-width: 767px)").matches) {
      document.querySelector("#rnb").style.opacity = "1";
    }
  }
}

// *메인섹션 : x,y 축 좌표 - Jquery

$(function () {
  $(document).on("mousemove", function (e) {
    $(".posX").text(e.pageX);
    $(".posY").text(e.pageY);
  });
});

// *네비 컨트롤 바 위치에 따라 박스 위치 변경 이벤트

let section1Top = document.querySelector(".section1").offsetTop;
let section2Top = document.querySelector(".section2").offsetTop;
let section2Item = document.querySelector(".section2 .item");
let section2Width =
  section2Item.offsetWidth * 5 + 40 * 6 - innerWidth + window.innerHeight;
let section3Top = section2Top + section2Width;

const rnbBox = document.querySelector("header #rnb .on");

const windowBottom = document.documentElement.scrollHeight; //전체크기가 아니고 뷰사이즈임

document.addEventListener("scroll", rnbBoxOn);

function rnbBoxOn() {
  if (scrollY == 0) {
    rnbBox.style.top = "0px";
  } else if (scrollY >= section1Top && scrollY < section2Top) {
    rnbBox.style.top = "48px";
  } else if (
    scrollY >= section3Top &&
    scrollY < document.documentElement.scrollHeight - windowBottom
  ) {
    rnbBox.style.top = "96px";
  } else if (scrollY >= document.documentElement.scrollHeight - windowBottom) {
    rnbBox.style.top = "144px";
  }
}

// *네비 컨트롤 바 누르면 섹션 이동

const rnbBtn = document.querySelectorAll("header #rnb button");

rnbBtn[0].addEventListener("click", function () {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

rnbBtn[1].addEventListener("click", function () {
  window.scroll({
    top: section1Top,
    behavior: "smooth",
  });
});

rnbBtn[2].addEventListener("click", function () {
  window.scroll({
    top: section3Top,
    behavior: "smooth",
  });
});

rnbBtn[3].addEventListener("click", function () {
  window.scroll({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
});

// *헤더 색상 반전 + 마우스 커서

let vwHeight = window.innerHeight;
let vwHeightHalf = window.innerHeight / 2;
const header = document.querySelector("header");

document.addEventListener("scroll", invertHeader);

function invertHeader() {
  if (scrollY > vwHeightHalf) {
    header.style.filter = "invert(100%)";
  } else if (scrollY == 0) {
    header.style.filter = "invert(0%)";
  }
}

// *메인섹션 텍스트 - TypeIt

setTimeout(() => {
  new TypeIt("#callback", {
    strings: ["[ sɑːlv ]", "1. (문제를) 해결하다 2. (문제를) 풀다"],
    speed: 50,
    waitUntilVisible: true,
  }).go();
}, 1500);

// *메인섹션 스크롤 트리거 - GSAP

gsap.to(".main_section .video_box", {
  scrollTrigger: {
    trigger: ".main_section",
    start: "0% 0%",
    end: "100% 0%",
    scrub: 1,
    markers: false,
  },
  filter: "blur(20px)",
  transform: "scale(1.2)",
});

gsap.to(".main_section .text_box", {
  scrollTrigger: {
    trigger: ".main_section",
    start: "0% 0%",
    end: "100% 0%",
    scrub: 1,
    markers: false,
  },
  opacity: 0,
  filter: "blur(10px)",
});

gsap.to(".main_section", {
  scrollTrigger: {
    trigger: ".main_section",
    start: "0% 0%",
    end: "100% 0%",
    scrub: 1,
    markers: false,
  },
  "border-radius": "0 0 50vw 50vw",
});

// *섹션1 이미지 스크롤 트리거 - GSAP

gsap.to(".section1 .top .img_box", {
  scrollTrigger: {
    trigger: ".section1",
    start: "10% 50%",
    end: "30% 50%",
    scrub: 1,
    markers: false,
  },
  transform: "rotateY(0deg)",
});

gsap.to(".section1 .bg_text", {
  scrollTrigger: {
    trigger: ".section1",
    start: "0% 50%",
    end: "100% 50%",
    scrub: 1,
    markers: false,
  },
  transform: "translateY(160px)",
});

// *섹션1 텍스트 애니메이션 - JS

const sec1Pin = document.querySelector(".section1 .top .text_box .pin");
const sec1Title = document.querySelector(".section1 .top .text_box .title");
const sec1Text = document.querySelector(".section1 .top .text_box .text");
const sec1SkillBox = document.querySelectorAll(".section1 .top .skill_box i");

function sec1TextScrollAdd() {
  sec1Pin.classList.add("scroll");
  setTimeout(function () {
    sec1Title.classList.add("scroll");
  }, 200);
  setTimeout(function () {
    sec1Text.classList.add("scroll");
  }, 400);
  setTimeout(function () {
    for (var i = 0; i < sec1SkillBox.length; i++) {
      // 각 요소에 대해 점진적인 지연을 주기 위해 인덱스에 기반하여 지연 시간 설정
      (function (index) {
        setTimeout(function () {
          sec1SkillBox[index].classList.add("scroll");
        }, 200 * index); // 각 요소에 대해 지연 시간 증가
      })(i);
    }
  }, 600);
}

document.addEventListener("scroll", invertHeader2);

function invertHeader2() {
  if (scrollY >= vwHeight) {
    sec1TextScrollAdd();
  }
}

// *섹션1 텍스트 애니메이션 - GSAP

gsap.to(".section1 .bottom", {
  scrollTrigger: {
    trigger: ".section1",
    start: "70% 50%",
    end: "70% 50%",
  },
  opacity: 1,
  transform: "translateY(0px)",
});

// *섹션2 가로 스크롤 트리거 - GSAP

let items = gsap.utils.toArray(".items"),
  pageWrapper = document.querySelector(".section2");

items.forEach((container, i) => {
  let localItems = container.querySelectorAll(".item"),
    distance = () => {
      let lastItemBounds =
          localItems[localItems.length - 1].getBoundingClientRect(),
        containerBounds = container.getBoundingClientRect();
      return Math.max(0, lastItemBounds.right - containerBounds.right);
    };
  gsap.to(container, {
    x: () => -distance(), // make sure it dynamically calculates things so that it adjusts to resizes
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "bottom bottom",
      pinnedContainer: pageWrapper,
      end: () => "+=" + distance(),
      pin: pageWrapper,
      scrub: true,
      invalidateOnRefresh: true, // will recalculate any function-based tween values on resize/refresh (making it responsive)
    },
  });
});

// *섹션2 네비 바 숨기기/보이기 - GSAP

ScrollTrigger.matchMedia({
  "(min-width: 1024px)": function () {
    gsap.to("#rnb", {
      scrollTrigger: {
        trigger: ".section3",
        start: "-70% 50%",
        end: "0% 50%",
        scrub: 1,
        markers: false,
        onEnter: rnbHide,
        onLeave: rnbOn,
        onEnterBack: rnbHide,
        onLeaveBack: rnbOn,
      },
      // transform: "translateX(110px)",
    });
  },
});

function rnbHide() {
  document.querySelector("#rnb").classList.add("hide");
}
function rnbOn() {
  document.querySelector("#rnb").classList.remove("hide");
}

// *섹션3 스크롤 트리거 - GSAP

gsap.to(".section3 .bg_text", {
  scrollTrigger: {
    trigger: ".section3",
    start: "0% 50%",
    end: "100% 50%",
    scrub: 1,
    markers: false,
  },
  transform: "translateY(0px)",
});

gsap.to(".section3 .panel.first .screen", {
  scrollTrigger: {
    trigger: ".section3 .panel.first",
    start: "20% 50%",
    end: "80% 50%",
    scrub: 1,
    markers: false,
    onEnter: screenOn1,
    onLeave: screenOff1,
    onEnterBack: screenOn1,
    onLeaveBack: screenOff1,
  },
});

function screenOn1() {
  document.querySelector(".section3 .panel.first .screen").classList.add("on");
  document.querySelector(".section3 .panel.first .img_box").classList.add("on");
  document.querySelector(".section3 .panel.first .btn_box").classList.add("on");
}
function screenOff1() {
  document
    .querySelector(".section3 .panel.first .screen")
    .classList.remove("on");
  document
    .querySelector(".section3 .panel.first .img_box")
    .classList.remove("on");
  document
    .querySelector(".section3 .panel.first .btn_box")
    .classList.remove("on");
}

gsap.to(".section3 .panel.second .screen", {
  scrollTrigger: {
    trigger: ".section3 .panel.second",
    start: "20% 50%",
    end: "80% 50%",
    scrub: 1,
    markers: false,
    onEnter: screenOn2,
    onLeave: screenOff2,
    onEnterBack: screenOn2,
    onLeaveBack: screenOff2,
  },
});

function screenOn2() {
  document.querySelector(".section3 .panel.second .screen").classList.add("on");
  document
    .querySelector(".section3 .panel.second .img_box")
    .classList.add("on");
  document
    .querySelector(".section3 .panel.second .btn_box")
    .classList.add("on");
}
function screenOff2() {
  document
    .querySelector(".section3 .panel.second .screen")
    .classList.remove("on");
  document
    .querySelector(".section3 .panel.second .img_box")
    .classList.remove("on");
  document
    .querySelector(".section3 .panel.second .btn_box")
    .classList.remove("on");
}

gsap.to(".section3 .panel.third .screen", {
  scrollTrigger: {
    trigger: ".section3 .panel.third",
    start: "20% 50%",
    end: "80% 50%",
    scrub: 1,
    markers: false,
    onEnter: screenOn3,
    onLeave: screenOff3,
    onEnterBack: screenOn3,
    onLeaveBack: screenOff3,
  },
});

function screenOn3() {
  document.querySelector(".section3 .panel.third .screen").classList.add("on");
  document.querySelector(".section3 .panel.third .img_box").classList.add("on");
  document.querySelector(".section3 .panel.third .btn_box").classList.add("on");
}
function screenOff3() {
  document
    .querySelector(".section3 .panel.third .screen")
    .classList.remove("on");
  document
    .querySelector(".section3 .panel.third .img_box")
    .classList.remove("on");
  document
    .querySelector(".section3 .panel.third .btn_box")
    .classList.remove("on");
}

// *섹션4 마우스 호버

const sec4Titles = document.querySelectorAll(".section4 .card");

for (var i = 0; i < sec4Titles.length; i++) {
  sec4Titles[i].addEventListener("mouseover", function () {
    mouseCursorF.classList.add("screen");
  });
}

for (var i = 0; i < sec4Titles.length; i++) {
  sec4Titles[i].addEventListener("mouseout", function () {
    mouseCursorF.classList.remove("screen");
    mouseCursorF.style.backgroundImage = "url(#)";
  });
}

sec4Titles[0].addEventListener("mouseover", function () {
  mouseCursorF.style.backgroundImage = "url(./img/main/mockup_image/woo.png)";
});

sec4Titles[1].addEventListener("mouseover", function () {
  mouseCursorF.style.backgroundImage =
    "url(./img/main/mockup_image/ilovepdf.png)";
});

// *섹션5

ScrollTrigger.matchMedia({
  "(min-width: 1024px)": function () {
    gsap.to(".section5 .title", {
      scrollTrigger: {
        trigger: ".section5",
        start: "20% 50%",
        end: "20% 50%",
        scrub: 1,
        markers: false,
      },
      backgroundPositionY: "-80px",
      "letter-spacing": "10px",
    });
  },
  "(max-width: 1023px)": function () {
    gsap.to(".section5 .title", {
      scrollTrigger: {
        trigger: ".section5",
        start: "20% 50%",
        end: "20% 50%",
        scrub: 1,
        markers: false,
      },
      backgroundPositionY: "-244px",
    });
  },
});

gsap.to(".section5 .bg_box img", {
  scrollTrigger: {
    trigger: ".section5",
    start: "50% 50%",
    end: "50% 50%",
    scrub: 3,
    markers: false,
  },
  scale: "1.1",
});
