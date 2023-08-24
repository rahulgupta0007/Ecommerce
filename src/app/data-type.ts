export interface SignUp{
    name:string,
    password:string,
    email:String
}

export interface loginup{
    email:string,
    password:string
}

export interface productType{
    productName:string,
    productPrice:string,
    productCategory:string,
    productDiscription:string,
    productColor:string,
    productImageUrl:string,
    Quentity:undefined | number,
    id:number,
    productId:undefined|number
    
}

export interface cart{
    productName:string,
    productPrice:string,
    productCategory:string,
    productDiscription:string,
    productColor:string,
    productImageUrl:string,
    Quentity:undefined | number,
    id:number | undefined,
    productId: number,
    userId:number
    
}

export interface userSignup{
    user:string,
    password:string,
    email:string
}