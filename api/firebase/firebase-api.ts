import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// This value is the default 403 code from firebase
const PERMISSION_DENIED_STATUS_CODE = 'PERMISSION_DENIED';

export interface RealTimeFetchParams {
  path: string;
}

export interface RealTimeSubscribeParams<T> {
  path: string;
  event?: firebase.database.EventType;
  callback: (value: T) => void;
}

export interface RealTimeUnsubscribeParams {
  path: string;
  event?: firebase.database.EventType;
}

export interface RealTimeSetParams<T> {
  path: string;
  value: T;
}

class FirebaseApiImpl {
  private firebase: firebase.app.App;

  constructor() {
    this.handleAuthenticationErrors = this.handleAuthenticationErrors.bind(this);

    this.firebase = firebase.initializeApp({
      apiKey: 'AIzaSyCT-_audli8qzdUk7Uyd1AXVfy4-MU_guQ',
      authDomain: 'zenmoney-8c0af.firebaseapp.com',
      databaseURL: 'https://zenmoney-8c0af-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'zenmoney-8c0af',
      storageBucket: 'zenmoney-8c0af.appspot.com',
      messagingSenderId: '296256564509',
      appId: '1:296256564509:web:f48a2afb9e77a1e174c5f4',
    });
  }

  private handleAuthenticationErrors(error: firebase.FirebaseError) {
    if (error.code === PERMISSION_DENIED_STATUS_CODE) {
      // handle logout any way you want. For example, if you were using
      // AWS Cognito, you'd call `Auth.logout()`
    }
  }

  public connect(token: string) {
    return this.firebase.auth().signInWithCustomToken(token);
  }

  public disconnect() {
    return this.firebase.auth().signOut();
  }

  public fetch<T>({path}: RealTimeFetchParams) {
    return new Promise<T>((resolve) => {
      this.firebase
        .database()
        .ref(path)
        .once(
          'value',
          (snapshot) => {
            resolve(snapshot.val());
          },
          this.handleAuthenticationErrors,
        );
    });
  }

  public set<T>({path, value}: RealTimeSetParams<T>) {
    return this.firebase.database().ref(path).set(value);
  }

  public subscribe<T>({path, callback, event = 'value'}: RealTimeSubscribeParams<T>) {
    const ref = this.firebase.database().ref(path);
    const cb = (snapshot: firebase.database.DataSnapshot) => {
      callback(snapshot.val() as T);
    };

    ref.on(event, cb, this.handleAuthenticationErrors);
    return () => ref.off(event, cb);
  }

  public unsubscribe({path, event = 'value'}: RealTimeUnsubscribeParams) {
    this.firebase.database().ref(path).off(event);
  }
}

export const FirebaseApi = new FirebaseApiImpl();
