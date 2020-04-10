# task 1

1. What is done well ? 
- The major advantage of this is using the NGRX, it manages the state of an application and it is easier to maintain the state from single place and the state will be modified immutably without actually changing the old state it will be returning the new state with the reducer function.
- The Whole project is scaffolded by using angular-cli with combination of nrwl. nrwl will be good for creating multi project architecture and sharing the common library components across the projects. It will be easier for handling enterprise projects and make development
- This code has a linting tool that checks our typescript code for programmatic and stylistic errors and it has all the default rules for linting our code.
- It also uses the lazy loading, as the lazy loading enables us to load only the module that the user is interacting to it and all the other will be loaded run time, by that the initial load will be increased.
- All the necessary components are placed inside the libs folder. So, that it can share all the components across the application.

2. What would you change?
- Instead of using the loadsh in the application, we can use our own common utility functions which is provided by ES6 or ES2015, By that the bundle size will be reduced. By that the rendering and download speed will be very faster.

3. Are there any code smells or problematic implementations?
- When ever as the app is used the observable, as it always needs to unsubscribe to it, other ways there 
may be a chances of happening memory leaks in the application, by the performance can reduce. inorder to avoid that we have to always unsubscribe to it when we have created our own observable. 
- We can make use of all library module as onpush change detection strategy so that minimal DOM changes will happen
