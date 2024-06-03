class Cash{
    constructor(){
        this.currency="";
    }
    constructor(currency){
        this.currency = currency;
    }
    getCurrency(){
        return this.currency;
    }
    setCurrency(currency){
        this.currency = currency;
    }
}