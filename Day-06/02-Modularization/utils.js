define([], function(){
    String.prototype.toInt = function(){
        return parseInt(this,10);
    };
});
