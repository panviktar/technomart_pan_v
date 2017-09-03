var link = document.querySelector(".info-contact .btn-list");
var popup = document.querySelector(".modal-content");
var close = document.querySelector(".modal-content-close");
var form = popup.querySelector("form");
var name = popup.querySelector("[name=name]");
var mail = popup.querySelector("[name=mail]");
var list = form.querySelector("[name=list]");
var storage1 = localStorage.getItem("name");
var storage2 = localStorage.getItem("email");


// Всплывающая форма: письмо

link.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.add("modal-content-show");
});

close.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.remove("modal-content-show");
  popup.classList.remove("modal-error");
});

form.addEventListener("submit", function(event) {
  if (!name.value || !mail.value) {
    event.preventDefault();
    popup.classList.add("modal-error");
  } else {
    localStorage.setItem("name", name.value);
  }
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (popup.classList.contains("modal-content-show")) {
      popup.classList.remove("modal-content-show");
    }
  }
});


// Всплывающая форма: корзина


var link_basket = document.querySelectorAll(".buy"),
  i;
var popup_basket = document.querySelector(".modal-content-basket");
var close_basket = popup_basket.querySelector(".modal-content-close");
var cancel_basket = document.querySelector(".btn-buy");


for (i = 0; i < link_basket.length; ++i) {
  link_basket[i].addEventListener("click", function(event) {
    event.preventDefault(event);
    popup_basket.classList.add("modal-content-show");
  });
}

close_basket.addEventListener("click", function(event) {
  event.preventDefault();
  popup_basket.classList.remove("modal-content-show");
});

cancel_basket.addEventListener("click", function(event) {
  event.preventDefault(event);
  popup_basket.classList.remove("modal-content-show");
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (popup_basket.classList.contains("modal-content-show")) {
      popup_basket.classList.remove("modal-content-show");
    }
  }
});


// Карта

var mapOpen = document.querySelector(".js-open-map");
var mapPopup = document.querySelector(".modal-content-map");
var mapClose = mapPopup.querySelector(".modal-content-close");

mapOpen.addEventListener("click", function(event) {
  event.preventDefault();
  mapPopup.classList.add("modal-content-show");
});

mapClose.addEventListener("click", function(event) {
  event.preventDefault();
  mapPopup.classList.remove("modal-content-show");
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (mapPopup.classList.contains("modal-content-show")) {
      mapPopup.classList.remove("modal-content-show");
    }
  }
});



// Сервисы переключатель

var serviceLinks = document.querySelectorAll(".service-slider a");
var serviceBlocks = document.querySelectorAll(".service-slider-slide");
var j, h, k;

for (i = 0; i < serviceLinks.length; ++i) {
  serviceLinks[i].addEventListener("click", function(event) {
    event.preventDefault(event);
    for (j = 0; j < serviceLinks.length; ++j) {
      serviceLinks[j].classList.remove("service-slider-control--active");
    }
    for (h = 0; h < serviceLinks.length; ++h) {
      if (serviceLinks[h] == this) {
        serviceLinks[h].classList.add("service-slider-control--active");
        for (k = 0; k < serviceBlocks.length; ++k) {
          serviceBlocks[k].classList.remove("service-slider-slide--active");
        }
        serviceBlocks[h].classList.add("service-slider-slide--active");
      }
    }
  })
}


/* Слайдер */

var ul;
var li_items;
var imageNumber;
var imageWidth;
var prev, next;
var currentPostion = 0;
var currentImage = 0;

function init() {
  ul = document.getElementById('slider');
  li_items = ul.children;
  imageNumber = li_items.length;
  imageWidth = li_items[0].children[0].clientWidth;
  ul.style.width = parseInt(imageWidth * imageNumber) + 'px';
  prev = document.getElementById("prev");
  next = document.getElementById("next");
  //.onclike = slide(-1) will be fired when onload;
  /*
	prev.onclick = function(){slide(-1);};
	next.onclick = function(){slide(1);};*/
  prev.onclick = function() {
    onClickPrev();
  };
  next.onclick = function() {
    onClickNext();
  };
}

function animate(opts) {
  var start = new Date;
  var id = setInterval(function() {
    var timePassed = new Date - start;
    var progress = timePassed / opts.duration;
    if (progress > 1) {
      progress = 1;
    }
    var delta = opts.delta(progress);
    opts.step(delta);
    if (progress == 1) {
      clearInterval(id);
      opts.callback();
    }
  }, opts.delay || 17);
  //return id;
}

function slideTo(imageToGo) {
  var direction;
  var numOfImageToGo = Math.abs(imageToGo - currentImage);
  // slide toward left

  direction = currentImage > imageToGo ? 1 : -1;
  currentPostion = -1 * currentImage * imageWidth;
  var opts = {
    duration: 500,
    delta: function(p) {
      return p;
    },
    step: function(delta) {
      ul.style.left = parseInt(currentPostion + direction * delta * imageWidth * numOfImageToGo) + 'px';
    },
    callback: function() {
      currentImage = imageToGo;
    }
  };
  animate(opts);
}

function onClickPrev() {
  if (currentImage == 0) {
    slideTo(imageNumber - 1);
  } else {
    slideTo(currentImage - 1);
  }
}

function onClickNext() {
  if (currentImage == imageNumber - 1) {
    slideTo(0);
  } else {
    slideTo(currentImage + 1);
  }
}

window.onload = init;
