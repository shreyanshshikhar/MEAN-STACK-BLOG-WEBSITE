export class Accountinfo {
    Name: string;
    Email: string;
    Password: string;
  results: any;
  msg: string | undefined;

    constructor() {
        this.Name = '';
        this.Email = '';
        this.Password = '';
    }
    //help ki frnt end pr hi pta chl jai kis type ka data insert krna hai takki backend par jyada query na chalani ki jarurat ho
}
