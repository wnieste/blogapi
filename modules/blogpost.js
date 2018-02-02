const debug = false ;

function return_all_posts( request, response, dbHandle )  {
  //  this endpoint must use the GET method, otherwise we abort
  if (request.method != 'GET' )
  {
    response.writeHead( 405, {
      'Content-Type' : 'text/plain'
    } ) ;
    response.end( `${request.method} not valid for this endpoint` ) ;
  }
  else
  {
    //  as we've been given a database with an existing schema, we shall hardcode this query.
    let sqlQuery = 'SELECT post_id as ID,  title as TITLE, body as POST from posts' ;

    response.writeHead( 200,  {
      'Content-Type' : 'application/json'
    } ) ;
    //  returning an array of blogposts
    response.write( '{ "blogposts": ' ) ;
    
    // loop through blog posts
    //  NOTE:  works for our example but will crash with a large number of db entries as
    //    the call to dbHandle.all will load ALL posts in memory
    dbHandle.all( sqlQuery, [], (err, row ) =>  {
      if (err) {
        throw err ;
      }
        //  will create an array of JSON objects as a string of characters
        let blogPost = JSON.stringify( row ) ;
        response.write( blogPost, function( error ) { response.end( ' } ' ) } ) ;
        
        if (debug)  {
          console.log( blogPost ) ;			//  debug
        }
    } ) ;
  }
}

function add_blog_post( request, response, dbHandle )  {
  //  the /post endpoint must use the POST method, otherwise we abort
  if (request.method != 'POST' )
  {
    response.writeHead( 405, {
      'Content-Type' : 'text/plain'
    } ) ;
    response.end( `${request.method} not valid for this endpoint` ) ;
  }
  else
  {
    request.on( 'data', function (data) {
      //  need to get the POST'ed data and convert into distinct fields
      let blogPOST = JSON.parse( data ) ;

      //  build our INSERT statement from the POST'ed data
      let dbInsert = 'INSERT INTO posts (title, body) VALUES ( "' 
          + `${blogPOST.title}` + '", "' + `${blogPOST.body}` + '" )' ;

      //  INSERT a new blog post into the datastore
      dbHandle.run( dbInsert, [], (err) => {
        if (err)  {
          return console.error( err.message ) ;
        }

        if (debug)  {
          console.log ('inserted foo-bar' ) ;		//  debug
        }

      } ) ;
    } ) ;

    response.writeHead( 200,
      {
        'Content-Type' : 'text/plain'
      }
    ) ;
    //response.end( 'POST action executed' ) ;
    response.end() ;
  }
}

//  export the API methods
exports.fetchEntries = return_all_posts ;
exports.createEntry = add_blog_post  ;
