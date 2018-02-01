function handle_GET_request( request, response )  {
  console.log( 'IN handle_GET_request' ) ;
  response.writeHead( 200,  {
      'Content-Type' : 'text/plain'
    } ) ;
  response.end( 'GET action executed' ) ;
}

function handle_POST_request( request, response )  {
  response.writeHead( 200,
    {
      'Content-Type' : 'text/plain'
    }
  ) ;
  response.end( 'POST action executed' ) ;
}

exports.fetchEntries = handle_GET_request ;
exports.createEntry = handle_POST_request ;
