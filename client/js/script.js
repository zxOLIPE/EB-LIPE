/* =========================
   EB LIPE - SCRIPT
========================= */


// Aguarda o carregamento da página

document.addEventListener("DOMContentLoaded", () => {



    console.log("EB LIPE iniciado com sucesso");



    // Botão Área Militar

    const loginButton = document.querySelector(".login-btn");


    if(loginButton){


        loginButton.addEventListener("click", () => {


            window.location.href = "pages/login.html";


        });


    }






    // Botões do Hero


    const buttons = document.querySelectorAll(".hero-buttons button");



    if(buttons.length){



        buttons[0].addEventListener("click", () => {


            alert("Sistema de alistamento em desenvolvimento.");


        });





        buttons[1].addEventListener("click", () => {


            window.scrollTo({

                top: document.body.scrollHeight,

                behavior: "smooth"

            });


        });



    }





});