API's

auth
-POST /signup
-POST /login
-POST /logout

profile
-PATCH /profile/edit
-GET /profile/view
-PATCH /profile/password

connectionReq
-POST /request/send/interested/:userID
-POST /request/send/ignore/:userID
-POST /request/review/accept/:requestID
-POST /request/review/reject/:requestID

user
-GET /user/connections
-GET /user/request/received
-GET /user/feed
