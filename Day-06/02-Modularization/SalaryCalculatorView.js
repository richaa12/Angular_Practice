 //View
define(["Backbone", "SalaryCalculator","Handlebars", "text!calculatorTemplate.html", "utils",], function(Backbone, SalaryCalculator, Handlebars, calculatorTemplate){
    var SalaryCalculatorView = Backbone.View.extend({
        model : SalaryCalculator,
        initialize : function(){
            this.listenTo(this.model, "change", this.render);
        },
        events : {
            "change input" : "updateModel",
            "click #btnCalculate" : "triggerCalculate"
        },
        updateModel : function(){
            var calculator = this.model;
            calculator.set('basic',this.$("#txtBasic").val().toInt());
            calculator.set('hra',this.$("#txtHra").val().toInt());
            calculator.set('da',this.$("#txtDa").val().toInt());
            calculator.set('tax',this.$("#rangeTax").val().toInt());
        },
        triggerCalculate : function(){
            this.model.calculate();
        },
        render : function(){
            var template = Handlebars.compile(calculatorTemplate);
            this.$el.html(template(this.model.toJSON()));
            return this;
        }
    });
    return SalaryCalculatorView;
})
