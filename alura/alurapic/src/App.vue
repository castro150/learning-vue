<template>
  <div>
    <h1>{{ titulo }}</h1>
    <h1 v-text="titulo"></h1>

    <ul>
      <li v-for="foto in fotos" :key="foto.titulo">
        <img :src="foto.url" :alt="foto.titulo">
      </li>
    </ul>
  </div>
</template>

<script>
export default {

  data() {
    return {
      titulo: 'Alurapic',
      fotos: [
        {
          url: 'http://tudosobrecachorros.com.br/wp-content/uploads/cachorro-independente.jpg',
          titulo: 'cachorro'
        },
        {
          url: 'http://tudosobrecachorros.com.br/wp-content/uploads/cachorro-independente.jpg',
          titulo: 'cachorrao'
        }
      ]
    }
  }

}
</script>

<style>
</style>
