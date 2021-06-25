import mongoose from 'mongoose';

const csvSchema = mongoose.Schema({
    filename: { type: String, required: true},
    createrEmail: { type: String, required: true},
    createrName: { type: String, required: true},
    createrId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
},
{timestamps: true});

export default mongoose.model('CSV',csvSchema);

/* 
This is the CSV File Data Information Model 
( it can be thought of as a Meta Data collection model of all CSV files uploaded ) 
where filename and CreaterId/ userId is stored so 
that different users can create and delete entire CSV file , 
Though the original contents are stored in csvdata model 
*/