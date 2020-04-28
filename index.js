const express = require('express');
const connectDB = require('./config/connectDB');
const studentController = require('./routes/api/studentController');
const competitionRouter = require('./routes/api/competitionRouter');
const judgeController = require('./routes/api/judgeController');
const adminController = require('./routes/api/adminController');
const sendMail = require('./routes/sendMail');
const loginRoute = require('./routes/api/login');
const path = require('path');
const cors = require('cors');
const app = express();

//database Connection
connectDB();
//set a middleware to parse data
app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*");
	res.header(
	"Access-Control-Allow-Headers",
	"Origin,X-Requested-With,Content-Type, Accept,Authorization"
	);
	next();
});

 app.use('/api/students',studentController);
 app.use('/api/competitions',competitionRouter);
 app.use('/api/judges',judgeController);
 app.use('/api/admin',adminController);
 app.use('/api/sendmail',sendMail);
 app.use('/api/login',loginRoute);
 const PORT = process.env.PORT || 5000;
	if(process.env.NODE_ENV==='production'){
		app.use(express.static('client/build'));

		app.get('*',(req,res)=>{
			res.sendFile(path.join(__dirname,'client','build','index.html'));
		})
	}
 app.listen(PORT);
