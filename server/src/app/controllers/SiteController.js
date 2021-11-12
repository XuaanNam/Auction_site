class SiteController {
    // [GET] /
    index(req, res){
        res.send('home helo mọi nguoi');
    }
   
    //[GET] /search
    search(req, res){
        res.send('search');
    }
}

module.exports = new SiteController;