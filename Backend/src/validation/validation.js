
export const validation = (Schema)=>{
    return (req , res , next) => {
        let check = Schema.validate(req.body,{abortEarly:false});
        if(check && check.error){
            res.json({message:"validation error",error:check.error})
        }else{
            next()
        }
    }
}



