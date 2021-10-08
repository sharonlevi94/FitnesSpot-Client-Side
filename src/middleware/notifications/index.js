import 'firebase/messaging';
import firebaseInstance from "../firebase/index"

navigator.serviceWorker.register('firebase-messaging-sw.js', {scope: "firebase-cloud-messaging-push-scope"})
.then((registration) =>{
    const messaging = firebaseInstance.firebase.messaging();
    messaging.getToken().then(token =>{
        console.log(token);
        //Insert token to DataBase
    })
    messaging.onMessage((payload)=>{
        const title = 'FitnesSpot';
        const options = {
            body: payload.data.message
        };

        registration.showNotification(title, options);
        console.log('Message received. '. payload);
    });
}).catch(err =>{
    console.log(err)
})