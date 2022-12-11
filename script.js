"use strict";
// header background styling while scrolling
let header = document.getElementById('header');

window.onscroll = function () {
    if (document.documentElement.scrollTop >=80) {
        header.classList.add('scrollingHeader');
    }else{
        header.classList.remove('scrollingHeader');
    }
};

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
            EmailBlock.classList.add('active');
            document.getElementById('ComBTN').classList.add('passive');
            document.getElementById('cross').classList.add('active');
        });
        document.getElementById('cross').addEventListener('click', function() {
            EmailBlock.classList.remove('active');
            document.getElementById('ComBTN').classList.remove('passive');
            document.getElementById('cross').classList.remove('active');
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

// get activated buttons

document.querySelector('.S4pressButton').addEventListener('click', function() {
    window.scrollTo(0, 2500);
});
document.getElementById('GetStartedBTN').addEventListener('click', function() {
    window.scrollTo(0, 7200);
});


