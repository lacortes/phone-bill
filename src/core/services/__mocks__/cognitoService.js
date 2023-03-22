const UserSession = { getAccessToken: () => ({ getJwtToken: () => 'sometoken' }) };

const cognitoService = () => {

    return ({ getUserSession: () => Promise.resolve(UserSession) });
};

export default cognitoService();