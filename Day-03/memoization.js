//Finding if a given number is a prime number or not

function getPrimeFinder(){
    var cache = {};
    function isPrime(n){
        console.log("processing for ", n);
        if (n < 3) return true;
        for (var i=2; i <= (n/2); i++)
            if (n % i === 0) return false;
        return true;
    }
    return function (n){
        if (typeof cache[n] === "undefined")
            cache[n] = isPrime(n);
        return cache[n];
    }
}

function memoize(fn, hashFunction){
    var cache = {};
    return function (){
        var key = hashFunction.apply(this, arguments);
        if (typeof cache[key] === "undefined")
            cache[key] = fn.apply(this,arguments);
        return cache[key];
    }
}

var addFn = memoize(
       function(x,y){ console.log("processing for ", x , " and ", y);
           return x + y;
       }, function(){
           return window.JSON.stringify(arguments);
       });
