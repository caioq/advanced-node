exports.id = 1; // this is ok

exports = { id: 1 } // this is not ok

// when we need to replace the export object, it not works directly, it needs to use the module
module.exports = { id: 2 } // this is ok

var g = 42; // local to this file, only the things we export are available