const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollnumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },

    flag: {
        type:Boolean,
        required: true
    },
    engAttended: {
        type: Number,
        required: false
    },
    engTotal: {
        type: Number,
        required: false
    },
    engPercentage: {
        type: Number,
        required: false
    },
    mathAttended: {
        type: Number,
        required: false
    },
    mathTotal: {
        type: Number,
        required: false
    },
    mathPercentage: {
        type: Number,
        required: false
    },
    phyAttended: {
        type: Number,
        required: false
    },
    phyTotal: {
        type: Number,
        required: false
    },
    phyPercentage: {
        type: Number,
        required: false
    },
    chemAttended: {
        type: Number,
        required: false
    },
    chemTotal: {
        type: Number,
        required: false
    },
    chemPercentage: {
        type: Number,
        required: false
    },
    notice: {
        type: String,
        required: false
    },
    st1Math: {
        type: Number,
        required: false
    },
    st2Math: {
        type: Number,
        required: false
    },
    st3Math: {
        type: Number,
        required: false
    },
    endMath: {
        type: Number,
        required: false
    },
    st1Eng: {
        type: Number,
        required: false
    },
    st2Eng: {
        type: Number,
        required: false
    },
    st3Eng: {
        type: Number,
        required: false
    },
    endEng: {
        type: Number,
        required: false
    },
    st1Chem: {
        type: Number,
        required: false
    },
    st2Chem: {
        type: Number,
        required: false
    },
    st3Chem: {
        type: Number,
        required: false
    },
    endChem: {
        type: Number,
        required: false
    },
    st1Phy: {
        type: Number,
        required: false
    },
    st2Phy: {
        type: Number,
        required: false
    },
    st3Phy: {
        type: Number,
        required: false
    },
    endPhy: {
        type: Number,
        required: false
    }


});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;