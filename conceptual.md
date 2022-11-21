# Conceptual Exercise

Answer the following questions below in Markdown.
Check out the
[Markdown Cheat Sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

## CSS

### What are differences between ``display: inline`` and ``display: block``?

``display: inline`` dictates that the width of an HTML element is limited to the width of its content, and any width and height properties specified will be ignored. Elements with this property are also displayed side by side on the same line.

``display: block`` dictates that the width of an HTML element defaults to the full width of its parent, unless width and height are specified. Every element with this property are displayed on a new line below the previous element.

### What are some advantages to using a CSS framework like Twitter Bootstrap?

CSS frameworks make organizing elements on the DOM less complicated, especially when it comes to creating more responsive, mobile-friendly applications that are compatible with all/most browsers. It's easier to add interactive features like navigation bars and modals, while the inner logic occurring under the hood are abstracted from the programmer.

---

## jQuery

### What is jQuery?

jQuery is a JavaScript library that makes DOM manipulation/navigation, event handling, creating animations, and sending HTTP requests easier and more concise (logic that you would typically write with more code using vanilla JavaScript can be called with a single jQuery method, ie. `css()`). jQuery also provides cross-browser support.

### What are differences between finding things with
`document.querySelector(".book")` and `$(".book")`?

Finding elements with `$(".book")` returns a jQuery object containing all the elements with the class "book", while using `document.querySelector(".book")` returns the first HTML element encountered with the class "book".

---

## Advanced JavaScript

### What is event delegation? Why would you use it?

Event delegation is an event handling technique of placing an event listener on the existing common parent of multiple children elements that need the same event listener. By doing so, we avoid the redundancy of iterating over children elements and attaching multiple event listeners that do the same thing. This is especially useful for children elements that are appended to a parent element after the DOM has loaded. If we were to iterate over and attach event listeners to every child element, only the present children (existing upon DOM load) would have an event listener, while children appended after the DOM has loaded will not.

### What is the `event` object? What kinds of things are in it?

The `event` object is an object containing properties describing the event that occurs, which includes:

1. the event target -- the HTML element that the event occurred on.
2. the event type -- describes the type of event that occurred, ie. "click".

### In the Hack or Snooze API project, what did we use async/await for?

Async/await was used to wait for responses from HTTP requests before further code was executed, so that the future code accessing the responses had data to traverse through.

### What happens if you forget the `async` keyword on  the declaration of a function that uses `await` inside of it?

JavaScript will throw a syntax error.

### What happens if you forget the `await` keyword in front of an asynchronous expression?

The asynchronous expression will execute and return a promise.

### What is the difference between a static method and an instance method?

A static method is a direct method of the class it's in, not of an instance object, so it can only be called using the class name itself. The purpose of static methods are to be able to call methods without needing to create an instance first (Ex. in Hack Or Snooze, certain User methods need a current user instance to execute, but the user instance can only be created upon signup/login, so the signup User method, which does not require a current user, is static).

### In JS: `let a = [1, 2, 3]; b = a.slice(); a.push(4);`: does `b` contain 4? Why or why not?

`b` does not contain 4 because although slice() returns a shallow copy of the original array, the elements in `a` are primitive types with no reference address, so the elements in `b` can't point to the elements in `a`.

### What are some strategies you've learned for being organized in larger projects, like Hack or Snooze?

1. A major strategy I've learned is to split up the backend tasks from the frontend. There are a lot of moving parts in larger projects, so this helps narrow my focus down to only a few related tasks at a time.

2. I've also learned that, often times, when writing in new functions, there are already existing functions that have very similar functionality, and it's much easier to follow the same pattern (modify where needed) to keep code consistent and avoid 'reinventing the wheel', so to speak. Knowing how to identify these recurring patterns are definitely key to streamlining the workflow.

---

## How the Web Works and APIs

### What is a hostname?

A hostname is the 'nickname' assigned to a server on the computer network. A server may have many hostnames.

### What is an IP address?

An IP address is the numeric address unique to an individual computer on the computer network.

### What is a port?

A port is essentially the address of any service or software in the server that uses the internet. This is where a server and client connect.

### What is DNS?

The Domain Name System converts human-readable, easy-to-remember hostnames to IP addresses, so that servers and clients can identify and communicate with each other.

### What is an HTTP header?

An HTTP header contains metadata of the HTTP request/response, which includes the content type and the request method, amongst other properties.

### What is an HTTP Response Code?

An HTTP Response Code is a 3-digit code sent in response to an HTTP request. It describes the status of the request (ie. 200 = successful).

### What is the difference between GET and POST?

The HTTP `GET` request is how the client retrieves data from a server when a user clicks on links on a page or searches anything on the browser. The arguments of a `GET` request are passed along in a query string.

The HTTP `POST` request securely sends data from the client to the server. The arguments of a `POST` request are passed in the body of a request. This type of request is especially useful for sending sensitive information like passwords.

### What is AJAX? Why would you use it?

AJAX (Asynchronous JavaScript And XML) is a set of techniques used for sending/receiving HTTP requests/responses using JavaScript in browser without refreshing the page upon response. By default, traditional HTTP requests will get a response and replace the entire webpage with the `GET` result, which becomes problematic when a user only wants to update or interact with parts of a page.

For example, without using AJAX, a user scrolling through their Twitter feed would reload their entire page upon scrolling to the bottom of their feed to load more content. With AJAX, the user's feed can be updated asynchronously, while the rest of the Twitter page remains as is. This way, the server doesn't have to send the entire page content, which makes for a faster, more efficient web application.

### What is JSON?

JSON (JavaScript Object Notation) is a standardized format for sending information from client to server or server to client. Upon transporting data, JSON converts the data to a JSON string that can later be parsed for use in many other programming languages.

### What is an API?

An API (application programming interface) is a set of clearly defined methods used for communicating with a software. What occurs under the hood when these methods are called are abstracted from the user.

### What are some limitations of AJAX requests?

1. Unless this default setting is changed, AJAX requests may be blocked if the request originates from a different hostname/protocol/port than the API URL.

2. Because they're asynchronous, AJAX requests may make it more difficult to debug code.

3. Browsers must be able to support JavaScript.

### What is the Same Origin Policy?

The Same Origin Policy dictates that an AJAX request originating from a different hostname, protocol, or port than the API URL will be blocked by the browser. The request does not actually reach the server, and the following error pops up on console:

`Access to fetch at *API URL* from origin *different origin URL* has been blocked by CORS policy.`
