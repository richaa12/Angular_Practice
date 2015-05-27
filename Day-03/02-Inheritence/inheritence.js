/*function SalaryCalculator(basic, hra, da, tax){
    this.basic = basic;
    this.hra = hra;
    this.da = da;
    this.tax = tax;
    this.salary = 0;
}

SalaryCalculator.prototype.calculate = function(){
    var gross = this.basic + this.hra + this.da;
    var net = gross * ((100-this.tax)/100);
    this.salary = net;
}*/

function SalaryCalculator(basic, hra, da, tax){
    this.basic = basic;
    this.hra = hra;
    this.da = da;
    this.tax = tax;
    this.salary = 0;
}

SalaryCalculator.prototype.calculate = function(){
    var gross = this.basic + this.hra + this.da;
    var net = gross * ((100-this.tax)/100);
    this.salary = net;
}
