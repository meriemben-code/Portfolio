
const path = require('path')

const bodyParser = require('body-parser')
const express = require('express')
const app = express();

const mysql = require('mysql');
const publicDirectory=path.join(__dirname,'./img')
app.use(express.static(publicDirectory))
app.set('view engine','hbs');
app.use(express.static('img'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set views file
app.set('views',path.join(__dirname,'views'));
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'protofolio'
});
const port = 5005

app.listen(port, () => {
    console.log(`port connected http://localhost:${port}`);
})
connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 

			
//set view engine


app.get('/', (req, res) => {
    res.redirect("/index");
  })
  app.get('/index', (req, res) => {
    res.render("index")
  })
  app.post('/save',(req, res) => { 
    console.log(req.body);

    const {name,email,project}=req.body;
connection.query('select email from protofolioo where email= ?',[email],async(error,results)=>{
    if(error){
        console.log(error)
    }
    if (!name||!email ||!project) {
        console.log("enter all info")
        return ( res.render('index',{
            message:'please enter all your information'
         
        }))
    }

connection.query('insert into protofolioo SET ?' ,{name:name,email:email,project:project},(error,results)=>{
 if(error){
        console.log(error)
    }else{
      return(res.render('index',{
    message:'message  done'}))
 
} 
})
})
   
      ;
    });

  