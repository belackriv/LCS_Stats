
/*
 * GET home page.
 */

var navbar = {
  header:'LCS Stats',
  links :[
    {label:'Players', href:'/players', classes:['active']}
  ]
};

var home = function(req, res){
  //res.render('index', { title: 'LCS Stats'});
  res.json({'loadingPage':true})
};

var templates = function(req,res){
  res.render('templates');
};

module.exports = function(app){
  app.locals.navbar = navbar;
  app.get('*', function(req,res,next){
    if(req.accepts(['json', 'html']) == 'json'){
      next();
    }else{
      res.render('loading');    
    }
  });
  app.get('/', home);
  app.get('/templates', templates);
  require('./player')(app);
};