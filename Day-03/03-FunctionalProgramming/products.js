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
    display("Filter", function(){
       /*function filterCostlyProducts(){
           var result = [];
           for(var i=0; i<products.length; i++)
               if (products[i].cost > 50)
                   result.push(products[i]);
           return result;
       }
       var costlyProducts = filterCostlyProducts();
       console.table(costlyProducts);

       function filterCategory1Products(){
           var result = [];
           for(var i=0; i<products.length; i++)
               if (products[i].category === 1)
                   result.push(products[i]);
           return result;
       }
       var allCategory1Products = filterCategory1Products();
        console.table(allCategory1Products);*/

         function filter(list, criteriaFn){
           var result = [];
           for(var i=0; i<list.length; i++)
               if (criteriaFn(list[i]))
                   result.push(list[i]);
           return result;
        }
        var costlyProductCriteria = function(product){
            return product.cost > 50;
        };
        display("All costly products [cost > 50]", function(){
            var allCostlyProducts = filter(products, costlyProductCriteria);
            console.table(allCostlyProducts);
        });

        /*var affordableProductCriteria = function(product){
            return !costlyProductCriteria(product);
        };
        var nonCategory1ProductCriteria = function(product){
            return !category1ProductCriteria(product);
        };*/

        function negate(criteriaFn){
            return function(){
                return !criteriaFn.apply(this,arguments);
            };
        }

        function andCriteria(criteriaFn1, criteriaFn2){
            return function(){
                return criteriaFn1.apply(this,arguments) && criteriaFn2.apply(this,arguments);
            }
        }
        function orCriteria(criteriaFn1, criteriaFn2){
            return function(){
                return criteriaFn1.apply(this,arguments) || criteriaFn2.apply(this,arguments);
            }
        }
        var affordableProductCriteria = negate(costlyProductCriteria);

        display("All affordable products [!costlyProduct]", function(){
            var allAffordableProducts = filter(products, affordableProductCriteria);
            console.table(allAffordableProducts);
        });
        var category1ProductCriteria = function(product){
            return product.category === 1;
        };

        display("All category 1 products", function(){
            var allCategory1Products = filter(products, category1ProductCriteria);
            console.table(allCategory1Products);
        });
        var nonCategory1ProductCriteria = negate(category1ProductCriteria);

        display("Non category 1 products", function(){
            var nonCategory1Products = filter(products, nonCategory1ProductCriteria);
            console.table(nonCategory1Products);
        });

        display("All category 1 costly products [cost >= 50 && category == 1]", function(){
            var category1CostlyProductCriteria = andCriteria(category1ProductCriteria, costlyProductCriteria);
            var allCategory1CostlyProducts = filter(products, category1CostlyProductCriteria);
            console.table(allCategory1CostlyProducts);
        });
        display("All category 1 OR costly products [cost >= 50 || category == 1]", function(){
            var category1OrCostlyProductCriteria = orCriteria(category1ProductCriteria, costlyProductCriteria);
            var allCategory1OrCostlyProducts = filter(products, category1OrCostlyProductCriteria);
            console.table(allCategory1OrCostlyProducts);
        });

    });
    display("All", function(){
        function all(list, predicate){
            for(var i=0; i<list.length;i++)
                if (!predicate(list[i])) return false;
            return true;
        }
        var costlyProductPredicate = function(product){
            return product.cost > 50;
        }
        var areAllProductsCostly = all(products, costlyProductPredicate);
        console.log("Are all the products costly?", areAllProductsCostly);
    });
    display("Any", function(){
        function any(list, predicate){
            for(var i=0; i<list.length;i++)
                if (predicate(list[i])) return true;
            return false;
        }
        var costlyProductPredicate = function(product){
            return product.cost > 50;
        }
        var areAnyOfTheProductsCostly = any(products, costlyProductPredicate);
        console.log("Are any of the products costly?", areAnyOfTheProductsCostly);
    });
    display("CountBy", function(){
        function countBy(list, predicate){
            var result = 0;
            for(var i=0; i<list.length;i++)
                if (predicate(list[i])) ++result;
            return result;
        }
        var costlyProductPredicate = function(product){
            return product.cost > 50;
        }
        var noOfCostlyProducts = countBy(products, costlyProductPredicate);
        console.log("Total number of costly products = ", noOfCostlyProducts);
    });
    display("Min", function(){
       function min(list, valueSelector){
           var result = valueSelector(list[0]);
           for(var i=1; i<list.length; i++){
               var value = valueSelector(list[i]);
               if (result > value) result = value;
           }
           return result;
       }
       var costValueSelector = function(product){
           return product.cost;
       };
       var minCost = min(products, costValueSelector);
       console.log("Minimum Cost = ", minCost);
    });
    display("Max", function(){
       function max(list, valueSelector){
           var result = valueSelector(list[0]);
           for(var i=1; i<list.length; i++){
               var value = valueSelector(list[i]);
               if (result < value) result = value;
           }
           return result;
       }
       var costValueSelector = function(product){
           return product.cost;
       };
       var maxCost = max(products, costValueSelector);
       console.log("Maximum Cost = ", maxCost);
       var maxUnits= max(products, function(p){ return p.units; });
       console.log("Maximum Units = ", maxUnits);
    });
    display("Aggregate", function(){
        function aggregate(list, aggregator, seed){
            var first, start;
            if (!seed){
                seed = list[0],
                first = list[1];
                start = 2;
            } else {
                first = list[0];
                start = 1;
            }
            var result = aggregator(seed, first);
            for(var i=start; i<list.length; i++)
                result = aggregator(result, list[i]);
            return result;
        }
        var sumOfUnits = aggregate(products, function(result, product){
            return result + product.units;
        },0);
        console.log("Sum of Units = ", sumOfUnits);
        var maxOfUnits = aggregate(products, function(result, product){
            return result > product.units ? result : product.units;
        }, 0);
        console.log("Max of Units = ", maxOfUnits);

        var maxStockedProduct = aggregate(products, function(result, product){
            return result.units > product.units ? result : product;
        });
        console.log("Max stocked product = ", maxStockedProduct);
    });
    display("GroupBy", function(){
        function groupBy(list, keySelector){
            var result = {};
            for(var i=0; i<list.length; i++){
                var item = list[i];
                var key = keySelector(item);
                if (typeof result[key] === "undefined")
                    result[key] = [];
                result[key].push(item);
            }
            return result;
        }

        var produtsGroupedByCategory = groupBy(products, function(product){ return product.category;});
        console.log("Products Grouped By Category ", produtsGroupedByCategory);

        var productsGroupedByCost = groupBy(products, function(product){
            return product.cost > 50 ? "costly" : "affordable";
        });
        console.log("Products Grouped By Cost ", productsGroupedByCost);
        console.log("Costly");
        console.table(productsGroupedByCost["costly"]);

        console.log("Affordable");
        console.table(productsGroupedByCost["affordable"]);
    });

});

/*
sort - done
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
