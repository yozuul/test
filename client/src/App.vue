<template>
  <div>
  <img alt="Vue logo" src="./assets/logo.png">
</div>
   <input
      @input="changeInput"
      v-model="oneUrl"
      placeholder="Укажите ссылку на сайт"
   >
   <button @click="parseData('oneUrl')" :disabled="disableFirst">Спарсить</button>
   <div class="list" v-for="link in links" v-bind:key="link.id">
      <input type="checkbox" :id=link.id @click="toggleCheckbox($event.target)">
      <label :for="link.id">{{link.url}}</label>
   </div>
   <div>
      <button @click="parseData('manyUrl')" :disabled="disableSecond">Спарсить выбранное</button>
   </div>
</template>

<script setup>
import { ref } from 'vue';
const oneUrl = ref('https://www.google.com/')
let manyUrl = []
const disableFirst = ref(false)
const disableSecond = ref(true)

async function parseData(what) {
   let parseData = (what === 'manyUrl' ? manyUrl : oneUrl.value)
   console.log(parseData)
   const response = await fetch('http://localhost:4000/parseOne', {
      method: 'POST',
      body: JSON.stringify({ url: parseData }),
      headers: { 'Content-Type': 'application/json' }
   })
   const data = await response.text()
   console.log(data)
}
const links = ref([
   {
      id: 1, url: 'https://www.google.com/',
   },
   {
      id: 2, url: 'https://github.com/',
   },
   {
      id: 3, url: 'https://hh.ru/',
   }
])
function toggleCheckbox(url) {
   if(url.checked) {
      manyUrl.push(url.id)
   } else {
      manyUrl = manyUrl.filter((id) => id !== url.id)
   }
   disableSecond.value = (manyUrl.length > 0 ? false : true)
}
function changeInput() {
   disableFirst.value = (oneUrl.value.length > 0 ? false : true)
}
</script>

<style>
button {
   margin-bottom: 15px;
}
.hidden {
   display: none;
}
.list {
   text-align: left;
   max-width: 200px;
   margin: auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
