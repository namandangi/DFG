var express                 = require('express'),
    mongoose                = require('mongoose'),
    bodyParser              = require('body-parser'),
    passport                = require('passport'),
    encrypt                 = require('mongoose-encryption'),
    session                 = require('express-session'),
    passportLocalMongoose   = require('passport-local-mongoose'),
    GoogleStrategy          = require('passport-google-oauth20').Strategy,
    findOrCreate            = require('mongoose-findorcreate'),
    User                    = require('./models/helpingUser'),
    Ngo                     = require('./models/ngo'),
    Needy                   = require('./models/needyUser'),
    Event                   = require('./models/events'),
    md5=require("md5"),
    app                     = express();
    var ngoList = [];


mongoose.connect("mongodb://localhost:27017/dfg",{useNewUrlParser:true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//app.use(methodOverride("_method"));

// app.use(session({
//     secret: "My secret",
//     resave: false,
//     saveUninitialized: false
//   }));

//   app.use(passport.initialize());
//   app.use(passport.session());

//   mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true, useUnifiedTopology: true});
//   mongoose.connect("mongodb://localhost:27017/ngoDB",{useNewUrlParser:true, useUnifiedTopology: true});
//   mongoose.set("useCreateIndex",true);

//   const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//     googleId: String,
//     phone: String
//   });

//   userSchema.plugin(passportLocalMongoose);
//   userSchema.plugin(findOrCreate);

//   const User = new mongoose.model("User",userSchema);

//   passport.use(User.createStrategy());

//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });

//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });

//   passport.use(new GoogleStrategy({
//       clientID: '366980801608-to0gc7866njbsucnlffltuv0of9nhodv.apps.googleusercontent.com',
//       clientSecret: 'ozH5AwjWrV62lh8Hz7ZE6H_u',
//       callbackURL: "http://localhost:3000/auth/google/dashboard",
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//     },
//     function(accessToken, refreshToken, profile, cb) {
//       User.findOrCreate({ googleId: profile.id ,name: profile.displayName}, function (err, user) {
//         // console.log(profile);
//         return cb(err, user);
//       });
//     }
//   ));

//   app.get("/",function(req,res){
//     res.render("home");
//   });

//   app.get("/auth/google",
//     passport.authenticate("google",{scope:["profile"]})
//   );

//   app.get('/auth/google/dashboard',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     function(req, res) {
//       // Successful authentication, redirect home.
//       res.redirect('/dashboard');
//     }
//   );

//   app.get("/login",function(req,res){
//     res.render("login");
//   });

//   app.get("/register",function(req,res){
//     res.render("register");
//   });

//   app.get("/dashboard",function(req,res){
//     res.render("dashboard");
//   });

//   app.get("/logout",function(req,res){
//     req.logout();
//     res.redirect("/");
//   });

//   app.post("/register",function(req,res){
//     User.register({username: req.body.username},req.body.password,function(err,user){
//       if(err){
//         console.log(err);
//         res.redirect("/register");
//       }
//       else{
//         passport.authenticate("local")(req,res,function(){
//           res.redirect("/dashboard");
//         });
//       }
//     });
//   });

//   app.post("/login",function(req,res){
//     const user = new User({
//       username: req.body.username,
//       password: req.body.password
//     });
//     req.login(user,function(err){
//       if(err){
//         console.log(err);
//       }
//       else{
//         passport.authenticate("local")(req,res,function(){
//           res.redirect("/dashboard");
//         });
//       }
//     });
//   });


app.use(session({
    secret: "My secret",
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true, useUnifiedTopology: true});
  mongoose.set("useCreateIndex",true);

  // const userSchema = new mongoose.Schema({
  //   email: String,
  //   password: String
  // });
  //
  // userSchema.plugin(passportLocalMongoose);
  //
  // // const User = new mongoose.model("User",userSchema);

  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  app.get("/",function(req,res){
    res.render("home");
  });

  app.get("/login",function(req,res){
    res.render("login");
  });

  app.get("/register",function(req,res){
    res.render("register");
  });

  app.get("/login/user",function(req,res){
    res.render("login");
  });

  app.get("/login/ngo",function(req,res){
    res.render("login_ngo");
  });

  app.get("/register/user",function(req,res){
    res.render("register");
  });


  app.get("/register/ngo",function(req,res){
    res.render("signup_ngo");
  });

  app.get("/register/needy",function(req,res){
    res.render("new_UP");
  });

  app.get("/dashboard",function(req,res){
    if(req.isAuthenticated()){
      res.render("dashboard");
    }
    else{
      res.redirect("/login");
    }
  });

  app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
  });

  app.post("/register/user",function(req,res){
    console.log(req.body);
    var user ={
      username: req.body.username,
      name : req.body.name,
      password: req.body.password,
      email : req.body.username,
      phone : req.body.number
    };
    User.register(user,req.body.password,function(err,user){
      if(err){
        console.log(err);
        res.redirect("/register/user");
      }
      else{
        passport.authenticate("local")(req,res,function(){
          res.redirect("/ngo");
        });
      }
    });
  });

  app.post("/register/ngo",function(req,res){
    // console.log(req.body.username ,req.body.password);

    var newUser = new Ngo({
        username: req.body.username,
        email : req.body.username,
        password: md5(req.body.password),
        description : req.body.description,
        socialLink : req.body.link
    });
    Ngo.create(newUser,(err,ngo)=>{
        console.log(ngo);
        res.render("dashboard_ngo",{nameOfNgo:req.body.name , emailOfNgo:req.body.username});
    })
    // newUser.save(function(err){
    //   if(err){
    //     console.log(err);
    //   }
    //   else{
    //     res.render("dashboard");
    //   }
    // });
  });

//   app.post("/login",function(req,res){
//       console.log(req.body);

//       User.find(req.body.username,(err,nuser)=>{
//         if(!err)
//         console.log(nuser);

//     req.login(nuser.username,function(err){
//       if(err){
//         console.log(err);
//       }
//       else{
//         passport.authenticate("local")(req,res,function(){
//           res.redirect("/dashboard");
//         });
//       }
//     });
// });
//   });
app.post("/login/user", passport.authenticate("local",
{
      successRedirect: "/dashboard",
      failureRedirect: "/login"
    }), function(req, res){
});

app.post("/login/ngo",function(req,res){
  const username = req.body.username;
  const password = md5(req.body.password);
  Ngo.findOne({email:username},function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        if(foundUser.password === password){
          res.render("dashboard_ngo",{nameOfNgo:req.body.name , emailOfNgo:req.body.username});
        }
      }
    }
  });
});



