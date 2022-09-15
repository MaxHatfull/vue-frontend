const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const authenticate = (username, password, onSuccess) => {
    var authenticationData = {
      Username: username,
      Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
    );
    var poolData = {
      UserPoolId: 'us-east-2_ghlOXVLi1', // Your user pool id here
      ClientId: '4qte47jbstod8apnfic0bunmrq', // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
      Username: username,
      Pool: userPool,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        var idToken = result.getIdToken().getJwtToken();
        console.log("id token:" + idToken);
        onSuccess(idToken);
      },
      onFailure: function(err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  }

  export default authenticate;