export class SignUp {

    id!:number;
    name!:string;
    surname!:string;
    email!:string;
    password!:string;
    permisson!:number;

    constructor(id:number,name:string,surname:string, email:string, password:string, permisson:number){
        
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.permisson=permisson;
    }

}
