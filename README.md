# detectasync.js

[![npm Version](https://badge.fury.io/js/detectasync.js.png)](https://npmjs.org/package/detectasync.js)

Iterate over an array asynchronously, returning the first item the passes the async test (for native await/async/Promise)

## Installation:

```
npm install --save detectasync
```
  
## Usage example:

```javascript

const detectAsync = require('detectasync');
const FsStat = require('util').promisify(require('fs').stat);

await detectAsync(files, async function (file, index) {
	
	return (await FsStat(file)).isFile;
	
});


```

`detectAsync` will hold by default `1` one concurrent promises, instead of creating possibly 10,000s of promises ahead of time.  
You can control how many promises will be created concurrently, by passing an extra argument or by setting the default.

```javascript

detectAsync.max = 15; // Set default max concurrent promises to 15

await detectAsync(files, async function (file, index) {
	
	return (await FsStat(file)).isFile;
	
}, 20 /* 20 concurrent promises */);


But if you care about the order in the array, to return the very first item in the array the passes the test - keep concurrency to 1.  
(This still runs your code asynchronously).

```

## Notes

This library assumes that you use an up-to-date runtime that has a native `Promise` implementation.  
This includes node.js >= v4, Chrome >= v32, and most other browsers (including Edge, excluding IE).  

It *should* be used in conjuction with `async`/`await` as demonstrated in the example. 
As Promises themselves are still creating a bit of spaghetti code, and `async`/`await` were introduced to provide a more streamlined and less-noise async code handling.

## Contributing

If you have anything to contribute, or functionality that you lack - you are more than welcome to participate in this!
If anyone wishes to contribute unit tests - that also would be great :-)

## Me
* Hi! I am Daniel Cohen Gindi. Or in short- Daniel.
* danielgindi@gmail.com is my email address.
* That's all you need to know.

## Help

If you want to buy me a beer, you are very welcome to
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=G6CELS3E997ZE)
 Thanks :-)

## License

All the code here is under MIT license. Which means you could do virtually anything with the code.
I will appreciate it very much if you keep an attribution where appropriate.

    The MIT License (MIT)

    Copyright (c) 2013 Daniel Cohen Gindi (danielgindi@gmail.com)

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
