function add(x,y){
    function parseArg(n){
        if (Array.isArray(n)) return add.apply(this, n);
        if (typeof n === "function") return parseArg(n());
        return isNaN(n) ? 0 : parseInt(n,10);
    }
    return arguments.length <= 1 ? parseArg(arguments[0]) : parseArg(arguments[0]) + add([].slice.call(arguments, 1));
}

// -> convert the array into arguments

// arguments
// this

//function invocation
//1. as a method of an obj -> this => obj
//2. as a function -> this => window

//3. using the "call" method
//4. using the "apply" method

