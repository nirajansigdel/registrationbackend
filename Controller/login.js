const databaseconnector = require("../Config/db");



//==========================Regsitration section============================

const Registration = async(req, res) => {
    const {email, username, password} = req.body;
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid email format." });
        }
      
        // Username validation
        const usernameRegex = /^[a-zA-Z]{3,32}$/;
        if (!username || !usernameRegex.test(username)) {
          return res.status(400).json({ message: "Invalid username format." });
        }
      
        // Password validation
        const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W)(?!.*\s).*$/;
        if (!password || !passwordRegex.test(password)) {
          return res.status(400).json({
            message:
              "Password should contain at least one digit, one uppercase letter, and one special character.",
          });
        }


        const query = 'INSERT INTO  registration (email,username,password) VALUES (?,?,?)';
        databaseconnector.connection.query(query, [email,username,password], (error, result) => {
            if(error){
                return res.status(500).json({message:"database error"})
            }

            //to create the connection where connection isthe module of database

            return res.status(200).json({message:"registration sucessfully"})

        })

    } catch (error) {
        return res.status(404).json({message:"internal server error"})

    }


}
//==========================login section============================

const Login=async(req,res)=>{
    const{username,password}=req.body;
    try {
        const query=`SELECT * FROM registration WHERE username=?`
        databaseconnector.connection.query(query,[username],(error,result)=>{
    
            if(error){
                return res.status(500).json({message:"database connection error"})
            }
            if(result.length===0){
                return res.status(404).json({message:"user not found"})
            }
            const user=result[0];
            if(user.password !==password){
                return res.status(401).json({message:"password invalid",})
            }
            res.status(200).json({message:"login sucessfully"})
        })
    } catch (error) {
        return res.status(404).json({message:"internal server error"})
        
    }
   

}

module.exports={
    Login,Registration
}


