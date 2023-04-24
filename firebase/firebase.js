const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('../path/to/serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
class FirebaseService{
    async getAllData(){
        const data = []
        const snapshot = await db.collection('bisiness').get();
        snapshot.forEach((doc) => {
                data.push({id:doc.id, data: doc.data()})
         })
        return data
    }
    async getDataForCategorie(categorie){
      const data = []
        const snapshot = await db.collection('bisiness').where('categoria', '==', categorie).get();
        snapshot.forEach((doc) => {
                data.push({id:doc.id, data: doc.data()})
         })
        return data
    }
    async getDataForId(id){
        const doc = await db.collection('bisiness').doc(id).get();
        console.log(doc)
        const data = {id:doc.id, data: doc.data()}
        return data
    }
}
const serviceDb = new FirebaseService()
module.exports = serviceDb