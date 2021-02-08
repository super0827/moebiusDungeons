<template>
  <b-col cols='8'>
    <div class="d-flex flex-column justify-content-start align-items-center">
      <section class="text-center mb-2">
        <h1>SIGN UP</h1>
      </section>
      
      <section class="d-flex flex-column">    
        <div class="p-4 border mb-3">
          <img class="mr-3 float-left" src="@/assets/imgs/icons/playerSigilIcon.png" alt="">
          <p>Swear the oath to become a <strong>Kingloyal Knight</strong> admitted into the King's Coterie, a group of adventurers renown across all <strong>Amara.</strong> It's your job to slay monsters and delve dungeons, <em>all to keep the grand kingdom of Eyien safe at night.</em></p>
          <p><strong>Compete for the title of the most accomplished Kingloyal in the realm</strong> and fight back the infinite threats until you're ready to retire.</p> 
          <h4 class="text-center">Good luck, adventurer. <em>You'll need it.</em></h4>
        </div>
          
        <div v-if="error" class="alert alert-danger"><p>{{error}}</p></div>
         
        <b-form @submit="submit" @reset='reset'>
          <b-form-group
            id="input-group-1"
            label="Knighthood Name:"
            label-for="input-1"
            description="Your chosen knighthood name may be visible on leaderboards, please keep it clean."
          >
            <b-form-input
              id="input-1"
              v-model="form.name"
              placeholder="Your Desired Knighthood Name"
              required
            ></b-form-input>
          </b-form-group>
        
            <b-form-group
              id="input-group-2"
              label="Password:"
              label-for="input-2"
              description="Input a secure password."
            >
              <b-form-input
                id="input-2"
                v-model="form.password"
                placeholder="Password"
                required
              ></b-form-input>
            </b-form-group>
          
            <b-form-group
              id="input-group-3"
              label="Confirm Password:"
              label-for="input-3"
              description="Please double check your desired password."
            >
              <b-form-input
                id="input-2"
                v-model="form.confirmPassword"
                placeholder="Retype Password"
                required
              ></b-form-input>
            </b-form-group>

          <span class="d-flex justify-content-end mt-3">
            <b-button class="mr-2" type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="warning">Reset</b-button>
          </span>
        </b-form>
      </section>
    </div>
  </b-col>
</template>


<script>
import firebase from "firebase/app";
import 'firebase/auth'

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      error: null,
    };
  },
  methods: {
  submit(event) {
      event.preventDefault()
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.name.replace(/\s/g, "") + '@fakeemail.com', this.form.password)
        .then(() => {
          var user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: this.form.name
          })
          this.$store.commit(`authData/SET_USER`, {displayName: this.form.name, email:this.form.name+'@fakeemail.com'}, {root:true})
        })
        .catch(err => {
          this.error = err.message;
          if(err.code === 'auth/email-already-in-use') {
            this.error = 'Username already exists! Try another name.'
          }
        });
    },
    reset(event) {
       event.preventDefault()
        this.form.name = ''
        this.form.password = ''
        this.confirmPassword = '',
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
    }
  },
  created() {
    firebase.auth().useDeviceLanguage();
  }
};
</script>

<style scoped>

</style>