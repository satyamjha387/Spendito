class Cash{
    
    constructor(currency){
        this.currency = currency;
    }
    getCurrency(){
        return this.currency;
    }
    setCurrency(currency){
        this.currency = currency;
    }

    getMode() {
        return {
            type: "Cash",
            currency: this.currency
        }
    }
}

export default Cash;