export const generateId = function() {
    const timestamp = Number(new Date());

    const getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const ts = timestamp.toString();
    const parts = ts.split('').reverse();
    let id = '';

    for (let i = 0; i < 13; ++i) {
        const index = getRandomInt(0, parts.length - 1);
        id += parts[index];
    }

    return id;
};

export const extend = function () {
    let extended = {};
    let deep = false;
    let i = 0;
    let length = arguments.length;

    // Check if a deep merge
    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
        deep = arguments[0];
        i++;
    }

    // merge the object into the extended object
    let merge = function (obj) {
        for (let prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                // If deep merge and property is an object, merge properties
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    extended[prop] = extend(true, extended[prop], obj[prop]);
                } else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };

    // loop through each object and conduct a merge
    for (i=0; i < length; i++) {
        let obj = arguments[i];
        merge(obj);
    }

    return extended;
};