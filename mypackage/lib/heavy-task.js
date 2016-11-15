/**
 * execute a very heavy task with the final result being i * 33
 *
 * @param i
 * @returns {number}
 */
var HeavyTask = function(i) {
    // mimic this being a very heavy task by 'sleeping' for 1 second with a while loop
    //  ofcourse you would never do this, but this is just to mimic something that can actually take a second to do
    //  such as key derivation etc.
    var now = new Date().getTime();
    while (new Date().getTime() < now + 1000) {
        // wait
    }

    return i * 33;
};

module.exports = exports = HeavyTask;
