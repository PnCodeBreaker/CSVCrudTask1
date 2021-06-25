import mongoose from 'mongoose';
import path from 'path';
import csvtojson from 'csvtojson';
import fs from 'fs/promises';
import CSVModel from '../models/csv.js';
import CSVContent from '../models/csvContent.js';
import { basicInputValidation } from './utilityFunction/basicInputValidation.js';

const __dirname = path.resolve();

/* This Controller is responsible for upload of the CSV file and parsing it and pushing it to mongoDB collection */
/* For Parsing the CSV csvtojson third party package is used */

/* The main idea is to take the file form multi part form and 
save it temporarly in a folder and parse it by csvtojson by replacing the csv headers with custom headers
and then mapping it again and adding csvID which is reference to another collection that 
stores the metaData about the CSVFile and finally using mongoose pushing it to mongodb */

export const createCSV = async(req,res) => {
    const { filename, createrName } = req.body;
    const csvFile = req.files.csvFile;
    const {userId, userEmail}  = req;
    try {
        basicInputValidation(filename,createrName,userId,userEmail,csvFile);
        const localfilename = new Date().getTime().toString() + path.extname(csvFile.name);
        const savePath = path.join( __dirname, 'csvfileupload', localfilename);
        await csvFile.mv(savePath);
        const jsonArray = await csvtojson({ 
            noheader: false, 
            headers: ['State_UT', 'TotalCases', 'ActiveCases', 'Discharged', 'Deaths', 'ActiveRatio', 'DischargeRatio', 'DeathRatio']
        }).fromFile(savePath);
        try {
            if(jsonArray)
            {
               await fs.unlink(savePath);
            }
        }
        catch (error)
        {
            return res.status(400).json({ errorMesage: error.message, message: "unable to parse CSV file"});
        }
        const csvFileDetails = new CSVModel({ filename: filename, createrEmail: userEmail, createrName: createrName, createrId: userId })
        try {
            await csvFileDetails.save();
        }
        catch(error) {
           return res.status(400).json({ message: 'could not save csv parsed data to mongoDB, try again'});
        }
        const csvId = csvFileDetails._id;
        console.log(csvId); 
        const csvJsonArray = jsonArray.map((csvdata) => (
            {
                CSVId: csvId,
                State_UT: csvdata.State_UT,
                TotalCases: Number(csvdata.TotalCases),
                ActiveCases: Number(csvdata.ActiveCases),
                Discharged: Number(csvdata.Discharged),
                Deaths: Number(csvdata.Deaths),
                ActiveRatio: Number(csvdata.ActiveRatio),
                DischargeRatio: Number(csvdata.DischargeRatio),
                DeathRatio: Number(csvdata.DeathRatio)
            }
        )); 
        try {
           const csvData =  await CSVContent.insertMany(csvJsonArray);
            res.status(201).json({ message: 'CSV parsed and Successfully saved in mongoDB', CSVFileDeatils: csvFileDetails, CSV_DATA: csvData});
        }
        catch (error)
        {
            return res.status(404).json({ message: 'unable to save CSVData Contents, try again'});
        }

    } catch (error) {
        return res.status(404).json({ message: 'something went wrong'});
    }   
}

/* This Controller will get the CSV file meta Data
 ( not actual contents inside csv ) created by the current authenticated user */
export const getCSV = async(req,res) => {
    const userId = req.userId;
    console.log(userId);
    try {
        const CSVFileCreatedByUser = await CSVModel.find({ createrId: userId});
        console.log(CSVFileCreatedByUser);
        res.status(201).json(CSVFileCreatedByUser);
    }
    catch (error) {
       return res.status(400).json({ message: error.message });
    }
}
/* This Controller will update the CSV file meta Data 
 ( not actual contents inside csv ) of a given ID created by the current authenticated user */
export const updateCSV = async(req,res) => {
    const {id} = req.params;
    const { filename } = req.body;
    if(!filename) return res.status(404).send('No filename is uploaded');
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    try {
        const updatedPost = await CSVModel.findByIdAndUpdate(id, { filename: filename }, { new: true });
        res.status(201).json({ updatedPost, message: "Filename is uploaded successFully"});
    } catch (error) {
        return res.status(400).json({ error: error.message, message: "something went wrong"});
    }
    
}
/* This Controller will delete the CSV 
   file meta Data provided its id in params and all contents in CSV as well
 */

export const deleteCSV = async(req,res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    try {
        await CSVContent.deleteMany({ CSVId: id });
        await CSVModel.findByIdAndDelete(id);
        res.status(201).json({ message: "deleted the file and its contents successFully"});
    } catch (error) {
        return res.status(400).json({ error: error.message, message: "something went wrong"});
    }
}