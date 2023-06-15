 const databaseconnector=require("../Config/db")

const chalani = (req, res) => {
    const {
        date,
        miti,
        totalreceivedletter,
        receiveddate,
        letterissuecompany,
        subject,
        previousrefno,
        ticket,
        remark
    } = req.body;

    const fields = [
        date,
        miti,
        totalreceivedletter,
        receiveddate,
        letterissuecompany,
        subject,
        previousrefno,
        ticket,
        remark
    ];
    const emptyFields = fields.filter(field => !field);
    if (emptyFields.length > 0) {
        return res.status(400).json({ message: "Fields cannot be empty" });
    }

      // Validation checks


    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        console.log(date, !/^\d{4}-\d{2}-\d{2}$/.test(date));
        return res.status(400).json({ message: "date must be in the format yyyy-mm-dd" });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(miti)) {
        return res.status(400).json({ message: "miti must be in the format yyyy-mm-dd" });
    }
    
    if (typeof (letterissuecompany) !== "string") {
        return res.status(400).json({ message: "letterissuecompany must be a string" });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(receiveddate)) {
        return res.status(400).json({ message: "receiveddate must be in the format yyyy-mm-dd" });
    }


    




    try {
        const query = 'INSERT INTO chalani( date, miti, totalreceivedletter, receiveddate, letterissuecompany, subject, previousrefno, ticket, remark) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [ date, miti, totalreceivedletter, receiveddate, letterissuecompany, subject, previousrefno, ticket, remark];

        databaseconnector.connection.query(query, values, (error, result) => {
            if (error) {
                console.log(error)
                return res.status(500).json({ message: "Database connection error" });
            }
            return res.status(200).json({ message: "Chalani data is successfully inserted",});
        });
    } catch (error) {
        return res.status(404).json({ message: "Internal error" });
    }
};


///to show the calani data
const chalanitable=async(req,res)=>{
    const {
        number,
        date,
        miti,
        totalreceivedletter,
        receiveddate,
        letterissuecompany,
        subject,
        previousrefno,
        ticket,
        remark
    } = req.body;
 
    try {
        const query = 'SELECT * FROM chalani ORDER BY number DESC';
        const values = [ number, date, miti, totalreceivedletter, receiveddate, letterissuecompany, subject, previousrefno, ticket, remark];
        databaseconnector.connection.query(query, values, (error, result) => {
            if (error) {
                console.log(error)
                return res.status(500).json({ message: "Database connection error" });
            }
            return res.status(200).json({ message: "Chalani data is successfully retrie", result });
        });
    } catch (error) {
        return res.status(404).json({message:"internal Error"})        
    }
}

module.exports = {
chalani,chalanitable
};
