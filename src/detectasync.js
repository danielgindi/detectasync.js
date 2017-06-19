'use strict';

/**
 * Return the first value in `items` that passes as `true` through the async callback `cb`.
 * As long as `concurrent===1` (default), the order in `items` is preserved.
 * If concurrency is higher - then the "first value that passes..." might not be the actual first item in the array the passes.
 *
 * @param {Array} items - The items to loop over
 * @param {function(item: *. index: Number):Promise.<Boolean>} cb
 * @param {Number} [concurrent=1]
 * @return {Promise}
 */
function detectAsync(items, cb, concurrent) {

    return new Promise(function (resolve, reject) {

        concurrent = concurrent || detectAsync.max || 1;

        let i = 0,
            len = items.length,
            running = 0,
            stop = i >= len,
            done = false,
            thrownException = undefined,
            detected = undefined;

        function release() {

            if (done) {
                // Should never happen
                console.warn("Something weird happened: `detectAsync` reached a point that it shouldn't have reached. Please review your async code.");
                return;
            }

            if (running === 0 && stop) {
                done = true;
                return thrownException ? reject(thrownException) : resolve(detected);
            }

            while (running < concurrent && !stop) {
                let item = items[i];
                let promise = cb(item, i);
                i++;
                running++;

                if (i >= len) {
                    stop = true;
                }

                promise
                    .then(function (flag) {
                        running--;

                        if (flag) {
                            detected = item;
                            stop = true;
                        }

                        release();
                    })
                    .catch(function (ex) {
                        running--;
                        thrownException = ex;
                        stop = true;
                        release();
                    });
            }
        }

        release();

    });
}

/**
 * The default value for max concurrent promises
 * @type {number}
 */
detectAsync.max = 1;

module.exports = detectAsync;