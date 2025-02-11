API's

auth
-POST /signup
-POST /login
-POST /logout

profile
-PATCH /profile/edit
-GET /profile/view
-PATCH /profile/updatePassword

connectionReq
-POST /request/interested/:userID
-POST /request/ignore/:userID
-POST /request/review/accept/:requestID
-POST /request/review/reject/:requestID

user
-GET /user/connections
-GET /user/request/received
-GET /user/feed
