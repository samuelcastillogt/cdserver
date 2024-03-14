import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import  { getFirestore, Timestamp} from "firebase-admin/firestore"
import {setDoc, addDoc,  collection, doc } from "firebase/firestore"
initializeApp({
  credential: cert({
    "type": "service_account",
    "project_id": "directorio-bc73c",
    "private_key_id": "dc85288bd7e84578c59c079e3d8228584184866a",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVlKF5muh8fpFv\nOcohXGLjATfahAsaQmtrjKAhd0gdKlkv6gHGx7LgVR2FIQIYH1yUs79ha3rkzgNY\nqJMnad1AwrHL8Axot5jYQ/x5Jze0FOamN2f5vk+NlNL1W8DwDEsFXfBplQ+CckcG\nTqk2sIi1AhT0qHp0cI2MqTzj+Ii68r2UeMkrA21cD9eLMAMz/G5OwS+tatg44Y/x\n3cmmaQIVa4a9nZ+uQOj4CL5xWHiQ+Hs7e7LXv3xDXcYRydgdwYH/Dq8e1CMA5ffe\nxK/cgis0AgLRLHVMtUztbOm3ynkDIXupIdSwewFaHX7YmEmaithw05uRzi0a9Tu5\nICqdVimVAgMBAAECggEAAQ4H3MriumKsTd6nhzymkbUa1S3Gbu3EYWFDaoblSJzs\nmID7sJih4zETFpTlfBWuO7Rw4zFIXRhAtKUN0lRX2bmxw8O+u/Gpg+qUtPXNn5+5\nd+QEKRvt1qbVLThec+Zg+c4koXuGpRVIES7oRQiK1EywqnipNNQCzvQIWfPgm6kU\nQZ60M8Ih6BwuFkJY+iJycHN049kgoHzW7nMZsmhWuqUsmiZ82BlEBgv3oUv8PjSQ\nQAdrS0SDu95gRqgj+7b6us3aezBWVzbnY2zegqgFIKN6+W1NL7BX7+3LLUfoZ1HM\nnROCA1LV33i37cn1LACT0c/2Q/V89n1Y039r5Pt/oQKBgQD/yoEfl44UERM1pKFf\nmsQINmeToUioga/v8weXiQx5p3CQRPQUb8PWzPn82BNSR12FF7e1pRdsSOyWxkhJ\nv+H0zP6IEYun9Am9+FtnRqm9KkHf6jvvwsEeP1qfUq+2gb0vCDbpy4ZuOgIotOaw\nV9bd1Pv54UYQqz+VQQ+8nZVTGQKBgQDVwUxu8dewoahfpE1U6hZ2QhajMD061Fps\nF5gfhXkph6FkJ6bpbduff7Hx5o8SGYLfhl33YbygJyzJPPCSb5EpLnAoVjFjabvZ\nJTgIXg9watGUV9NMmVqCTco7TuQryK3ozistM+fDqDUe5lqgaSFE6Ybk+1abh/vL\nPRNIgWt13QKBgBp/WtLv+zre7fN/o2vo92e2YxJrAcDa9mPP9DhhbRZpHwMC8Znw\nXgQxZbAong/G7swrwc8iVAPWphOUZManBvw6BCAKWUJDyIKSaL2RF2JOL1bHx/+1\nWBYPEA8zHJq2Y+esXSvo9nsSrUiUPNWFs+908clX6c8uPj7y53Nti5t5AoGADEoo\n0tgkxosE2zrfF1q+H9583rUPUCqVaFGS9Xz/Elwx80g0WIdwcSMuX/IZl7jPxXo8\nPNTpu2uFL6zJSCIR/oQk/qy1+jlCC6IQLqr5yETb9+N0ypqmkYdXcUF/7OSE2zW/\nVcH+OUmahERKQZ7JwuSKVO/+csLGv1CroyeNviECgYEAyzuAqa6JjN+kVo8If0k5\nnwQeOB7oXHn4X0C0SNHe42Z9WvMUBGXan5qyIkAh35XjVbjcbBIcIdhofaWiIrj2\nwo2swAt5XmlLJ5cHOoKkvVHBEykyja6Pl56ANC92Vcv3+DPGgs9uPVoZ29/MTzMl\nXPXT7kfo47m9wsVTpMtGQEk=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-flocx@directorio-bc73c.iam.gserviceaccount.com",
    "client_id": "101630375709192470602",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-flocx%40directorio-bc73c.iam.gserviceaccount.com"
  })
});

const db = getFirestore();
class FirebaseService{
    async getAllData(){
        const data = []
        const snapshot = await db.collection('bisiness').limit(10).get();
        snapshot.forEach((doc) => {
          const {titulo, imagen, descripcion, categoria, direccion, lat, lng} = doc.data()
          const info = {
            titulo,
            imagen,
            descripcion, 
            categoria, 
            direccion, 
            lat, 
            lng
          }
                data.push({id:doc.id, data: info})
         })
        return data
    }
    async getAllDataBlog(){
      const data = []
      const snapshot = await db.collection('blog').limit(10).get();
      snapshot.forEach((doc) => {
              const {titulo, imagen} = doc.data()
              const info = {
                titulo,
                imagen
              }
              data.push({id:doc.id, data: info})
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
    async getAllDataByAutor(id){
      const data = []
        const snapshot = await db.collection('test').where('autor', '==', id).get();
        snapshot.forEach((doc) => {
                data.push({id:doc.id, data: doc.data()})
         })
        return data
    }
    async getDataForId(id){
        const doc = await db.collection('bisiness').doc(id).get();
        const data = {id:doc.id, data: doc.data()}
        return data
    }
    async getBlogForId(id){
      const doc = await db.collection('blog').doc(id).get();
      const data = {id:doc.id, data: doc.data()}
      return data
  }
    async savePost(data){
      await db.collection("test").add(data)
    }
    async saveBlogPost(data){
      await db.collection("blog").add(data)
    }
}
const serviceDb = new FirebaseService()
export default serviceDb
