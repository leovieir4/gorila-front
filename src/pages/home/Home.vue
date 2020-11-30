<template>
    <div class="container">
        <div class="card card-container">
            <div class="row">
              <div class="col col-logout">
                <button type="button" class="btn btn-danger" @click="logout">SAIR</button>
              </div>
            </div>
            <div class="row">
              <div class="col col-chart">
                <pie-chart :data ="dataToChart"></pie-chart>
              </div>
            </div>
            <p id="profile-name" class="profile-name-card"></p>
            <div class="row" style="margin-top: 25px;">
              <div class="col-3">
                  <label for="cars">Tipo de investimento: *</label><br>
                  <select class="form-control fixa-select" v-model="selected"  >
                     <option v-for="option in form.types" v-bind:value="option.name" v-bind:key="option.id">
                        {{ option.name }}
                     </option>
                  </select>
              </div>
              <div class="col-3"  v-show="selected !== 'Renda fixa'">
                  <label for="cars">Ativo (Ação) {{form.ticket}}: *</label><br>
                  <select class="form-control fixa-select" v-model="form.ticket"  >
                     <option v-for="option in form.tickets" v-bind:value="option" v-bind:key="option.name">
                        {{ option }}
                     </option>
                  </select>
              </div>
              <div class="col-3">
                  <div class="form-group">
                  <label for="exampleInputEmail1">valor *</label>
                  <input class="form-control" maxlength="10" @keyup="validValue" v-model="form.value" aria-describedby="emailHelp" placeholder="Entre com o value">
              </div>
              </div>
              <div class="col-3">
                <div class="form-group">
                  <label for="exampleInputEmail1">Data{{form.data}} *</label>
                 <input v-model="form.data" class="form-control" type="date">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-1 add-btn-col">
                <div class="form-group">
                  <button type="button" class="btn btn-primary add-btn" @click="add">Adicionar</button>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col col-title">
                Lista de investimentos
              </div>
            </div>
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table class="table table-bordered table-striped mb-0">
             <thead>
               <tr>
                 <th scope="col">Tipo</th>
                 <th scope="col">value</th>
                 <th scope="col">Data</th>
                 <th scope="col">Ativo</th>
                 <th scope="col">Remover</th>
               </tr>
             </thead>
             <tbody>
               <tr v-for="ticket in  investments" v-bind:key="ticket.id">
                 <td>Renda {{ticket.type}}</td>
                 <td>R$:${{ticket.value}}</td>
                 <td>{{(new Date(1606666922574).getDate()+1) + '/' + new Date(1606666922574).getMonth() + '/' + new Date(1606666922574).getFullYear()}}</td>
                 <td>{{ticket.ticket || '#'}}</td>
                 <td class="td-remove"><button type="button" class="btn btn-danger" @click="remove(ticket.id)">REMOVER</button></td>
               </tr>
             </tbody>
           </table>
           </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    form: {
      data: '',
      value: null,
      tickets: [],
      ticket: '',
      types: [{ name: 'Renda fixa' }, { name: 'Renda variavel' }]
    },
    dataToChart: [],
    investments: [],
    selected: 'Renda fixa'
  }),
  mounted: function () {
    this.ActionLoadToken()
    if (!localStorage.getItem('token')) {
      this.$router.push('/')
    }
    this.ActionGetTickets().then((result) => {
      this.form.tickets = result.split(',')
    })
    if (localStorage.getItem('investments')) {
      this.investments = JSON.parse(localStorage.getItem('investments'))
    } else {
      this.ActionLoadInvestments().then((data) => {
        this.investments = data.body
        localStorage.setItem('investments', JSON.stringify(this.investments))
      })
    }
    setTimeout(() => {
      this.getChartData()
    }, 600)
  },
  methods: {
    ...mapActions('auth', ['ActionGetTickets', 'ActionLoadInvestments', 'ActionGetLocalUserId', 'ActionInserTinvestment', 'ActionInvestmentsDelete', 'ActionLoadToken']),
    async submit () {
      try {

      } catch (err) {
        window.alert('Error ao logar')
      }
    },
    async add () {
      if (!this.validForm()) {
        this.$toasted.show('Eita! os campos marcados com * são obrigatórtios! você deve ter esquecido algum', { duration: 6000 })
        return false
      }
      let request = { }
      if (this.selected === 'Renda fixa') {
        request = {
          type: 'fixa',
          userId: await this.ActionGetLocalUserId(),
          data: new Date(this.form.data).getTime(),
          value: this.form.value
        }
      } else {
        request = {
          type: 'variavel',
          userId: await this.ActionGetLocalUserId(),
          data: new Date(this.form.data).getTime(),
          value: this.form.value,
          ticket: this.form.ticket
        }
      }
      const addInvest = await this.ActionInserTinvestment(request)
      request.id = addInvest.data.id
      this.investments.push(request)
      localStorage.setItem('investments', JSON.stringify(this.investments))
      this.getChartData()
      this.$toasted.show('O investimento foi adicionado', { duration: 6000 })
    },
    async remove (id) {
      await this.ActionInvestmentsDelete(id)
      const novo = this.investments.map((isId) => {
        return (isId.id !== id) ? isId : null
      })
      this.investments = novo.filter(isId => isId)
      localStorage.setItem('investments', JSON.stringify(this.investments))
      this.getChartData()
      this.$toasted.show('O investimento foi removido!', { duration: 6000 })
    },
    validValue () {
      if (isNaN(parseInt(this.form.value))) {
        this.form.value = ''
        this.$toasted.show('Poxa irmão(a)! isso ai tem que ser um número!', { duration: 6000 })
      }
    },
    async getChartData () {
      const variada = ['Renda Variavel', 0]
      const fixa = ['Renda Fixa', 0]
      this.investments.forEach(element => {
        if (element.type === 'variavel') {
          variada[1] = variada[1] + element.value
        } else {
          fixa[1] = fixa[1] + element.value
        }
      })
      this.dataToChart = [variada, fixa]
    },
    validForm () {
      if (this.selected === 'Renda fixa') {
        return (this.form.value && this.form.data)
      } else {
        return (this.form.value && this.form.data && this.form.ticket)
      }
    },
    logout () {
      localStorage.removeItem('Tickets')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('investments')
      this.$router.push('/')
    }
  }
}
</script>
<style lang="css">
</style>
