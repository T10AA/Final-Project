"use strict";
// header background styling while scrolling
let header = document.getElementById('header');

window.onscroll = function () {
    if (document.documentElement.scrollTop >=150) {
        header.classList.add('scrollingHeader');
        document.getElementById('burger').classList.add('BurgerOnScroll');
    }else{
        header.classList.remove('scrollingHeader');
        document.getElementById('burger').classList.remove('BurgerOnScroll');
    }
};

// form validation
let contactForm = document.getElementById('Form');
contactForm.addEventListener('submit', function(event) {
  event.preventDefault();
  let errors={};  
 
  let textarea = document.getElementById('text_box').value;
  if (textarea == "" && textarea.length < 5) {
    errors.review_Box = "Message box can not be empty and must be more than 5 chaarcters";
  }
  document.querySelectorAll(".FormErrorText").forEach((item) => {
    item.innerText = " ";
  });
  for (let key in errors) {
    let spanText = document.getElementById("error_" + key);
    console.log(spanText);
    if (spanText) {
      spanText.innerText = errors[key];
    }
  }
  if (Object.keys(errors).length == 0) {
    contactForm.submit();
  }
  
});

// E-mail validation

let emailBox = document.getElementById('Mail_box');

emailBox.addEventListener("keyup", function () {
    let MailValue = document.getElementById('Mail_box').value;
    let errorText = document.getElementById('text');
    let checked = document.querySelector('.Checked');

    let emailValid =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (MailValue.match(emailValid)) {
        checked.classList.add('valid_checked');        
      } else {
        checked.classList.remove('valid_checked');
        errorText.innerText = 'Enter valid E-mail';
        errorText.style.color = 'red';        
      }
    
      if (MailValue == "") {
        errorText.innerHTML = " ";
      }

});


// get customers from server

let currentPage = 1;
let totalPages;

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (GotAsText) {
      if (GotAsText.status !== 200) {
        throw GotAsText.status;
      }
      return GotAsText.json();
    })
    .then(function (GotAsJs) {
      const fragment = new DocumentFragment();
      GotAsJs.data.forEach((item) => {
        let li = document.createElement("li");        
        let UserName = document.createElement('p');
        UserName.classList.add("span-user");        
        UserName.innerText = `${item.first_name} ${item.last_name}`;
        let image = document.createElement("img");
        image.src = item.avatar;
        image.classList.add("image-user");
        image.setAttribute("alt", "user-image");    
        let ContInfo = document.createElement('p');
        ContInfo.innerText = `${item.email}`  
        let EmailBlock = document.createElement('div');
        EmailBlock.appendChild(ContInfo);
        EmailBlock.classList.add("contact_staff");
        document.getElementById('ComBTN').addEventListener('click', function() {
            EmailBlock.classList.add('activeMail');
            document.getElementById('ComBTN').classList.add('passive');
            document.getElementById('cross').classList.add('activeX');
        });
        document.getElementById('cross').addEventListener('click', function() {
            EmailBlock.classList.remove('activeMail');
            document.getElementById('ComBTN').classList.remove('passive');
            document.getElementById('cross').classList.remove('activeX');
        });
        li.appendChild(image);
        li.appendChild(UserName);        
        li.appendChild(EmailBlock);
        fragment.appendChild(li);
      });

      document.getElementById("Users_main").innerHTML = " ";
      document.getElementById("Users_main").appendChild(fragment);

      totalPages = GotAsJs.total_pages;
    })
    .catch(function (error) {
      if (error == 404) {
        let p = document.createElement("p");
        p.textContent = "Page Not FOund";
        document.getElementById("comets_main").appendChild(p);
      } else if (error == 500) {
        let p = document.createElement("p");
        p.textContent = "Server Error";
        document.getElementById("comets_main").appendChild(p);
      }
    });
}
document.getElementById("Left_arrow").addEventListener("click", function () {
  if (currentPage == 1) {
    return;
  }
  
  currentPage--;
  getUsers(currentPage);
});

