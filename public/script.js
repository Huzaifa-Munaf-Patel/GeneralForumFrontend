const header = document.querySelector("header");
        const menuBtn = document.querySelector(".menu-icon");
        const closeMenuBtn = document.querySelector("#close-menu-btn");

        menuBtn.addEventListener("click", ()=> {
            header.classList.toggle("show-mobile-menu");
        })

        closeMenuBtn.addEventListener("click", ()=> {
            menuBtn.click();
        })