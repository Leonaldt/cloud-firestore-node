const admin = require('firebase-admin')

const serviceAccount = require('../../config/serviceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://server-account-manager.firebaseio.com'
})

module.exports = admin.firestore()