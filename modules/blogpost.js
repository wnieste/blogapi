function handle_GET_request( request, response, dbHandle )  {
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
    let sqlQuery = 'SELECT post_id as ID,  title as TITLE, body as POST from posts' ;

    response.writeHead( 200,  {
      'Content-Type' : 'application/json'
    } ) ;
    response.write( '{ "blogposts": ' ) ;
    // loop through blog posts
    dbHandle.all( sqlQuery, [], (err, row ) =>  {
      if (err) {
        throw err ;
      }
        let blogPost = JSON.stringify( row ) ;
        console.log( blogPost ) ;
        response.write( blogPost, function( error ) { response.end( ' } ' ) } ) ;
    } ) ;
  }
}

function handle_POST_request( request, response, dbHandle )  {
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
    let dbInsert = 'INSERT INTO posts (title, body) VALUES ( "foo", "bar" )' ;
    dbHandle.run( dbInsert, [], (err) => {
      if (err)  {
        return console.error( err.message ) ;
      }
      console.log ('inserted foo-bar' ) ;
    } ) ;
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
