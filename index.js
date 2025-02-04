const express = require('express')
const cors = require('cors')
const app = express()
const multer = require("multer");
const path = require("path");
const axios = require('axios');
var mysql = require("mysql");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
app.use(express.json());
const { Readable } = require('stream');
app.use(express.urlencoded({ extended: true }));
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

app.listen(process.env.PORT || 5000)

app.use(express.json())
app.use(cors())
app.use(errHandler);
app.use('/uploads', express.static('uploads'));

  const con = mysql.createPool({
      connectionLimit : 100,
      waitForConnections : true,
      queueLimit :0,
      host     : 'db4free.net',
      user     : 'ebillet',
      password : '@Bolo1997',
      database : 'ebillet',
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


app.post('/send-email/:email', async (req, res) => {
  const  {image}  = req.body;
  const  mailadress  = req.params.email;
  console.log(image.substring(22))
  // Convertir les données d'image en flux lisible
  const imageBuffer = Buffer.from(image, 'base64');
 console.log(Buffer.from(image, 'base64'));
  // Configurer le transporteur pour l'envoi de courrier électronique (utilisez votre propre configuration ici)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'yohanndian@gmail.com',
      pass: 'appjdywalykuvwhv',
    },
  });

  const mailOptions = {
    from: 'yohanndian@gmail.com',
    to: mailadress,
    subject: 'Billet électronique',
    html: '<p>Cher client, <br></br><br></br>Veuillez trouver en pièce jointe de cet e-mail votre billet électronique. <br></br><br></br> Cordialement, <strong>E-Billet</strong></p>',
    attachments: [
      {
        filename: 'E-Billet.png',
        content: image.substring(22),
        encoding: 'base64',
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'E-mail envoyé avec succès.' });
    }
  });
});





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

