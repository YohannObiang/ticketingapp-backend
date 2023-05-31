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
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { log } = require('console');
app.use(express.json());


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

// const con = mysql.createPool({
//   connectionLimit : 100,
//   waitForConnections : true,
//   queueLimit :0,
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'ebillet',
//   debug    :  true,
//   wait_timeout : 28800,
//   connect_timeout :10
// });

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


// const users = [
//   { id: 1, username: 'john', password: 'secret' } // password: "secret"
// ];

// Connexion route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
 
  con.query('SELECT * FROM organisateurs',(err,users)=>{
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return res.status(401).json({ message: 'Utilisateur non trouvé.' });
  }
  
  // bcrypt.compare(password, user.password, (err, result) => {
    if (user.password === password) {
      const token = jwt.sign({ userId: user.id }, ';osojfgaw;org9al;srgn;awk4uuv%&*);kljB;jB3Ljhv/}[hH', { expiresIn: '10h' });
      return res.json({ message: 'Connexion réussie.', token });
    } else {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }
  })

  });
// });

// Déconnexion route (facultative avec JWT)
// Pour déconnecter un utilisateur avec JWT, vous devez gérer cela côté client en supprimant le JWT stocké.

// Ressource protégée route
app.get('/api/protected', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé.' });
  }

  jwt.verify(token, ';osojfgaw;org9al;srgn;awk4uuv%&*);kljB;jB3Ljhv/}[hH', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide.' });
    }

    // Vérification réussie, accédez à la ressource protégée
    const userId = decoded.userId;
    // Faites quelque chose avec l'ID de l'utilisateur (par exemple, récupérez les données de l'utilisateur à partir de votre base de données)
    res.json({ message: userId });
  });
});

app.post('/api/check-auth', (req, res) => {
  const { token } = req.body;
  
  try {
    // Vérifier la validité du token JWT
    const decodedToken = jwt.verify(token, ';osojfgaw;org9al;srgn;awk4uuv%&*);kljB;jB3Ljhv/}[hH');
    const idd = decodedToken
    console.log(decodedToken);
    res.json({ valid: true, message: {idd} });

  } catch (error) {
    res.json({ valid: false });
  }
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

// Lister les billets vendus
app.get('/billetsvendus', (req, res) => {
  const query = 'SELECT * FROM billetsvendus';

  con.query(query, (err, rows) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    // Formatage des dates au format "JJ-MM-AAAA HH-MM"
    const formattedRows = rows.map(row => {
      const formattedDateAchat = moment(row.date_achat).format('DD-MM-YYYY à HH:mm');
      return { ...row, date_achat: formattedDateAchat};
    });

    res.json(formattedRows);
  });
});




// Lister les categories de billet d'un evenement
app.get('/categoriesbillet/evenement/:id', (req, res)=>{
    
    con.query('SELECT * FROM categoriesbillet WHERE id_evenement=?',[req.params.id],(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})

// Lister les evenements onspot
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

// Lister les details d'une categorie de billet
app.get('/categoriesbillet/:id', (req, res)=>{
    
  con.query('SELECT * FROM categoriesbillet WHERE id_categoriesbillet=?',[req.params.id],(err,result)=>{
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

//Ajouter un billet vendu;
app.post('/ajout/billetvendu', (req, res) => {
  const id_evenement = req.body.id_evenement;
    const id_categoriebillet = req.body.id_categoriebillet;
    const categoriebillet = req.body.categoriebillet;
    const prix = req.body.prix;
    const nom_acheteur = req.body.nom_acheteur;
    const prenom_acheteur = req.body.prenom_acheteur;
    const email_acheteur = req.body.email_acheteur;
    const whatsapp_acheteur = req.body.whatsapp_acheteur;
    const date_achat = new Date();

  con.query('INSERT INTO billetsvendus VALUES(NULL,?,?,?,?,?,?,?,?,?)', [id_evenement, id_categoriebillet, categoriebillet, prix, nom_acheteur, prenom_acheteur, email_acheteur, whatsapp_acheteur, date_achat], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const id_billetvendu = result.insertId; // Récupération de l'ID généré

      res.send({ id_billetvendu: id_billetvendu });
    }
  });
});


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