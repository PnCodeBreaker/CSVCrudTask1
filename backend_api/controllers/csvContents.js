import mongoose from 'mongoose';
import CSVModel from '../models/csv.js';
import CSVContent from '../models/csvContent.js';
import { basicInputValidationCSVData } from "./utilityFunction/basicInputValidation.js";

/* This controller will fetch all the CSV Contents/Data inside 
the provided CSVFile whose ID is provided in params */

export const getCSVContent = async(req,res) => {
    const { csvId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(csvId)) return res.status(404).send(`No post with id: ${csvId}`);
    try {
        const CSVdata = await CSVContent.find({ CSVId: csvId }).sort({ updatedAt: -1 });
        console.log(CSVdata);
        res.status(201).json(CSVdata);
    } catch (error) {
        return res.status(400).json({ error: error.message, message: 'could not fetch data' });
    }
}
/* This controller will create a new CSV Content/Data inside 
the provided CSVFile whose ID is provided in params */

export const createCSVContent = async(req,res) => {
    const { csvId } = req.params;
    const { State_UT, TotalCases, ActiveCases, Discharged, Deaths, ActiveRatio, DischargeRatio, DeathRatio } = req.body;
    if (!mongoose.Types.ObjectId.isValid(csvId)) return res.status(404).send(`No post with id: ${csvId}`);
    try {
        basicInputValidationCSVData(State_UT, TotalCases, ActiveCases, Discharged, Deaths, ActiveRatio, DischargeRatio, DeathRatio);
        const csvIdExists = await CSVModel.exists({ _id: csvId });
        if(csvIdExists === false ) return res.status(404).json({ message: 'No csv model is created with that id'});
        const csvDataCreated = new CSVContent({ CSVId: csvId, State_UT, TotalCases, ActiveCases, Discharged, Deaths, ActiveRatio, DischargeRatio, DeathRatio })
        await csvDataCreated.save();
        res.status(201).json({ message: 'New csvDataCreated successfully', csvDataCreated});
    }
    catch (error)
    {
        return res.status(404).json({ message: 'Something went wrong', error: error.message});
    }
}
/* This controller will update a CSV Content/Data inside 
the provided CSVFile whose ID is provided in params */

export const updateCSVContent = async(req,res) => {
    const { csvContentId } = req.params;
    const { State_UT, TotalCases, ActiveCases, Discharged, Deaths, ActiveRatio, DischargeRatio, DeathRatio } = req.body;
    if (!mongoose.Types.ObjectId.isValid(csvContentId)) return res.status(404).send(`No post with id: ${csvContentId}`);
    try {
        basicInputValidationCSVData(State_UT, TotalCases, ActiveCases, Discharged, Deaths, ActiveRatio, DischargeRatio, DeathRatio);
        const csvIdDataExists = await CSVContent.exists({ _id: csvContentId});
        if(csvIdDataExists === false ) return res.status(404).json({ message: 'No csv Data Content is created with that id'});
        const updatedCSVData = await CSVContent.findByIdAndUpdate(csvContentId,{ State_UT, TotalCases, ActiveCases, Discharged, Deaths, ActiveRatio, DischargeRatio, DeathRatio }, {new: true});
        res.status(201).json(updatedCSVData);
    }
    catch (error)
    {
        return res.status(400).json({ error: error.message, message: "Something went wrong"});
    }
}

/* This controller will delete a CSV Content/Data inside 
the provided CSVFile whose ID is provided in params */

export const deleteCSVContent = async(req,res) => {
    const { csvContentId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(csvContentId)) return res.status(404).send(`No post with id: ${csvContentId}`);
    try {
        await CSVContent.findByIdAndDelete(csvContentId);
        res.status(201).json({ message: "CSV Content Data Deleted SuccessFully"});
    } catch (error) {
        return res.status(400).json({ message: "Unable To delete Something Went Wrong"});
    }
}