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