document.getElementById("Right_arrow").addEventListener("click", function () {
  if (currentPage == totalPages) {
    return;
  }

  currentPage++;
  getUsers(currentPage);
});

getUsers(currentPage);

// get activate buttons

document.querySelector('.S4pressButton').addEventListener('click', function() {
    window.scrollTo(0, 2500);
});


// Burger-Bar

let burger = document.getElementById('burger');
let navigation = document.getElementById('nav');

burger.addEventListener('click',function() {
    burger.classList.toggle('openedBurger');
})
burger.addEventListener('click',function() {
    navigation.classList.toggle('column')
});

// main section slideshow
let data = [
  {
    id: 1,
    imageUrl: 'images/resized1.jpg',
    title: 'Never give up get everything in yor hands', 
  },
  {
    id: 2,
    imageUrl: 'images/resized2.jpg',
    title: 'Feel the strenth in your arms', 
  },
  {
    id: 3,
    imageUrl: 'images/resized3.jpg',
    title: 'Listen to your body', 
  },
  {
    id: 4,
    imageUrl: 'https://i.cnnturk.com/i/cnnturk/75/1200x650/56a1f500ae784903d02bacb2.jpg',
    title: 'Be like a wind', 
  },
  {
    id: 5,
    imageUrl: 'images/resized5.jpg',
    title: 'Fitness Makes you happier', 
  },
];


let leftArrow = document.getElementById('LeftArrow');
let righttArrow = document.getElementById('RightArrow');
let SliderBox = document.getElementById('imageContainer');
let sliderIndex = 0;
let activedot = document.getElementsByClassName('dots');

function DivTag () {
let Divi = document.createElement('div');
Divi.classList.add('ImageBox');

return Divi;
}

function BGimage (item) {
let BgImage = document.createElement('div');
BgImage.style.backgroundImage = `url(${item.imageUrl})`;
BgImage.classList.add('BgImage');

return BgImage;
}

function Title (item) {
let SlideTitle = document.createElement('h3');
SlideTitle.innerText = item.title;
SlideTitle.classList.add('Title');

return SlideTitle;
}
function CreateDots () {
let DotBox = document.createElement('div');
DotBox.classList.add('DotMain');

data.forEach((element) => {
  let dot = document.createElement("div");    
  dot.classList.add("dots");
  dot.setAttribute('data-id', element.id-1);
  DotBox.appendChild(dot);
  dot.addEventListener('click', function(event) {
    let number = event.target.getAttribute("data-id");
    sliderIndex = number;
    Slider();
  });
});

return DotBox;
}

function Slider () {
SliderBox.innerHTML = ' ';
let MainDiv = DivTag(data[sliderIndex]);
let Image = BGimage(data[sliderIndex]);
let imgTitle = Title(data[sliderIndex]);
let DotParent = CreateDots();

MainDiv.appendChild(Image);
MainDiv.appendChild(imgTitle);
SliderBox.appendChild(MainDiv);
MainDiv.appendChild(DotParent);

activedot[sliderIndex].classList.add('active');
}
function ClickLeftArrow () {
if (sliderIndex == 0) {
  sliderIndex = data.length-1;
  Slider();
  return;
}
sliderIndex--;
Slider();
}
leftArrow.addEventListener('click', ClickLeftArrow);

function ClickRighttArrow () {
if (sliderIndex == data.length-1) {
  sliderIndex = 0;
  Slider();
  return;
}
sliderIndex++;
Slider();
}
righttArrow.addEventListener('click', ClickRighttArrow);

setInterval(() => {
ClickRighttArrow();
}, 4000);

Slider();

// news button  functionality
document.getElementById('LoadNewsBTN').addEventListener('click', function() {
  document.getElementById('loadNews').classList.remove('loadNews');
  document.getElementById('LoadNewsBTN').classList.add('passive');
  document.getElementById('CloseMark').classList.add('activated');
});
document.getElementById('CloseMark').addEventListener('click', function() {
  document.getElementById('loadNews').classList.add('loadNews');
  document.getElementById('LoadNewsBTN').classList.remove('passive');
  document.getElementById('CloseMark').classList.remove('activated');
});