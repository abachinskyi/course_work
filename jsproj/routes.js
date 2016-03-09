var fs = require('fs');
 
 
module.exports = function(app) {
 
 
app.get('/',function(req,res){
    res.end("Node-File-Upload");
 
});
app.post('/upload', function(req, res) {
    console.log(req.files.image.originalFilename);
    console.log(req.files.image.path);
    fs.readFile(req.files.image.path, function (err, data){
        var dirname = "/Users/apple/Desktop/jsproj/uploads";
		var hash = hashCode(req.files.image.originalFilename);
		console.log(hash);
        var newPath = dirname + "/uploads/" + hash + ".png";
        fs.writeFile(newPath, data, function (err) {
        if(err){
        res.json({'response':"Error"});
         	}
		else {
        res.json({'response':"Saved"});
		}
	});
});
});
 
 
app.get('/uploads/:file', function (req, res){
        file = req.params.file;
        var dirname = "/home/rajamalw/Node/file-upload";
        var img = fs.readFileSync(dirname + "/uploads/" + file);
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(img, 'binary');
 
});
String.prototype.hashCode = function(){
    var hash = 0;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

};