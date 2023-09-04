const checkExist = (Model) => {
    return async (req, res, next) => {
        // kiem tra xem station co ton tai ko
        const { id } = req.params;
        const station = await Model.findOne({
            where: {
                id,
            },
        });
        if (station) {
            next();
        } else {
            res.status(404).send(`Không tìm thấy station có id là : ${id}`);
        }
    };
};

module.exports = {
    checkExist,
};
