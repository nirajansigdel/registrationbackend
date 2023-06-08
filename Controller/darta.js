const databaseconnector = require("../Config/db");
const NepaliDate = require('nepali-date-converter')

const darta = async (req, res) => {
    const {
        sn,
        number,
        date,
        miti,
        totalrecievedletter,
        receiveddate,
        letterissuecompany,
        officerefno,
        subject,
        previousrefno,
        name,
        Signature,
        signaturedate,
        Remark
    } = req.body;


    // Check for empty fields
    const fields = [
        sn,
        number,
        date,
        miti,
        totalrecievedletter,
        receiveddate,
        letterissuecompany,
        officerefno,
        subject,
        previousrefno,
        name,
        Signature,
        signaturedate,
        Remark
    ];

    const emptyFields = fields.filter(field => !field);

    if (emptyFields.length > 0) {
        return res.status(400).json({ message: "Fields cannot be empty" });
    }

    // Validation checks
    if (sn !== number) {
        return res.status(400).json({ message: "sn and number must be the same" });
     
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        console.log(date, !/^\d{4}-\d{2}-\d{2}$/.test(date));
        return res.status(400).json({ message: "date must be in the format yyyy-mm-dd" });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(miti)) {
        return res.status(400).json({ message: "miti must be in the format yyyy-mm-dd" });
    }
    
    if (typeof letterissuecompany !== "string") {
        return res.status(400).json({ message: "letterissuecompany must be a string" });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(signaturedate)) {
        return res.status(400).json({ message: " signaturedate must be in the format yyyy-mm-dd" });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(receiveddate)) {
        return res.status(400).json({ message: "receiveddate must be in the format yyyy-mm-dd" });
    }

    if (typeof name !== "string") {
        return res.status(400).json({ message: "name must be a string" });
    }


    try {
        const query = 'INSERT INTO darta ( number, date, miti, totalrecievedletter, receiveddate, letterissuecompany, officerefno, subject, previousrefno, name, Signature, signaturedate, Remark) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [number, date, miti, totalrecievedletter, receiveddate, letterissuecompany, officerefno, subject, previousrefno, name, Signature, signaturedate, Remark];

        databaseconnector.connection.query(query, values, (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Database error in table" });
            }

            return res.status(200).json({ message: "Darta successfully inserted" });
        });
    } catch (error) {
        console.error(error);
        return res.status(404).json({ message: "Internal server error" });
    }
};

//to show the apply data or total number of darta
const dartatabel = async (req, res) => {
    const {
        sn,
        number,
        date,
        miti,
        totalrecievedletter,
        receiveddate,
        letterissuecompany,
        officerefno,
        subject,
        previousrefno,
        name,
        Signature,
        signaturedate,
        Remark
    } = req.body;

    try {
        const query = `SELECT * FROM darta`
        const value = [
            sn,
            number,
            date,
            miti,
            totalrecievedletter,
            receiveddate,
            letterissuecompany,
            officerefno,
            subject,
            previousrefno,
            name,
            Signature,
            signaturedate,
            Remark
        ];

        databaseconnector.connection.query(query, value, (error, result) => {
            if (error) {
                return res.status(500).json({ message: "database connection error in table" })
            }
            console.log(value)
            return res.status(200).json({ message: "darta shown sucessfully",result})
        })

    } catch (error) {
        return res.status(404).json({ message: "internal server error" })

    }
}

module.exports = { darta, dartatabel };
