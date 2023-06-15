const databaseconnector=require("../../Config/db")

const level1=async(req,res)=>{
const{email,password,confirmpassword}=req.body
const value=[email,password,confirmpassword];
    try {
   const query="INSERT INTO level1 (email,password,confirmpassword) VALUES (?,?,?)"
   console.log(email)
   databaseconnector.connection.query(query,value,(error,result)=>{
    if(error){
        console.log(error)
        return res.status(500).json({message :"dataconnection error"})
    }
    return res.status(200).json({message:"level  insert sucessfully"})
   })
 
} catch (error) {
    return res.status(404).json({message:"internal connection error"})
    
}


}
module.exports={
    level1
}