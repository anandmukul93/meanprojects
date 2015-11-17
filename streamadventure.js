//soln.

/**
1.

console.log('beep boop')

**/

/**
2.

var fs = require('fs')
var fileStream = fs.createReadStream(process.argv[2])
fileStream.pipe(process.stdout)

**/
/**
3.

process.stdin.pipe(process.stdout)

**/
/**
4.

var through = require('through2')

var upperCaseThroughStream = through(write,end)

function write(buffer, encoding, next){
	this.push(buffer.toString().toUpperCase())
	next()
}

function end(done){
	done()
}
process.stdin.pipe(upperCaseThroughStream).pipe(process.stdout)

**/

/**
5.

var isEven = false
var through = require('through2')
var split = require('split')
process.stdin.pipe(split()).pipe(through(function(buf,_,next){
											var pushString = buf.toString()
											if(isEven)
												pushString = pushString.toUpperCase()
											else
												pushString = pushString.toLowerCase()
											isEven = !isEven
											this.push(pushString+"\n")
											next()
											})).pipe(process.stdout)

											
**/

/**
6.

var concat = require('concat-stream')

function reverse(s) {
  return s.split('').reverse().join('');
}

process.stdin.pipe(concat(function(inputText){
	console.log(reverse(inputText.toString()))
}))

**/

/**
7.

var http = require('http')
var through = require('through2')

var tr = through(write,end)
function write(buf, _, next){
	this.push(buf.toString().toUpperCase())
	next()
}

function end(done){
done()
}
http.createServer(function(req, res){
	if(req.method === "POST"){
		req.pipe(tr).pipe(res)
	}
	else{
		res.end("send me a POST\n")
	}
}).listen(process.argv[2])

**/
/**
8.

var request = require('request')
process.stdin.pipe(request.post("http://localhost:8099/")).pipe(process.stdout)

**/

/**
9.

var ws = require('websocket-stream')
var stream = ws('http://localhost:8099/')
stream.write("hello\n")

*/

/**
10.

var trumpet = require('trumpet')
var through = require('through2')
var tr = through(write,end)
function write(buf,_, next){
	this.push(buf.toString().toUpperCase())
	next()
}
function end(done){
done()
}

var selector = trumpet()

var selectorStream = selector.select(".loud").createStream()
selectorStream.pipe(tr).pipe(selectorStream)


process.stdin.pipe(selector).pipe(process.stdout)

*/

/**
11.

var duplexer = require('duplexer2')
var spawn =  require('child_process').spawn
module.exports = function(cmd, args){
		var childProcess = spawn(cmd,args)
		return duplexer(childProcess.stdin,childProcess.stdout)
}

*/

/**
12.

var duplexer = require('duplexer2')
var through = require('through2')

module.exports = function(counter){	
	var counts = {}
	var input = through(write,end)
	return duplexer(input, counter)
	function write(buf,_,next){
		counts[buf.country] = (counts[buf.country]||0)+1
		next()
	}
	function end(done){
		counter.setCounts(counts)
		done()
	}
}
**/

/**
13.

var combine = require('stream-combiner')
var split = require('split')
var through = require('through2')
var zlib = require('zlib')

module.exports = function(){
var obj 
var foundAGenre = false

	function write(buf,_,next){
	if(buf.length === 0) return next()
	
	var buf = JSON.parse(buf)
		if(buf["type"] === "genre"){
			if(obj){
				this.push(JSON.stringify(obj)+"\n")
			}
			obj = {name:buf['name'], books:[]}
		}
		else if(buf["type"] === "book"){
			obj.books.push(buf['name'])
		}
		next()
	}
	
	function end(done){
		if(obj){
			this.push(JSON.stringify(obj) + '\n')
		}
		done()
	}

return combine(split(),through(write,end),zlib.createGzip())
}

**/

/**
14.

var crypto = require('crypto')
var stream = crypto.createDecipher('aes256',process.argv[2])
process.stdin.pipe(stream).pipe(process.stdout)

*/

/**
15.

var tar = require('tar')
var concat = require('concat-stream')
var parser = tar.Parse()
var through = require('through2')
var zlib = require('zlib')

parser.on('entry',function(e){
	var output;
	if(e.type !== 'File')
		return 
	
	e.pipe(crypto.createHash('md5',{encoding:'hex'})).pipe(concat(function(body){		
		console.log(body+' '+e.path)
	}))
})

var crypto = require('crypto')
process.stdin.pipe(crypto.createDecipher(process.argv[2],process.argv[3])).pipe(zlib.createGunzip()).pipe(parser)

*/