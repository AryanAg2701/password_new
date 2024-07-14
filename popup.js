document.addEventListener("DOMContentLoaded", function () {
    const lgin = document.getElementById("login-btn");
    lgin.addEventListener("click", function () {
      chrome.runtime.sendMessage({ action: "login" });
    });
  });