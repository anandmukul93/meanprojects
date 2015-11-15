var mymodule = require("./program.js")
var directory = process.argv[2]
var extension = process.argv[3]
mymodule(directory, extension, function(err, data){
	if(err)
		return console.error("Error occurred: ",err)
	else
		data.forEach(function(x){ console.log(x)})
})