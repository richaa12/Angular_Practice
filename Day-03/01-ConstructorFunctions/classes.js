/*
Constructor Function
1. are invoked using "new"
2. this -> new object
3. the default return value is -> this
*/

function Employee(id, name, salary){
    this.id = id;
    this.name = name;
    this.salary = salary;
}

function Spinner(){
    var count = 0;
    this.up = function(){ return ++count; };
    this.down = function(){ return --count; };
}
