const express = require('express')
const cors = require('cors')
const app = express()
const multer = require("multer");
const path = require("path");
var mysql = require("mysql");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
       cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
 });
 var upload = multer({ storage: storage });

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Base de donnees connectee')
})

app.listen(process.env.PORT || 3001)

app.use(express.json())
app.use(cors())
app.use(errHandler);
app.use('/uploads', express.static('uploads'));

const con = mysql.createPool({
    connectionLimit : 100,
    waitForConnections : true,
    queueLimit :0,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'ebillet',
    debug    :  true,
    wait_timeout : 28800,
    connect_timeout :10
});

con.getConnection ((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log('connexion établie');
    }
})

// Ajouter une image
app.post('/uploadfile', upload.single('dataFile'), (req, res, next) => {
   const file = req.file;
   if (!file) {
      return res.status(400).send({ message: 'Please upload a file.' });
   }
   return res.send({ message: 'File uploaded successfully.', file });
});

// Lister les evenements
app.get('/evenements', (req, res)=>{
    
    con.query('SELECT * FROM evenements',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})

// Lister les organisateurs
app.get('/organisateurs', (req, res)=>{
    
    con.query('SELECT * FROM organisateurs',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})

// Lister les categories de billet d'un evenement
app.get('/categoriesbillet/evenement/:id', (req, res)=>{
    
    con.query('SELECT * FROM categoriesbillet WHERE id_evenement=?',[req.params.id],(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})

// Lister les categories de billet d'un evenement
app.get('/onspot', (req, res)=>{
    
    con.query('SELECT * FROM evenements WHERE onspot=1',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})

// Lister les categories de billet
app.get('/categoriesbillet', (req, res)=>{
    
    con.query('SELECT * FROM categoriesbillet',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})

// Lister les evenements d'un organisateur
app.get('/evenements/organisateur/:id', (req, res)=>{
    
    con.query('SELECT * FROM evenements WHERE id_organisateur=?',[req.params.id],(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})

app.use('/profile', express.static('upload/images'));

app.post("/upload", upload.single('profile'), (req, res) => {

    res.json({
        success: 1,
        // profile_url: `http://localhost:3001/profile/${req.file.filename}`
    })
})

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}