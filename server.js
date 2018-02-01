const http = require( 'http' ) ;

const port = 8088 ;
const ipaddr = '127.0.0.1' ;
const server = http.createServer( handle_request ).listen( port, ipaddr ) ;

const blogapi = require( './modules/blogpost' ) ;

console.log( 'Started Node.js http server at http://127.0.0.1:' + port ) ;

function handle_GET_request( response )  {
  console.log( 'IN handle_GET_request' ) ;
  response.writeHead( 200,  {
      'Content-Type' : 'text/plain'
    } ) ;
  response.end( 'GET action executed' ) ;
}

function handle_POST_request( response )  {
  console.log( 'IN handle_POST_request' ) ;
  response.writeHead( 200,
    {
      'Content-Type' : 'text/plain'
    }
  ) ;
  response.end( 'POST action executed' ) ;
}

function debug_module()  {
  console.log( 'DEBUG:  testing blogpost module' ) ;
} 

function handle_unknown_request( response ) 
{
  console.log( 'IN handle_unknown_request' ) ;
  response.writeHead( 400, 
    "Unknown method" ,
    {
      'Content-Type' : 'text/plain' 
    } 
  ) ;
  response.end( 'Unknown request' ) ;
}

function handle_request( request, response )
{
  switch ( request.method ) 
  {
    case 'GET' :
      blogapi.GET( response ) ;
      break ;
    case 'POST' :
      blogapi.POST( response ) ;
      break ;
    default:
      handle_unknown_request( response ) ;
      break ;
  }
  console.log( 'FUNCTION handle_request loop' ) ;
}