// Lister les retraits d'un organisateur
app.get('/retraits/organisateur/:id', (req, res) => {

  con.query('SELECT * FROM retraits WHERE id=?',[req.params.id],(err,rows)=>{
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

  app.put('/update/retrait/:id', (req, res)=>{


    const solde = req.body.solde;
    const id = req.params.id;

    
    
    con.query(`UPDATE retraits SET solde = ? WHERE retraits.id_retrait = ${id}`,[solde],(err,result)=>{
        if(err)
    {
        console.log(err)
    }else{
        res.send('Status updated successfully');
    }
    })
})


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

app.get('/evenement/categoriesbillet/:id', (req, res)=>{
    
  con.query('SELECT * FROM categoriesbillet WHERE id_evenement=?',[req.params.id],(err,result)=>{
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

app.get('/billetvendu/:id', (req, res)=>{
    
  con.query('SELECT * FROM billetsvendus WHERE id_billetvendu=?',[req.params.id],(err,result)=>{
      if(err) res.status(500).send(err)
      
      res.status(200).json(result)
  })
})

app.get('/organisateur/:id', (req, res)=>{
    
  con.query('SELECT * FROM organisateurs WHERE id=?',[req.params.id],(err,result)=>{
      if(err) res.status(500).send(err)
      
      res.status(200).json(result)
  })
})


app.get('/billetsvendus/categoriebillet/:id', (req, res)=>{
    
  con.query('SELECT * FROM billetsvendus WHERE id_categoriebillet=?',[req.params.id],(err,result)=>{
      if(err) res.status(500).send(err)
      
      res.status(200).json(result)
  })
})

app.get('/billetsvendus/evenement/:id', (req, res)=>{
    
  con.query('SELECT * FROM billetsvendus WHERE id_evenement=?',[req.params.id],(err,result)=>{
      if(err) res.status(500).send(err)
      
      res.status(200).json(result)
  })
})
  


app.put('/update/billetvendu/:id', (req, res)=>{


  const id = req.params.id;

  
  
  con.query(`UPDATE billetsvendus SET validity = 1 WHERE billetsvendus.id_billetvendu = ${id}`,(err,result)=>{
      if(err)
  {
      console.log(err)
  }else{
      res.send('Status updated successfully');
  }
  })




})

// Endpoint pour recevoir le callbackURL
app.post('/callback', (req, res) => {
    const { callbackURL } = req.body;

    if (!callbackURL || typeof callbackURL !== 'string') {
        return res.status(400).send({ message: 'Invalid callbackURL' });
    }

    console.log(`Callback URL reçu : ${callbackURL}`);

    // Vous pouvez ici sauvegarder ou traiter le callbackURL
    res.status(200).send({ message: 'Callback URL enregistré avec succès' });
});


app.put('/update/solde/:id', (req, res)=>{


  const id = req.params.id;
  const solde = req.body.solde;
      console.log(solde)
  
  
  con.query(`UPDATE organisateurs SET solde = ? WHERE organisateurs.id = ${id}`,[solde],(err,result)=>{
      if(err)
  {
      console.log(err)
      console.log(solde)
  }else{
      res.send('Status updated successfully');
            console.log(solde)

  }
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

  con.query('INSERT INTO billetsvendus VALUES(NULL,?,?,?,?,?,?,?,?,?,0)', [id_evenement, id_categoriebillet, categoriebillet, prix, nom_acheteur, prenom_acheteur, email_acheteur, whatsapp_acheteur, date_achat], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const id_billetvendu = result.insertId; // Récupération de l'ID généré

      res.send({ id_billetvendu: id_billetvendu });
    }
  });
});

//Ajouter un retrait;
app.post('/ajout/retrait', (req, res) => {
  const id = req.body.id;
    const date = new Date();
    const somme = req.body.somme;
    const solde = req.body.solde;
    const nouveau_solde = req.body.nouveau_solde;

  con.query('INSERT INTO retraits VALUES(NULL,?,?,?,?,?, "En cours")', [id, date, somme, solde, nouveau_solde], (err, result) => {
    if (err) {
      console.log(err);
    } else {
    res.send({ message: "POSTED" });
    }
  });
});





app.locals.secretKey = null; // Initialiser la clé

app.post('/callback/renew-secret', (req, res) => {
  console.log("📥 Clé secrète reçue :", req.body.secret_key);
  app.locals.secretKey = req.body.secret_key;


  const { operation_account_code, secret_key, expires_in } = req.body;

  if (!operation_account_code || !secret_key || !expires_in) {
      return res.status(400).json({
          responseCode: 400,
          message: "Données manquantes dans le callback",
          receivedData: req.body,
      });
  }

  // ✅ Stocker la clé secrète dans une variable (ou une base de données)
  console.log("🔑 Nouvelle clé stockée :", secretKey);

  res.status(200).json({
      responseCode: 200,
      message: "Callback Renew Secret traité avec succès",
      receivedData: { operation_account_code, secret_key, expires_in },
  });
});

app.post('/api/renew-secret', async (req, res) => {
  try {
      const response = await axios.post(
          'https://api.mypvit.pro/BDNNTIUVGBLANGWF/renew-secret',
          new URLSearchParams({
              operationAccountCode: 'ACC_679A0D221A79F',
              receptionUrlCode: 'V4GY7',
              password: '@Yodiang97' // ⚠ Remplace par ton mot de passe sécurisé
          }),
          {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          }
      );

      // Renvoi de la réponse API au frontend
      res.send({message: app.locals.secretKey});
  } catch (err) {
      console.error('❌ Erreur API:', err.response ? err.response.data : err.message);
      res.status(500).json({ error: err.response ? err.response.data : err.message });
  }
});


const API_URL = 'https://api.mypvit.pro/0H3U6T5XADVKU6PN/rest';

app.locals.paymentStatus = null;

app.post('/callback/payment', async (req, res) => {
  console.log('Callback reçu:', req.body);    
  app.locals.paymentStatus = 'req.body';
  try {



    const { transactionId, status, amount, customerID, fees, totalAmount, chargeOwner, transactionOperation, operator } = req.body;
    // Vérification que les données essentielles sont présentes
    if (!transactionId || !status || !amount || !customerID) {
      return res.status(400).json({
        message: 'Données manquantes ou incorrectes dans le callback',
      });
    }

    // Mise à jour de l'état du paiement après validation des données
    console.log('Nouvel état du paiement enregistré:', app.locals.paymentStatus);
    
    // Exemple d'enregistrement dans une base de données (si applicable)
    // await saveTransactionToDatabase(req.body);

    // Réponse confirmant le traitement du callback
    return res.status(200).json({
      responseCode: 200,
      transactionId: transactionId,
      status: status,
      message: 'Callback traité avec succès',
    });

  } catch (error) {
    console.error('Erreur lors du traitement du callback:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});


// Route pour traiter la transaction
app.post("/api/transaction", async (req, res) => {
  try {
    const transactionData = {
      agent: req.body.agent,
      amount: req.body.amount,
      reference: req.body.reference,
      product: req.body.product,
      service: req.body.service,
      callback_url_code: req.body.callback_url_code,
      customer_account_number: req.body.customer_account_number,
      merchant_operation_account_code: req.body.merchant_operation_account_code,
      transaction_type: req.body.transaction_type,
      owner_charge: req.body.owner_charge,
      operator_owner_charge: req.body.operator_owner_charge,
      free_info: req.body.free_info,
    };
    

    const headers = {
      "X-Secret": req.body.secretKey,
      "X-Callback-MediaType": "application/json",
      "Content-Type": "application/json",
    };

    const response = await axios.post(API_URL, transactionData, { headers });

    // res.json(response.data);

      
      if (app.locals.paymentStatus == null) {
        console.log('not yet ready')

        setTimeout(() => {

          if (app.locals.paymentStatus == null) {

            console.log('not yet ready')

            setTimeout(() => {

              
              if (app.locals.paymentStatus == null) {

                console.log('not yet ready')

                setTimeout(() => {


                  if (app.locals.paymentStatus == null) {

                    console.log('not yet ready')

                    setTimeout(() => {
                      if (app.locals.paymentStatus == null) {
                        res.send({message:'No data !'})
                        console.log('No data')

                      }else{
                        res.send({message: app.locals.paymentStatus})
                        console.log('Data okay')

                      }
                      
                      
                    }, 40000);
                  }else{
                    res.send({message: app.locals.paymentStatus})
                  }
                  
                }, 30000);
              }else{
                res.send({message: app.locals.paymentStatus})
              }
            }, 30000);
          }else{
            res.send({message: app.locals.paymentStatus})
          }
        }, 30000);
      }else{
        res.send({message: app.locals.paymentStatus})
      }
      
    
  } catch (error) {
    console.error("Erreur lors de l'appel API :", error);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
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
