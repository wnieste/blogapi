const http = require( 'http' ) ;

const port = 8088 ;
const ipaddr = '127.0.0.1' ;
const server = http.createServer( handle_request ).listen( port, ipaddr ) ;

const blogapi = require( './modules/blogpost' ) ;

console.log( 'Started Node.js http server at http://127.0.0.1:' + port ) ;

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
  switch ( request.url ) 
  {
    case '/posts' :
      blogapi.fetchEntries( request, response ) ;
      break ;
    case '/post' :
      blogapi.createEntry( request, response ) ;
      break ;
    default:
      handle_unknown_request( response ) ;
      break ;
  }
  console.log( 'FUNCTION handle_request loop' ) ;
}
