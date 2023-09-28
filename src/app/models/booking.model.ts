export class Booking {
    pnrNo?: number;
    bookingDate?: string;
    flightId?: number;
    flightDate?: string;
    numberOfPassengers?: number;
    ratePerSeat?: number;
    paymentMode?: string;
    customerId?: number;

    constructor(bdate:string, fid:number, fd:string, nop:number,rps:number, pm:string, cd:number){
        this.bookingDate = bdate ;
        this.flightId = fid ;
        this.flightDate = fd ;
        this.numberOfPassengers = nop ;
        this.ratePerSeat = rps ;
        this.paymentMode = pm ;
        this.customerId = cd ;
    }
}
