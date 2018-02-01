function handle_GET_request( request, response )  {
  //  the /posts endpoint must use the GET method
  if (request.method != 'GET' )
  {
    response.writeHead( 405, {
      'Content-Type' : 'text/plain'
    } ) ;
    response.end( `${request.method} not valid for this endpoint` ) ;
  }
  else
  {
    response.writeHead( 200,  {
      'Content-Type' : 'text/plain'
    } ) ;
    response.end( 'GET action executed' ) ;
  }
}

function handle_POST_request( request, response )  {
  //  the /post endpoint must use the POST method
  if (request.method != 'POST' )
  {
    response.writeHead( 405, {
      'Content-Type' : 'text/plain'
    } ) ;
    response.end( `${request.method} not valid for this endpoint` ) ;
  }
  else
  {
    response.writeHead( 200,
      {
        'Content-Type' : 'text/plain'
      }
    ) ;
    response.end( 'POST action executed' ) ;
  }
}

exports.fetchEntries = handle_GET_request ;
exports.createEntry = handle_POST_request ;
