function add(x,y){
    function parseArg(n){
        if (Array.isArray(n)){
            var result = 0;
            for(var i=0; i<n.length; i++)
                result += parseArg(n[i]);
            return result;
        }
        if (typeof n === "function") return parseArg(n());
        return isNaN(n) ? 0 : parseInt(n,10);
    }
    var result = 0;
    for(var i=0; i<arguments.length; i++)
        result += parseArg(arguments[i]);
    return result;
}

// Convert the array into an argument list, we can get rid of 4 - 7

//this
