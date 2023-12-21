# ObscureReference

ObscureReference - a tiny JS memory obfuscation tool

## Explanation

> Yes, this is security by obscurity

This is not a tool for your regular webapps. But if you happen to be writing an app in JavaScript that holds on to secrets for your users, you might want to use this.

What's it for? 
Imagine you're holding on to a secret in memory (either strainght in your app's memory or in a browser extension's storage.session) and the machine is running a stealer malware that's capable of dumping browser' memory to a file and searching for a structure that seems like it's your secret.

While it's mathematically impossible to store something in memory in a way you can recover but someone with access to the same memory could not, the goal here is to store it in a way that if you figure out the structure on one example, it will not apply to any other example. 

So what this package is doing is taking a string, splitting it in chunks and storing each chunk in a shape that's randomly selected from a few choices and randomly using string or number types for storing characters. The shape of the memory there is such a random mess!

Meanwhile, the developer experience is pretty much as if it wasn't there.

See for yourself!

```js
const { ObscureReference } = require("obscure-reference");

const secret = ObscureReference(prompt('type in your secret'));

console.log(`Your secret is ${secret}`);
// but you won't find it in a heap snapshot from the browser 
```

Note that ObscureReference gets the string as input, so the plain text representation of the secret will only be gone after the garbage collector pass frees the now unused string. See e2e tests for a quick proof of it working

## Usage

In Node.js or bundlers
```js
const { ObscureReference } = require("obscure-reference");
import { ObscureReference } from "obscure-reference";

const secret = ObscureReference(functionYouGetyourSecretFrom());

// then hold on to `secret` for as long as you want and unless you use it, it's gonna be hard to steal it from memory

secret.toString() // returns back the string representation

const serialized = JSON.stringify(secret);
const secret2 = ObscureReference.fromJSON(serialized);
```

## TODO
- add more stores without breaking JSON serialization compatibility
- rewrite to ESM for more browser use cases maybe
