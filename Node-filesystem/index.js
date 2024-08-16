const express= require("express");
const fs =require("fs");
const path=require("path");

const app = express();
const port=3000;
const folderPath =path.join(__dirname,"public");
// console.log("path",path);
// console.log("__dirname",__dirname);
// console.log("folderPath",folderPath);

//check folder wheather the folder exist
if (!fs.existsSync(folderPath)){
    console.log("creating public folder");
    fs.mkdirSync(folderPath)
}

// endpoint to create with the text file with current time stamp
app.post("/create-file",(req,res) => {
    const timestamp =new Date()
    const fileName=`${timestamp.toISOString().replace(/:/g,"-")}.txt`
    const filePath =path.join (folderPath,fileName)

    fs.writeFile(filePath,timestamp.toString(),(error) =>{
        if(error){
            console.log("error",error)
            return res.status(500).json({message:`Error in writting the file ${error}`})
        }
                
            res.json({message:"File created sucessfully:",fileName})
        
    });
});

app.get("/get-files",(req,res) => {


    fs.readdir(folderPath,(error,files) =>{
        if(error){
            console.log("error",error)
            return res.status(500).json({message:`Error in getting files ${error}`})
        }
                
            res.json({message:"File shown successfully: ",files})
        
    });
}); 

const timestamp = new Date();
// console.log(timestamp)
// console.log("filename-before", timestamp);
// console.log("filename-after", timestamp);
app.listen(port, () =>{
    console.log(`NodeJs is running  in http://localhost:${port}`);
});