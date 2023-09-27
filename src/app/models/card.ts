export class Card {
    CardType:string = '' ;
    CardNumber:string = '';
    Cvv : number = 0 ;
    ExpiryDate : string = '';

    constructor(cardType:string, cardNumber:string, cvv:number, expiry:string){
        this.CardNumber = cardNumber ;
        this.CardType = cardType ;
        this.Cvv = cvv ;
        this.ExpiryDate = expiry ;

        console.log(this.CardType + " - " + this.CardNumber + " - " + this.Cvv + " - " + this.ExpiryDate);
    }
}
