import mongoose from 'mongoose';

const csvContentSchema = mongoose.Schema({
    CSVId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'CSV'},
    State_UT: { type: String },
    TotalCases: { type: Number},
    ActiveCases: {type: Number},
    Discharged: {type: Number},
    Deaths: {type: Number},
    ActiveRatio: {type: Number},
    DischargeRatio: {type: Number},
    DeathRatio: {type: Number},
}, {timestamps: true});

export default mongoose.model('CSVContent',csvContentSchema);

/* 
This is the actual model where parsed CSV data are stored in mongoDB collection
CSVId is the important attribute here as it is used for reference to 
the CSV File Information Model where meta Data of each contents are stored 
*/