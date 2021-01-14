
import fire from "../fire";

class User {
  #userProps = {
    emailValue: "default@gmail.com",
    password: "",
    imageLink: [],
    profileLink: 'https://firebasestorage.googleapis.com/v0/b/profilepicrepo.appspot.com/o/default-user-icon-4.jpg?alt=media&token=a1a0114e-08a4-4771-8448-fc4440e418f5',
  }
  /**
   * Creates a firebase document for this corresponding user
   */
  createUserInDB = () => {

    return fire.firestore().collection('UserData').get().then((snap) => {
      fire
      .firestore()
      .collection("UserData")
      .doc(fire.auth().currentUser.uid)
      .set(this.#userProps);
   })
  
    
  };
  /**
   * Creates a firebase user with the information in this
   * @return {Promise} If excuted successfully return a promise, o/w throws an error containing corresponding messages
   */
  handleSignUp = () =>{ 
    return fire
      .auth()
      .createUserWithEmailAndPassword(this.#userProps.emailValue, this.#userProps.password).then(()=>{
        if (fire.auth().currentUser != null){
          fire
        .storage()
        .ref(fire.auth().currentUser.uid +"/dog.png").put('https://picsum.photos/id/237/200/300');
         return this.createUserInDB()
      }
    }).catch(err =>{
      return new Promise((resolve, reject) => {
        throw new Error(err.message);
      })
    })

  
  };

  get email() {
    return this.#userProps.emailValue;
  }
  set email(email) {
    this.#userProps.emailValue = email;
  }
  get password() {
    return this.#userProps.password;
  }
  set password(value) {
    this.#userProps.password = value;
  }
  
}

export default User;
