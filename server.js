const debug = false ;

//  required modules
const blogapi  = require( './modules/blogpost' ) ;
const http = require( 'http' ) ;
const sqlite3  = require( 'sqlite3' ) ;

const port = 8088 ;
const ipaddr = '127.0.0.1' ;

const server = http.createServer( handle_request ).listen( port, ipaddr ) ;

//  open a connection to the database
let blogdb = new sqlite3.Database( './database/blog.db' ) ;

//  print something just so we know we are running
console.log( 'Started Node.js http server at http://127.0.0.1:' + port ) ;

//  our test driver only handles limited requests, everything else is rejected
function handle_unknown_request( response ) 
{
  if (debug)  {
    console.log( 'IN handle_unknown_request' ) ;		// debug
  }
  
  //  return an error message 
  response.writeHead( 400, 
    "Unknown route" ,
    {
      'Content-Type' : 'text/plain' 
    } 
  ) ;
  response.end( 'Unknown endpoint' ) ;
}

//  main loop for our server
function handle_request( request, response )
{
  //  test driver to call the two routes managed by the blog API
  //  or error is something else is requested
  switch ( request.url ) 
  {
    case '/posts' :
      blogapi.fetchEntries( request, response, blogdb ) ;
      break ;
    case '/post' :
      blogapi.createEntry( request, response, blogdb ) ;
      break ;
    default:
      handle_unknown_request( response ) ;
      break ;
  }  // end switch

  if (debug)  {
    console.log( 'FUNCTION handle_request loop' ) ;		// debug
  }
  
}
