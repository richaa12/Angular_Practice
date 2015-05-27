var products = [
    {id : 5, name : "Pen", cost : 40, units : 60, category : 2},
    {id : 9, name : "Hen", cost : 70, units : 30, category : 1},
    {id : 8, name : "Ten", cost : 80, units : 80, category : 2},
    {id : 3, name : "Den", cost : 60, units : 50, category : 1},
    {id : 4, name : "Len", cost : 30, units : 70, category : 2},
    {id : 6, name : "Ken", cost : 90, units : 20, category : 1}
]

function display(title, fn){
    console.group(title);
    fn();
    console.groupEnd();
}

display("Functional Programming", function(){
    display("Initial List", function(){
        console.table(products);
    });
    display("Sorting", function(){
        display("Default sort (by id)", function(){
            function sort(){
                for(var i =0; i< products.length - 1; i++)
                    for(var j= i+ 1; j<products.length ; j++){
                        var left = products[i],
                            right = products[j];
                        if (left.id > right.id){
                            products[i] = products[j];
                            products[j] = left;
                        }
                    }
            }
            sort();
            console.table(products);
        });
        display("Generic sort (any list by any attribute)", function(){
            function sort(list, attrName){
                for(var i =0; i< list.length - 1; i++)
                    for(var j= i+ 1; j<list.length ; j++){
                        var left = list[i],
                            right = list[j];
                        if (left[attrName] > right[attrName]){
                            list[i] = list[j];
                            list[j] = left;
                        }
                    }
            }
            display("By cost", function(){
                sort(products, "cost");
                console.table(products);
            });
            display("By units", function(){
                sort(products, "units");
                console.table(products);
            });
            display("By category", function(){
                sort(products, "category");
                console.table(products);
            });
        })
        display("Generic sort (any list by any comparison logic)", function(){
            function sort(list, comparerFn){
                for(var i =0; i< list.length - 1; i++)
                    for(var j= i+ 1; j<list.length ; j++){
                        var left = list[i],
                            right = list[j];
                        if (comparerFn(left, right) > 0){
                            list[i] = list[j];
                            list[j] = left;
                        }
                    }
            }
            display("By value [ units * cost ]", function(){
                var productComparerByValue = function(left, right){
                    var p1Value = left.cost * left.units,
                        p2Value = right.cost * right.units;

                    if (p1Value < p2Value) return -1;
                    if (p1Value === p2Value) return 0;
                    return 1;
                }
                sort(products, productComparerByValue);
                console.table(products);
            });
        });

    });
});

/*
sort
filter
all
any
countBy
min
max
sum
aggregate
groupBy
*/
