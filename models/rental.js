const mongoose = require('mongoose');
const joi = require('joi');
const { boolean } = require('joi');

const Rental = mongoose.model('Rental', new mongoose.schema({
    customer: {
        type: new mongoose.schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone:{
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.schema({
            title: {
                type: String,
                required: true,
                trim: true, 
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate:{
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true        
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    });
    return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;

