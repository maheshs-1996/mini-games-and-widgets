const Throttle = (func, interval = 3000) => {
    let called = false;
    return (...args) => {
        if (!called) {
            func.apply(this, args);
            called = true;

            setTimeout(() => {
                called = false;
            }, interval);
        }
    };
};

const Debounce = (func, interval = 3000) => {
    let debounced = false;
    return (...args) => {
        if (!debounced) {
            func.apply(this, args);
        }
        clearTimeout(debounced);
        debounced = setTimeout(() => {
            debounced = false;
        }, interval);
    };
};

// const logger = (number) => console.log(`number => ${number}`);

// const throttledLogger = Throttle(logger, 1500);

// const debouncedLogger = Debounce(logger, 1500);

// const interval = setInterval(() => {
//     debouncedLogger(4);
// }, 200);

// setTimeout(() => {
//     clearInterval(interval);
// }, 5000);

// filter, find, findIndex, map, reduce, join, reduceRight, every and some

Array.prototype.customFilter = function (filterFunc) {
    if (typeof filterFunc !== "function")
        throw new Error(`Callback should be a function`);

    const filtered = [];
    for (let i = 0; i < this.length; i++) {
        if (filterFunc(this[i], i)) filtered.push(this[i]);
    }

    return filtered;
};

Array.prototype.customFind = function (finder) {
    for (let i = 0; i < this.length; i++) {
        if (finder(this[i], i)) {
            return this[i];
        }
    }
};

const expArray = [1, 2, 3, 4, 5, 7, 8];

const find1 = expArray.find((n) => n === 5);
console.log(`find1 => ${find1}`);

const find2 = expArray.customFind((n) => n === 5);
console.log(`find2 => ${find2}`);

// const f1 = expArray.filter((n) => n > 3);
// console.log(`f1 => ${f1}`);

// const customF1 = expArray.customFilter((n) => n > 3);
// console.log(`customF1 => ${customF1}`);
