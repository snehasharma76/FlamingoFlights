export class Register{
    CustomerId: number = 0;
    FirstName: string = '';
    LastName: string = '';
    DateOfBirth: string = '';
    AadharId: string = '';
    Password: string = '';
    Email: string = '';
    

    constructor(fn:string, ln:string, email:string, dob:string,aadhar:string,pass:string){
        this.FirstName = fn ;
        this.LastName = ln ;
        this.Email = email ;
        this.DateOfBirth = dob ;
        this.AadharId = aadhar ;
        this.Password = pass ;
    }
}
