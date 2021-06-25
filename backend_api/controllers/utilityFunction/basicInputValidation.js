export const basicInputValidation  = (filename, createrName, userId, userEmail, csvFile ) => {
    if(!filename || !createrName )
        {
            return res.status(400).json({ message: 'Fill all the form inputs'});
        }
        if(!userId || !userEmail )
        {
            return res.status(400).json({ message: 'Authorization failed unable to get userId || userEmail'});
        }
        if(!csvFile || csvFile.mimetype!=='text/csv')
        {
            return res.status(400).json({ message: 'file upload failed / wrong csv file extension,only .csv is allowed'});
        }
}

export const basicInputValidationCSVData = (State_UT, TotalCases, ActiveCases, Discharged, Deaths, ActiveRatio, DischargeRatio, DeathRatio ) => {
    if(!State_UT || !TotalCases || !ActiveCases || !Discharged || !Deaths || !ActiveRatio || !DischargeRatio || !DeathRatio)
            {
                return res.status(404).json({ message: "Fill all the input Fields and try again"});
            }
}

/* This is a very Basic Utility Function Created to check some input validation */