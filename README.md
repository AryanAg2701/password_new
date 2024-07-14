# password

This is a website for password login
use "npx nodemon app.js" in terminal and open "http://localhost:3000/auth/login".

This a basic website asks you for a username and password which is encrypted if you have a account it goes to the home page route through router which has your username if there is no account with the username it redirects you to register pade where u can register.
2 accounts cant be made using the same username it gives out alert and redirects to login page
on home page you can also log out and on login and register page you will get the roueer link to switch to on another

It is also connected to a chrome extension which gives autofill the passowrd prompt on entering the username if it matches with the saves one. However the chrome extension is not working right now amnd i am a bit unable to debug it.

It uses Node Express bcrypt body parser mongoose jsonwebtoken etc
