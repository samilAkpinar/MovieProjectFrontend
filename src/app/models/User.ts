export class User {
    
    id!:number;
    name!:string;
    surname!:string;
    email!:string;
    password!:string;
    token!:string;
    sessionId!:string;
    permisson!:number;

    constructor(id:number,name:string,surname:string, email:string, password:string,token:string, sessionId:string, permisson:number){
        
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.token = token;
        this.sessionId = sessionId;
        this.permisson=permisson;
    }

}
