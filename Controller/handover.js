const databaseconnector = require("../Config/db")

const handover = async (req, res) => {
    const { filenumber, date, givenby, receivedby, handovertype, approved, remark } = req.body;
    const fields = [filenumber, date, givenby, receivedby, handovertype, approved, remark];
    const checkfiled = fields.filter(field => !field)
    if (checkfiled.length > 0) {
        return res.status(400).json({ message: "Fields cannot be empty" });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        console.log(date, !/^\d{4}-\d{2}-\d{2}$/.test(date));
        return res.status(400).json({ message: "date must be in the format yyyy-mm-dd" });
    }
    if (handovertype === 'permanent') {
        console.log('This is a permanent handover.');
      } else if (handovertype=== 'temporary') {
        console.log('This is a temporary handover.');
      } else {
        console.log('Invalid handover type.');
      }
    try {
        const value = [filenumber, date, givenby, receivedby,handovertype, approved, remark];
        const query = 'INSERT INTO handover (filenumber,date,givenby,receivedby,handovertype,approved,remark) VALUES (?,?,?,?,?,?,?)';
        databaseconnector.connection.query(query, value, (error, result) => {
            if (error) {
                console.log(error)
                return res.status(500).json({ message: "database connection eror" });
            }
            return res.status(200).json({ message: "handover apply sucessfully" })
        })
    } catch (error) {
        return res.status(404).json({ message: "internal server error" })

    }

}

const handovertable = async (req, res) => {
    const { filenumber, date, receivedby, givenby, handovertype, approved, remark } = req.body;
    try {
        const value = [filenumber, date, givenby, receivedby, handovertype, approved, remark];
        const query = 'SELECT * FROM handover ORDER BY id DESC';

        databaseconnector.connection.query(query, value,(error, result) => {
            if (error) {
                return res.status(500).json({ message: "handover data retreived sucessfully" });
            }
            return res.status(200).json({ message: "handover data retreived sucessfully",result });
        })

    }


    catch (error) {
        return res.status(404).json({ message: "internal server error" });

    }

}

module.exports = {
    handover,handovertable
}