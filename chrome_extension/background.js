chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "login") {
      // Handle login logic here
      console.log("Login button clicked!");
    }
  });