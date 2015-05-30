 //Model
    //Evented Models
define(["Backbone"], function(Backbone){
    var SalaryCalculator = Backbone.Model.extend({
        defaults : {
            basic : 0,
            hra : 0,
            da : 0,
            tax : 0,
            salary : 0
        },
        calculate : function(){
            var gross = this.get('basic') + this.get('hra') + this.get('da');
            var net = gross * ((100-this.get('tax'))/100);
            this.set('salary',net);
        }
    });
    return SalaryCalculator;
});
