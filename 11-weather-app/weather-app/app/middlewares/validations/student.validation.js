const checkEmpty = (req, res, next) => {
    const { fullName, age, numberClass } = req.body;
    if (fullName && age && numberClass) {
        next();
    } else {
        res.status(500).send("Can not empty data");
    }
};

const checkNumberClass = (req, res, next) => {
    const { numberClass } = req.body;
    if (numberClass >= 1 && numberClass <= 12) {
        next();
    } else {
        res.status(500).send("numberClass phai tu 1-12");
    }
};

module.exports = {
    checkEmpty,
    checkNumberClass,
};
