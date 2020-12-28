<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
            <h1>
              Login
            </h1>
          <div class="card-header">
            <img src="@/assets/imgs/icons/playerSigilIcon.png" alt="">
            </div>

          <hr>      

          <div class="card-body">

          <section class="flexRowBetween">

            <section class="googleButtonWrapper">
            <div @click="googleLogin" class="googleButton">
              <img src="@/assets/imgs/icons/googleSignin.png" alt="">
            </div>
                  <div @click="goToSignup()" class="boxSection link">
                  <h3>New To Moebius Dungeons?</h3>
                  <p >Sign Up Here.</p>
            </div>
            </section>

            <div>
              <div v-if="error" class="alert alert-danger"><p>{{error}}</p></div>
              <form action="#" @submit.prevent="submit">
               <div>
                <label for="name" class="col-md-4 col-form-label text-md-right">
                  <p class="fieldName">
                    Knighthood Name:
                  </p>
                </label>
                <div class="col-md-6">
                  <input
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    placeholder="Your Username"
                    autocomplete="nickname"
                    value
                    required
                    autofocus
                    v-model="form.name"
                  />
                </div>
                  </div>
                <div class="form-group row">
                  <label for="password" class="col-md-4 col-form-label text-md-right">
                    <p>
                    Password:
                    </p>
                  </label>

                  <div class="col-md-6">
                    <input
                      id="password"
                      type="password"
                      class="form-control"
                      name="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      required
                      v-model="form.password"
                    />
                  </div>
                </div>

                <div class="form-group row mb-0">
                  <div class="submission col-md-8 offset-md-4">
                    <button type="submit" class="btn btn-primary">
                      <h3>
                        Login
                      </h3>
                    </button>
                  </div>
              </div>
            </form>
              </div>
            </section>

            <p class="hoverOver" @click="toTerms()">Creating an account means you agree to the terms, available by clicking here.</p>

            <hr>

              <div class="form-group row mb-0">
                  <div class="submission col-md-8 offset-md-4">
                    <button @click="playAnyways" class="btn btn-primary">
                      <h3>
                        Play Without Signing Up
                      </h3>
                    </button>
                  </div>
              </div>

            <section>
            </section>
          </div>
        </div>
      </div>

    </div>


  </div>
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
  submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.name.replace(/\s/g, "")+'@fakeemail.com', this.form.password)
        .catch(err => {
          this.error = err.message;
        });
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
h1 {
  padding:0px;
  margin:0px;
}

hr {
  color:#666;
  border:#666 solid 1px;
  width:100%;
  margin:20px 0;
}

.flexRow {
  display:flex;
  flex-direction:row;
  align-items:center;
  margin: 5px 0;
}

.flexRowBetween {
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content: space-between;
  margin: 5px 0;
}

.hoverOver:hover {
  cursor:pointer;
  color:gold;
}

.card {
  text-align:center;
}

.registration {
  margin-bottom:10px
}

.boxSection {
  border:solid black 1px;
  box-shadow:#777 0px 3px 5px;
  padding:15px;
  text-align:center;
}

.link:hover {
  color:black;
  background:rgb(255, 249, 212);
  border:gold solid 1px;
  cursor:pointer;
}

.aboveHeader {
  margin-bottom:10px;
}
.subtitle {
  font-size:13px;
  color:#999;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.fieldName {
  margin-right:10px;
}

.container { 
  max-width:600px;
}

button {
  cursor:pointer;
}

.card-header img {
  width:100px;
  padding: 0 10px;
}

.alert {
  color:red;
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

.card-body{
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
}

.submission {
  margin-top:10px;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-evenly;
}

.submission p:hover {
  cursor:pointer;
  color:gold;
}
</style>