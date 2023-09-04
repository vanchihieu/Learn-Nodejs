const logFeature =  (req, res, next) => {
    console.log("them 1 middleware nua");
    next();
}

module.exports = {
    logFeature
}