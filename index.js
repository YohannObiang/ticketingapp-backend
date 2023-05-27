const express = require('express')
const cors = require('cors')
const app = express()
const multer = require("multer");
const path = require("path");
var mysql = require("mysql");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const moment = require('moment');

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
    host     : 'db4free.net',
    user     : 'yohannobiang',
    password : '@Bolo1997',
    database : 'obisto',
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



// Lister les organisateurs
app.get('/organisateurs', (req, res)=>{
    
    con.query('SELECT * FROM organisateurs',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})

// Lister les evenements
app.get('/evenements', (req, res) => {
  const query = 'SELECT * FROM evenements';

  con.query(query, (err, rows) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    // Formatage des dates au format "JJ-MM-AAAA HH-MM"
    const formattedRows = rows.map(row => {
      const formattedDate = moment(row.date).format('DD-MM-YYYY à HH:mm');
      return { ...row, date: formattedDate };
    });

    res.json(formattedRows);
  });
});


  // Route GET pour récupérer les éléments de la base de données
//   app.get('/elements', (req, res) => {
//     // Requête SQL pour sélectionner les éléments
//     const sql = 'SELECT * FROM evenements';
  
//     // Exécution de la requête
//     con.query(sql, (err, results) => {
//       if (err) {
//         console.error('Erreur lors de l\'exécution de la requête :', err);
//         res.status(500).send('Erreur du serveur');
//         return;
//       }
  
//       // Formater l'attribut de type DATETIME
//       const formattedResults = results.map((row) => {
//         // Vous pouvez utiliser la librairie moment.js ou d'autres méthodes pour formater la date
//         const formattedDateTime = `${row.date.getDate()}-${row.date.getMonth() + 1}-${row.date.getFullYear()} ${row.date.getHours()}:${row.datetime_field.getMinutes()}`;
  
//         // Retourner une nouvelle version de l'objet avec la date formatée
//         return {
//           ...row,
//           datetime_field: formattedDateTime
//         };
//       });
  
//       // Renvoyer les résultats formatés en tant que réponse JSON
//       res.json(formattedResults);
//     });
//   });
  

// Lister les categories de billet d'un evenement
app.get('/categoriesbillet/evenement/:id', (req, res)=>{
    
    con.query('SELECT * FROM categoriesbillet WHERE id_evenement=?',[req.params.id],(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})

// Lister les categories de billet d'un evenement
app.get('/onspot', (req, res) => {
    const query = 'SELECT * FROM evenements WHERE onspot=1';
  
    con.query(query, (err, rows) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err);
        res.status(500).json({ error: 'Erreur serveur' });
        return;
      }
  
      // Formatage des dates au format "JJ-MM-AAAA HH-MM"
      const formattedRows = rows.map(row => {
        const formattedDate = moment(row.date).format('DD-MM-YYYY à HH:mm');
        return { ...row, date: formattedDate };
      });
  
      res.json(formattedRows);
    });
  });

  // Tri des evenements par categorie
app.get('/closestevents', (req, res) => {
  const query = 'SELECT * FROM evenements ORDER BY date';

  con.query(query, (err, rows) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    // Formatage des dates au format "JJ-MM-AAAA HH-MM"
    const formattedRows = rows.map(row => {
      const formattedDate = moment(row.date).format('DD-MM-YYYY à HH:mm');
      return { ...row, date: formattedDate };
    });

    res.json(formattedRows);
  });
});
  
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