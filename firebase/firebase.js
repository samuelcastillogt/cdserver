const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('../path/to/serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
class FirebaseService{
    async prueba(){
        const snapshot = await db.collection('users').get();
        snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
});
    }
}
const serviceDb = new FirebaseService()
module.exports = serviceDb