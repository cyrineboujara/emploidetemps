const mysql = require('mysql');


const pool =mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

exports.index =(req,res)=>{
    res.render('index');
}

exports.about =(req,res)=>{
    res.render('about');
}

exports.contact =(req,res)=>{
    res.render('contact');
}

exports.login =(req,res)=>{
    res.render('login');
}

exports.StudentList =(req,res)=>{
    res.render('StudentList');
}

exports.teacherList =(req,res)=>{
    res.render('teacherList');
}
exports.registerTeachers =(req,res)=>{
    res.render('registerTeachers');
}
exports.registerStudents =(req,res)=>{
    res.render('registerStudents');
}
exports.directiondepartement =(req,res)=>{
    res.render('directiondepartement');
}
exports.AbsenceList =(req,res)=>{
    res.render('AbsenceList');
}
exports.adminlist =(req,res)=>{
    res.render('adminlist');
}
pool.getConnection((err,connection)=>{
    if (err) {
        console.error(err); 
    }else{
    console.log("connextion recu , id : "+connection.threadId);}
    });

// exports.view=(req,res) => {
// pool.query('SELECT * FROM student',(err,rows) => {
//     connection.release();
//     if(!err) {
//         res.render('StudentList',{rows})
//     }else{
//         console.log(err)
//     }
//     console.log('The data from user tables' ,rows);
// });
// }
exports.teacherList=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    connection.query('SELECT * FROM student',(err ,Resultat)=>{
        connection.release();
        if (!err) {
            res.render('teacherList',{Resultat});
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat);

    });
});
};

exports.StudentList=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    connection.query('SELECT * FROM student',(err ,Resultat)=>{
        connection.release();
        if (!err) {
            res.render('StudentList',{Resultat});
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat);

    });
});
};

//login FORM
exports.loginB = (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server error'); // Send error response immediately
      }
  
      const email = req.body.email;
      const password = req.body.password;
      const tables = ['student', 'teacher', 'directiondepartement'];
  
      let loginSuccess = false;
  
      tables.forEach((table, index) => {
        if (!loginSuccess) {
          const query = `SELECT * FROM ?? WHERE email = ? AND password = ?`;
          connection.query(query, [table, email, password], (err, results) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Server error'); // Send error response immediately
            }
  
            if (results.length > 0) {
              loginSuccess = true;
              // Check for early error response before redirect
              if (!res.headersSent) { // Check if headers are already sent
                if (table === 'student') {
                  return res.redirect('/StudentList');
                } else if (table === 'teacher') {
                  return res.redirect('/teacherList');
                } else if (table === 'directiondepartement') {
                  return res.redirect('/directiondepartement');
                }
              } else {
                console.error('Headers already sent, cannot redirect');
                // Handle the case where headers are already sent (e.g., log error)
              }
            }
  
            if (index === tables.length - 1 && !loginSuccess) {
              connection.release();
              res.render('login', { erreur: 'Incorrect login' });
            }
          });
        }
      });
    });
  };
  
  
//Register Form
exports.registerTB=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {                                                                                                  
            console.error(err); 
        }else{
            console.log("connextion recu , id : "+connection.threadId);
    }
    const { nom, prenom, dateN, email, password } = req.body;

    const sql = `INSERT INTO teacher SET nom = ?, prenom = ?, dateN = ?, email = ?, password = ?`;
  
    pool.query(sql, [nom, prenom, dateN, email, password], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Database error');
        return;
      }
      res.render('directiondepartement');
    });
});};
exports.AbsenceList=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    connection.query('SELECT * FROM absent',(err ,Resultat2)=>{
        connection.release();
        if (!err) {
            res.render('AbsenceList',{Resultat2});
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat2);

    });
});
};
exports.registerSB=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {                                                                                                  
            console.error(err); 
        }else{
            console.log("connextion recu , id : "+connection.threadId);
    }
    const { nom, prenom, dateN, email, password } = req.body;

    const sql = `INSERT INTO student SET nom = ?, prenom = ?, dateN = ?, email = ?, password = ?`;
  
    pool.query(sql, [nom, prenom, dateN, email, password], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Database error');
        return;
      }
      res.render('directiondepartement');
    });
});};

exports.AbsenceListB=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {                                                                                                  
            console.error(err); 
        }else{
            console.log("connextion recu , id : "+connection.threadId);
    }
const nom = req.body.nom;
const prenom=req.body.prenom;

    connection.query('INSERT INTO absent SET  nom = ? , prenom = ? ' ,[nom,prenom],(err ,Resultat)=>{
        connection.release();
        if (err) {
            console.log("erreur",err);
        }else{
            res.render('teacherList',{alert :'successfully '});
        }
    });
});};
exports.delete=('/AbsenceList',(req,res)=>{
    
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    connection.query('DELETE FROM absent where id = ?',[req.params.id],(err ,Resultat3)=>{
        connection.release();
        if (!err) {
            res.redirect('/AbsenceList');
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat3);

    });
});
})