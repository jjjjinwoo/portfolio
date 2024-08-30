"use strict";

// *처음 1초동안 스크롤 픽스하기

window.addEventListener("scroll", scrollFix);

let fakeWindow = window;

function scrollFix() {
  if (fakeWindow) {
    event.preventDefault();
    window.scrollTo(0, 0);
  }
}

setTimeout(() => {
  {
    fakeWindow = false;
  }
}, 1000);

// *스크롤 트리거 불러오기(플러그인 안정화)

gsap.registerPlugin(ScrollTrigger);

// *마우스 커서 - JS

let mouseCursor = document.querySelector("#cursor");
window.addEventListener("mousemove", cursor);

function cursor(e) {
  // 페이지 내에서의 마우스 좌표를 추적
  let mouseX = e.clientX; // viewport 기준 좌표
  let mouseY = e.clientY; // viewport 기준 좌표

  // 마우스 위치에 따라 커서 위치를 업데이트
  mouseCursor.style.left = mouseX + "px";
  mouseCursor.style.top = mouseY + "px";

  gsap.to(mouseCursor, {
    duration: 0.3,
  });
}

const addHoverListeners = (elements) => {
  elements.forEach((element) => {
    element.addEventListener("mouseover", () =>
      mouseCursor.classList.add("hover")
    );
    element.addEventListener("mouseout", () =>
      mouseCursor.classList.remove("hover")
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

// *헤더 색상 반전

let vwHeight = window.innerHeight;
const header = document.querySelector("header");

document.addEventListener("scroll", invertHeader);

function invertHeader() {
  if (scrollY > vwHeight) {
    header.style.filter = "invert(100%)";
  } else if (scrollY == 0) {
    header.style.filter = "invert(0%)";
  }
}

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

// *섹션1 스크롤 트리거 - GSAP

gsap.to(".section1 .top .img_box", {
  scrollTrigger: {
    trigger: ".section1",
    start: "0% 50%",
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

// *섹션1 텍스트 애니메이션

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

// *섹션2 가로 스크롤 트리거 - GSAP

let items = gsap.utils.toArray(".items"),
  pageWrapper = document.querySelector("main");

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
