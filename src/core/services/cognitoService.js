import { CognitoUserPool, AuthenticationDetails, CognitoUser, CookieStorage } from 'amazon-cognito-identity-js';
import { USER_POOL_ID, CLIENT_ID } from '../config/cognito';
import { APP_DOMAIN } from '../config/environment';

const cognitoService = () => {
    let userPool = null;

    const getUserPool = () => {
        if (userPool === null) {
            userPool = new CognitoUserPool({
                UserPoolId: USER_POOL_ID,
                ClientId: CLIENT_ID,
                Storage: new CookieStorage({ domain: APP_DOMAIN })
            });
        }   
        return userPool;
    };

    const authenticateUser = async (phoneNumber, password) => {
        return await new Promise((resolve, reject) => {
            const authData = {
                Username: `+1${phoneNumber}`,
                Password: password
            };
            const authDetails = new AuthenticationDetails(authData);
            
            const userPool = getUserPool();
            
            const userData = {
                Username: `+1${phoneNumber}`,
                Pool: userPool, 
                Storage: new CookieStorage({ domain: APP_DOMAIN })
            };
            const cognitoUser = new CognitoUser(userData);
            cognitoUser.authenticateUser(authDetails, {
                onSuccess: () => {
                    resolve();
                },
    
                onFailure: err => {
                    console.error(err);
                    reject();
                },
            });
        });
    };

    const getUserSession = async () => {
        const pool = getUserPool();
        const cognitoUser = pool?.getCurrentUser();
        if (!cognitoUser) {
            return Promise.reject('Cannot get user from pool');
        }

        return await new Promise((resolve, reject) => {
            cognitoUser.getSession((err, result) => {
                if (result) {
                    resolve(result);
                }
    
                if (err) {
                    reject(err);
                }
            });
        });
    };

    return { getUserPool, authenticateUser, getUserSession };
};

export default cognitoService();