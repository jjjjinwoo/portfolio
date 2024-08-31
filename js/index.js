"use strict";

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

// 모든 필요 요소에 대해 이벤트 리스너 추가
addHoverListeners(document.querySelectorAll("span"));
addHoverListeners(document.querySelectorAll("button"));
addHoverListeners(document.querySelectorAll("h2"));
addHoverListeners(document.querySelectorAll("img"));
addHoverListeners(document.querySelectorAll("p"));
addHoverListeners(document.querySelectorAll("i"));
addHoverListeners(document.querySelectorAll("li"));

// *메인섹션 : x,y 축 좌표 - Jquery

$(function () {
  $(document).on("mousemove", function (e) {
    $(".posX").text(e.pageX);
    $(".posY").text(e.pageY);
  });
});

// *네비 컨트롤 바 위치에 따라 박스 위치 변경 이벤트

const rnbBox = document.querySelector("header #rnb .on");

document.addEventListener("scroll", rnbBoxOn);

function rnbBoxOn() {
  if (scrollY == 0) {
    rnbBox.style.top = "0px";
  } else if (scrollY >= vwHeight) {
    rnbBox.style.top = "48px";
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
    top: vwHeight,
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
  "border-radius": "50%",
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

// *섹션2 네비 바 숨기기 - GSAP

gsap.to("header #rnb", {
  scrollTrigger: {
    trigger: ".section2",
    start: "0% 90%",
    end: "0% 90%",
    scrub: 1,
    markers: false,
  },
  transform: "translateX(110px)",
});

// *섹션3

gsap.registerPlugin(ScrollTrigger);

var panels = gsap.utils.toArray(".panel");

panels.pop(); // get rid of the last one (don't need it in the loop)
panels.forEach((panel, i) => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: "bottom bottom",
      pinSpacing: false,
      pin: true,
      scrub: true,
      // set the transformOrigin so that it's in the center vertically of the viewport when the element's bottom hits the bottom of the viewport
      onRefresh: () =>
        gsap.set(panel, {
          transformOrigin:
            "center " + (panel.offsetHeight - window.innerHeight / 2) + "px",
        }),
    },
  });

  tl.fromTo(
    panel,
    1,
    { y: 0, rotate: 0, scale: 1, opacity: 1 },
    { y: 0, rotateX: 0, scale: 0.5, opacity: 0.5 },
    0
  ).to(panel, 0.1, { opacity: 0 });
});

// *메인섹션 텍스트 마우스따라 기울이기

const mouseMove = (e) => {
  // 마우스 좌표값 가져오기
  let mousePageX = e.pageX;
  let mousePageY = e.pageY;

  // 마우스 좌표값 기준점을 가운데로 변경
  let centerPageX = window.innerWidth / 2 - mousePageX;
  let centerPageY = window.innerHeight / 2 - mousePageY;

  // centerPage 최소값 -100 최대값 100 설정 (! Point)
  let maxPageX = Math.max(-200, Math.min(100, centerPageX));
  let maxPageY = Math.max(-200, Math.min(100, centerPageY));

  // 각도 줄이는 설정
  let anglePageX = maxPageX * 0.1;
  let anglePageY = maxPageY * 0.1;

  // 부드럽게 설정
  let softPageX = 0;
  let softPageY = 0;
  softPageX += (anglePageX - softPageX) * 0.4;
  softPageY += (anglePageY - softPageY) * 0.4;

  // 텍스트 움직이기
  const imgMove = document.querySelector(".main_section .text_box");
  imgMove.style.transform =
    "perspective(600px) rotateX(" +
    softPageY +
    "deg) rotateY(" +
    -softPageX +
    "deg)";
};

window.addEventListener("mousemove", mouseMove);
// = document.addEventListener("mousemove", mouseMove);
