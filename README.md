## Exploring Module Patterns in Node

To understand the core functionality of module patterns, this excercise serves as a guide to rebuilding a simplied version of the CommonJS `require` function.

You'll be working with a basic Node.js server that accepts a number from the client, halves that number, and then returns the result after the same number of seconds. For example, if the client sends the number 8, the application will wait 4 seconds before responding with the number 4. Our modules will be the two helper functions that are used to accomplish this: `halve`, and `delayResponse`. These modules are stored in two separate files: 'halve' and 'delayResponse', respectively.

We'll need to load these modules into our 'server.js' file in order to use them - but your challenge will be to do so without using `require` or `import`. In other words, you'll need to access the text in 'halve.js' and 'delayResponse.js' and run it as JavaScript code. The documentation on Node's [VM module](https://nodejs.org/api/vm.html#vm_vm_executing_javascript) will be of use to you here.

The module system we're creating should meet the following specifications:

1. The first time each file is loaded, its exported code should be cached. Therefore, if we try to load the same file again, your `load` function should return the cached data rather than running the file again.

2. Each module should behave as though it was declared in the global execution context.
  - They should have access to all of Node's [global variables](https://nodejs.org/api/globals.html) - in `delayResponse`, for example, the call to `setTimeout()` should work as expected.
  - However, they should not be able to directly access any variables declared in other modules - including from the 'parent' file that they're being loaded into. The code in 'halve.js', for example, should not be able to reference `server` or `serverLogic` from 'server.js'. Code must be exported and imported in order to become available to other modules.
  - There are two exceptions to this rule: all modules must be able to access their corresponding object from the cache, as well as the function that allows them to load other modules.

3. The functions being exported from each module should retain access to any other variables declared within the same file. For example, the function `halve` should be able to reference the variable `two` even after it's been exported.

#### main.js
You'll be doing most of your work in the file 'main.js'. We've required in `fs` and `vm` for you to use, but otherwise, you'll see that there's no boilerplate code. Aside from the specifications outlined above, we're leaving this open-ended - how you choose to design and implement your module system will be entirely up to you.

The two things you will need are:

- A cache to store the exports of each file, after it's run
- A function that will load files, run their code, and cache and return their exports

Use your loading function to run 'server.js' in this file.

#### server.js
In 'server.js', you'll be using the loading function you defined in 'main.js' to import `halve` and `delayResponse`. Therefore, you'll need to ensure that this function can be accessed from within 'server.js'

#### halve.js and delayResponse.js
These are the functions you'll be importing to 'server.js'. You won't need to modify anything in either of these files.

You can test your solution by running `node main.js` in the terminal and making a GET request to `localhost:3000/8`. After four seconds, the server should respond with the number '4'.

Have fun! :)
