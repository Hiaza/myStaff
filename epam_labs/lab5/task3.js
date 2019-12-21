function Calculator(){
    this.res = 0;
    
    this.result = function(){
        console.log(this.res);
        return this.res;
    }
    this.add = function(x){
        this.res += x;
    };
    this.mult = function(x){
        this.res *= x;
    };
    this.subtract = function(x){
        this.res -= x;
    };
    this.reset = function(){
        this.res = 0;
    };
}



let calc = new Calculator();

calc.add(2)
calc.result();

calc.mult(4)
calc.result();

calc.subtract(3)
calc.result();

calc.reset();
calc.result();
