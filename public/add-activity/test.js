var pass;
pass =  JSON.parse(localStorage.getItem('CurrentUser'));
if (pass === null) {
    window.location.replace("..login-out/signin.html");
  //  document.location.href = "../index.html";
  //  document.location.href = "..login-out/signin.html";
}