<template>
  <div class="q-pa-md">
        <div class="join-us-title" >Join Us!</div>

        <div class="join-us-fields">

          <q-input v-model="first_name" filled type="text" hint="First Name" />

          <q-input v-model="last_name" filled type="text" hint="Last Name" />

          <q-input v-model="user_name" filled type="text" hint="User Name" />

          <q-input v-model="password" filled type="password" hint="Password" />

          <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
            <template v-slot:append>
              <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

        </div>

        <div class="join-us-fields">

          <q-input v-model="email" filled type="email" hint="Email" />

          <q-input v-model="phone_number" filled type="tel" hint="Telephone number" />

          <q-input v-model="date_of_birth" filled type="date" hint="Date of birth" />

          <q-input v-model="address" filled type="text" hint="Address" />

          <q-input v-model="favorite_sports" filled type="text" hint="Favorite Sports" />

        </div>

        <div> <q-btn push class="join-us-button" color="white" text-color="black" label="Sign In" /> </div>
  </div>
</template>

<script>
export default {
name: "JoinUs",
  lorem: 'Lorem ipsum dolor sit amet',
  data () {
    return {
      first_name: '',
      last_name: '',
      user_name: '',
      password: '',
      isPwd: true,
      email: '',
      date_of_birth: '',
      phone_number: '',
      address: '',
      favorite_sports: '',
    }
  }
}
</script>

<style scoped>
.join-us-title{
  font-family: "Berlin Sans FB";
  font-size: 50px;
  margin-left: 20px;
}
.join-us-button{
  margin: 20px;

}

.q-pa-md{
  border: 3px solid #fff;
  padding: 20px;
}

.join-us-fields{
  width: 50%;
  float: left;
  padding: 20px;
/*  border: 2px solid red;*/
}
</style>