<script>
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: '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',
})
const openai = new OpenAIApi(configuration)

export default {
  data() {
    return {
      question: 'Write a poem about a dog wearing skis.',
      ques: '\n\nQ:' + this.question + '\nA:',
      answer: '',
      oldres: '',
    }
  },
  mounted() {
    this.sendreq()
  },
  methods: {
    sendreq() {
      var temp = JSON.parse(localStorage.getItem('answer'))
      this.oldres = temp
      for (var i = 0; i < temp.length; i++) {
        console.log(temp[i][0])
      }
    },
    async resp() {
      this.$toast.success('Request Sent.', {
        // override the global option
        position: 'top-right',
      })
      const response = await openai.createCompletion('text-davinci-002', {
        prompt: this.question,
        temperature: 0,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      })
      const ans = response.data.choices[0].text
      const q = this.question
      var arr = [q, ans]
      if (localStorage.answer == null) {
        localStorage.setItem('answer', JSON.stringify([arr]))
      } else {
        var storedanswers = JSON.parse(localStorage.getItem('answer'))
        console.log(storedanswers)
        storedanswers.unshift(arr)
        localStorage.setItem('answer', JSON.stringify(storedanswers))
      }

      console.log(ans)
      this.answer = ans
      this.sendreq()
    },
  },
}
</script>

<template>
  <div>
    <h1>Ask Me Anything</h1>
    <br />
    <div class="input-group mx-5 mb-3">
      <span class="input-group-text">Ask away</span>
      <textarea
        class="form-control"
        aria-label="With textarea"
        v-model="question"
      ></textarea>
    </div>
    <div class="mb-3">
      <button class="btn btn-primary" @click="resp()">GTP3 AI Response</button>
    </div>
    <div class=" mx-5">
      <table class="table table-bordered table-striped" >
      <thead>
        <tr>
          <th scope="col">Question</th>
          <th scope="col">Answer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(q, index) in oldres" :key="index">
          <td>{{ q[0] }}</td>
          <td>{{ q[1] }}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
