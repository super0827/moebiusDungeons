<template>
  <b-col cols="12">
    <section class="d-flex justify-content-center align-items-center">
      <h1>Login</h1>
    </section> 

    <section class="border mb-3 p-4">
      <b-form @submit="submit" @reset='reset'>
        <b-form-group
          id="input-group-1"
          label="Knighthood Name:"
          label-for="input-1"
          description=""
        >
          <b-form-input
            id="input-1"
            v-model="form.name"
            placeholder="Your Knighthood Name"
            required
          ></b-form-input>
        </b-form-group> 
        
        <b-form-group
          id="input-group-2"
          label="Password:"
          label-for="input-2"
          description=""
        >
          <b-form-input
            id="input-2"
            v-model="form.password"
            placeholder="Your Password"
            type="password"
            required
          ></b-form-input>
        </b-form-group> 
      </b-form>
      
      <span class="d-flex justify-content-end mt-3">
        <b-button class="mr-2" size="lg" type="submit" variant="primary">Login</b-button>
      </span>
    </section>



    <section class="d-flex flex-row justify-content-between align-items-center p-4 border">
      <b-button variant="primary" class="d-flex flex-row justify-content-between align-items-center" @click="googleLogin">
        <h4 class="mr-2">Sign In With Google</h4> 
        <b-icon scale="1.2" @click="googleLogin()" icon="google" aria-hidden="true"></b-icon>
      </b-button>

      <aside class="d-flex flex-column justify-content-center">
        <b-button variant="info" @click="goToSignup()">
          <h4>New? Sign Up Here</h4>
        </b-button>
      </aside>
      
      <b-button variant="warning" @click="playAnyways" class="btn btn-primary">
          <h4>Play Without Signing Up</h4> 
      </b-button>
    </section>

    
    <p class="hoverOver text-center mt-3" @click="toTerms()">Creating an account means you agree to the terms, available by clicking here.</p>
  </b-col>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/auth'

var provider = new firebase.auth.GoogleAuthProvider();

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    googleLogin() {
    let self = this;
    firebase.auth().signInWithPopup(provider)
    .then(() => {
      var user = firebase.auth().currentUser;
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });    
  },
  toTerms() {
    this.$store.commit('gameData/mutate', {property: 'phase', with:"TermsPage"})
  },
  submit(event) {
    event.preventDefault()
    firebase
      .auth()
      .signInWithEmailAndPassword(this.form.name.replace(/\s/g, "")+'@fakeemail.com', this.form.password)
      .catch(err => {
        this.error = err.message;
      });
  },
  reset(event) {
    event.preventDefault()
    this.form.name = ''
    this.form.password = ''
    // Trick to reset/clear native browser form validation state
    this.show = false
    this.$nextTick(() => {
      this.show = true
    })
  },
  goToSignup() {
    this.$store.commit('gameData/mutate', {property: 'phase', with: 'Register'});
  },
  playAnyways() {
    firebase
      .auth()
      .signInWithEmailAndPassword('wanderer@fakeemail.com', 'guestpassword')
      .catch(err => {
        this.error = err.message;
      });
  }
}
};
</script>

<style scoped>
hr {
  color:#666;
  border:#666 solid 1px;
  width:100%;
  margin:20px 0;
}

.hoverOver:hover {
  cursor:pointer;
  color:gold;
}

.link:hover {
  color:black;
  background:rgb(255, 249, 212);
  border:gold solid 1px;
  cursor:pointer;
}

.googleButton:hover{
  cursor:pointer;
  transform: scale(1.03, 1.03);
  transition: all .3s;
}

.googleButton {
  margin-bottom:20px;
}

.googleButtonWrapper {
  display:inline-block;
  margin-right:20px;
}
</style>