app.get("/ngos",(req,res)=>{

    Ngo.find({},(err,ngo)=>{
   //     console.log(ngo);
        ngoList.push(ngo);
        res.render("ngo",{allngo:ngo});
    });
    console.log(ngoList);

})

app.post("/register/needy",(req,res)=>{
    var newUser =new Needy({
        //username: req.body.username,
        name : req.body.name,
        age : req.body.age,
        location: req.body.loaction,
        image : req.body.img,
        description : req.body.description,
        impairment : req.body.impr
      });
      Needy.create(newUser,(err,need)=>{
        console.log(need);

    });
    res.redirect('/needy');
})
app.get('/needy',(req,res)=>{
    Needy.find({},(err,needy)=>{
        //     console.log(ngo);
             //ngoList.push(ngo);
             res.render("NeedyCard",{need:needy});
         });
})


app.get('/donate',(req,res)=>{
    res.render("donation");
})

app.get('/createevent',(req,res)=>{
    res.render("eventform");
})


app.post('/events',(req,res)=>{
    var newEvent =new Event({
        //username: req.body.username,
        name : req.body.name,

        location: req.body.location,

        description : req.body.description,

      });
      //console.log(newEvent);
      Event.create(newEvent,(err,event)=>{
        console.log(event);
    });
    res.redirect('/events');

})
app.get('/events',(req,res)=>{
    Event.find({},(err,event)=>{
            //console.log(event);
             res.render("events",{event:event});
         });
})

app.post("/donate",function(req,res){
  Ngo.find({},(err,ngo)=>{
 //     console.log(ngo);
      ngoList.push(ngo);
      res.render("ngo",{allngo:ngo});
  });
});

// <<<<<<< HEAD
// app.get('/ngo/:name',(req,res)=>{
//     Ngo.find({username:req.params.name},(err,prof)=>{
//         if(!err)
//         res.redirect("/ngo/"+req.params.name+"/dashboard");
//         else
//         res.redirect("/ngos")
//     })
// })
// =======
app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
});





app.listen(process.env.PORT||3000,process.env.IP,()=>{
    console.log("Server running on port 3000");
});
