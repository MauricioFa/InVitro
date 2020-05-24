const admin = require("firebase-admin")
require('dotenv').config()

class multiUserCreation{
  userCreation (jsonUsers){
    if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert({
            "type": "service_account",
            "project_id": process.env.PROJECT_ID,
            "private_key_id": process.env.PRIVATE_KEY_ID,
            "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
            "client_email": process.env.CLIENT_EMAIL,
            "client_id": process.env.CLIENT_ID,
            "auth_uri": process.env.AUTH_URI,
            "token_uri": process.env.TOKEN_URI,
            "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_CERT,
            "client_x509_cert_url": process.env.CLIENT_CERT
          }),
          databaseURL: "https://postic-authentication.firebaseio.com/",
        });
    }
    
    // i = 1;
    for (let i in jsonUsers){
    admin
      .auth()
      .createUser({
        email: jsonUsers[i]["Email"],
        emailVerified: false,
        phoneNumber: `+57${jsonUsers[i]["Phone"]}`,
        password: "secretPassword",
        displayName: `${jsonUsers[i]["First Name"]} ${jsonUsers[i]["Last Name"]}`,
        disabled: false,
      })
      .then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
        // return {"User email":jsonUsers[i]["Email"], "Result":"Succesfully created"}
      })
      .catch(function (error) {
        console.log("Error creating new user:", error);
    //    return {"User email":jsonUsers[i]["Email"], "Result":error}
      });
    }
  }
}

module.exports = multiUserCreation