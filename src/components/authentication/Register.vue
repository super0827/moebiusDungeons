<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
            <div class="aboveHeader">
            <h1>Moebius Dungeons</h1>
            </div>
          <div class="card-header flexRow flexSpaceEven">
            <div>
            <p>Swear the oath to become a <strong>Kingloyal Knight</strong> admitted into the King's Coterie, a group of adventurers renown across all <strong>Amara.</strong> It's your job to slay monsters and delve dungeons, <em>all to keep the grand kingdom of Eyien safe at night.</em>
            </p>
            <p>
            Fight back the infinite threats until you're ready to retire.
            </p> 
            
            <p><strong>Compete for the title of the most accomplished Kingloyal in the realm.</strong></p>
            </div>

            <img src="../../assets/imgs/icons/playerSigilIcon.png" alt="">
          </div>

          <br>
            
          <div class="card-body">
            <div class="boxSection">
            <div v-if="error" class="alert alert-danger"><p>{{error}}</p></div>
            <form action="#" @submit.prevent="submit">
            <div class="form-group row">
                  <div class="flexRow flexSpaceEven">
                <label for="name" class="col-md-4 col-form-label text-md-right">
                  <p class="fieldName">
                    *Knighthood Name:
                  </p>
                </label>
                <div class="col-md-6">
                  <input
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    value
                    required
                    autofocus
                    v-model="form.name"
                  />
                </div>
                  </div>
                  <p class="subtitle">Knighthood name may be visible on leaderboards, please keep it clean.</p>
              </div>

              <div class="form-group row">
                <div class="flexRow flexSpaceEven">
                <label for="email" class="col-md-4 col-form-label text-md-right">

                  <p class="fieldName">
                  Email:
                  </p>
                </label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
                  </div>
              </div>

              <div class="form-group row">
                <div class="flexRow flexSpaceEven">

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
                    autocomplete="on"
                    required
                    v-model="form.password"
                  />
                </div>
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="submission col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">
                    <h3>
                      Register
                    </h3>
                  </button>

                </div>
              </div>
            </form>
          </div>
            <div class="marginTop">
              <p @click="goToLogin()">I don't want to sign up, just let me play.</p>
            </div>
          </div>
          </div>

      </div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
  submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          var user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: this.form.name
          })
          console.log(`in the registrations: name is ${this.form.name}`)
          this.$store.commit(`authData/SET_USER`, this.form.name, {root:true})
        })
        .catch(err => {
          this.error = err.message;
        });
    },
  },
  created() {
    firebase.auth().useDeviceLanguage();
  }
};
</script>

<style scoped>

h1 {
  padding:0px;
  margin:0px;
}

.flexRow {
  display:flex;
  flex-direction:row;
  margin: 5px 0;
}

.flexSpaceEven {
  justify-content: space-evenly;
  align-items: center;
}

.flexCenter {
  justify-content:center;
  align-items: center;
}

.card {
  text-align:center;
}

.registration {
  margin-bottom:10px
}

.card-header {
  border:solid black 1px;
  box-shadow:#777 0px 3px 5px;
  padding:25px;
  text-align:center;
}

.marginTop {
  margin-top:10px;
}

.boxSection {
  border:solid black 1px;
  box-shadow:#777 0px 3px 5px;
  padding:15px;
  text-align:center;
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
  max-width:450px;
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

.card-body{
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
}

.googleButton:hover{
  cursor:pointer;
  transform: scale(1.03, 1.03);
  transition: all .3s
}

.submission {
  margin-top:10px;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-evenly;
}

.marginTop p:hover {
  cursor:pointer;
  color:red;
}
</style>