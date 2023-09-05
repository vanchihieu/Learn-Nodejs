function callBackFunction(errors, value) {
    if (errors) {
        return new Error(errors);
    }

    // xử lý value
    console.log(value);
    return value;
}

callBackFunction(null, './public') // node test-cb.js