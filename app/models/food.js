var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
	foodName: {
        type: String,
        default: ''
    },
	price: {
        type: Number,
        default: ''
    },
});