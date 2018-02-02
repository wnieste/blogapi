cURL strings for testing.


Assuming the server hosting this API is running on localhost and listening on port 8088.
We have provided multiple datafiles, each with a single blog post in JSON format, as post?.json.

command to trip the /posts endpoint -
   curl --header "Content-Type: application/json" http://localhost:8088/posts

command to trip the /post endpoint -
   curl --header "Content-Type: application/json" http://localhost:8088/post -d @post.json
