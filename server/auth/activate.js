const dbw = require('../db/wrapper').dbw;

function activate(params) {
    const activation_id = params.activation_id;
    return new Promise((resolve, reject) => {
        const set = { activated: true }
        const where = { activation_id: activation_id }
        dbw.update("users", where, set).then(() => {
            var result = {
                success: true,
                message: "User activated"
            }
            resolve(result);
        }).catch((err) => {
            console.log(err)
            var result = {
                success : false,
                message: "Error While Updating. Try again."
            }
            reject(result);
        });;
    });
}

module.exports = {
    activate,
};
