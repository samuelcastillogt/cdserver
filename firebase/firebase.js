import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import  { getFirestore, Timestamp} from "firebase-admin/firestore"
import {setDoc, addDoc,  collection, doc } from "firebase/firestore"
import { cacheService } from '../cache/index.js';
initializeApp({
  credential: cert({
    "type": "service_account",
    "project_id": process.env.project_id,
    "private_key_id": process.env.private_key_id,
    "private_key": process.env.private_key,
    "client_email": process.env.DATA,
    "client_id": process.env.client_id,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.client_x509_cert_url
  })
});

const db = getFirestore();
class FirebaseService{
    async getAllData(){
        const dataCache = await cacheService.getCache()
        if(dataCache == null){
          const data = []
          const snapshot = await db.collection('bisiness').get();
          snapshot.forEach((doc) => {
            const {nombre, imagen, descripcion, categoria, direccion, lat, lng} = doc.data()
            const info = {nombre, imagen, descripcion, categoria, direccion, lat, lng}
            data.push({id:doc.id, data: info})
           })
           cacheService.setCache(data)
          return data
        }else{
          return dataCache
        }

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
    async saveBusiness(data){
      console.log(data)
      try{
      await db.collection("bisiness").add(data)
      return true        
      }catch(err){
        console.log(err)
        return false
      }

    }
    async editBusiness(data){
      try{
          await db.collection("bisiness").doc(data.id).set(data.data)
          return true
      }catch(err){
        return false
      }
    }
    async deleteBusiness(id){
      try{
          await db.collection("bisiness").doc(id).delete()
          return true
      }catch(err){
        return false
      }
    }
    async saveBlogPost(data){
      await db.collection("blog").add(data)
    }
    async getCategories(){
      const doc = await db.collection('categorias').doc("zXttFmbYWdQ1qHkAXrbT").get();
      const data = {id:doc.id, data: doc.data()}
      return data.data.categorias
  }
  async saveDataLead(data){
    try {
      await db.collection("lead").add(data)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
const serviceDb = new FirebaseService()
export default serviceDb
