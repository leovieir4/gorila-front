<template>
    <div class="container">
        <div class="card card-container">
            <img id="profile-img" class="profile-img-card" src="https://s3.amazonaws.com/sample-login/companies/avatars/000/001/708/original/Icon_Gorila_hiRes.png?1529523010" />
            <p id="profile-name" class="profile-name-card"></p>
            <form class="form-signin">
                <span id="reauth-email" class="reauth-email"></span>
                <input type="email" v-model="form.email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                <input type="password" v-model="form.password" id="inputPassword" class="form-control" placeholder="Password" required>
                <input type="password" v-if = "isCreate" v-model="form.passwordConfirmation" id="inputPassword" class="form-control" placeholder="Password Confirmation">
                <button v-if="!isCreate" type="submit" class="btn btn-lg btn-primary btn-block btn-signin" @click="submit">Sign in</button>
                <button @click="signup" class="btn btn-lg btn-danger  btn-signin">Sign Up</button>
            </form><!-- /form -->
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    isCreate: false,
    form: {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }),
  created: function () {
    if (localStorage.getItem('token')) {
      this.$router.push('home')
    }
  },
  methods: {
    ...mapActions('auth', ['ActionDoLogin', 'ActionLoadTickets', 'ActionSetTickets', 'ActionCreateUser']),
    async submit () {
      try {
        await this.ActionDoLogin(this.form)
        const data = await this.ActionLoadTickets()
        const { body } = data
        this.ActionSetTickets(body)
        this.$router.push('home')
      } catch (err) {
        this.$toasted.show('Eita! Acho que você digitou a senha ou o email errado ou esqueceu algum dos dois! :)', { duration: 6000 })
      }
    },
    async signup () {
      try {
        if (this.isCreate) {
          this.form.name = this.form.email
          await this.ActionCreateUser(this.form)
          this.$toasted.show('Boa! Seu usuario foi criado com sucesso agora é só logar :)', { duration: 6000 })
        } else {
          this.$toasted.show('Digite um email valido e as senhas devem se corresponder :)', { duration: 6000 })
        }
        this.form.email = ''
        this.form.password = ''
        this.isCreate = !this.isCreate
      } catch (error) {
        this.$toasted.show('Ops! Verifique se as senhas conferem e se o email é valido :(', { duration: 6000 })
      }
    }
  }
}
</script>
<style lang="css" scoped>
.container {
  height: 70vw !important;

}
.card-container.card {
    max-width: 40% !important;

    padding: 40px 40px;
}
.html {
  height: 10px!important;
}
.btn-danger {
  background-color: red;
}
</style>
