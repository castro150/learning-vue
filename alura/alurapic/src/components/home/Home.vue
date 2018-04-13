<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <!-- MESMO RESULTADO: <h1 v-text="titulo"></h1> -->

    <!-- v-on com @ -->
    <!-- <input type="search" class="filtro" @:input="filtro = $event.target.value" placeholder="Filtre pelo título" /> -->
    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="Filtre pelo título" />
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto in fotosComFiltro" :key="foto._id">
        <meu-painel :titulo="foto.titulo">
            <imagem-responsiva :url="foto.url" :titulo="foto.titulo"></imagem-responsiva>
            <!-- Named slot: -->
            <!-- <div slot="solt-name-1">
                <h1>Title</h1>
            </div>
            <p>I can still use default slot</p>
            <div slot="solt-name-2">
                <p>Paragraph</p>
            </div> -->
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';

export default {

    components: {
        'meu-painel': Painel,
        'imagem-responsiva': ImagemResponsiva
    },

    data() {
        return {
            titulo: 'Alurapic',
            fotos: [],
            filtro: ''
        }
    },

    computed: {
        fotosComFiltro() {
            if(this.filtro) {
                // Trim para tirar espaços, e i para case insensitive
                let exp = new RegExp(this.filtro.trim(), 'i');
                return this.fotos.filter(foto => exp.test(foto.titulo));
            } else {
                return this.fotos;
            }
        }
    },

    created() {
        this.$http.get('http://localhost:3000/v1/fotos')
            // res.json() também é uma promisse
            .then(res => res.json())
            .then(fotos => this.fotos = fotos, err => console.log(err));
    }

}
</script>

<style>
.centralizado {
    text-align: center;
}

.list-fotos {
    list-style: none;
}

.lista-fotos .lista-fotos-item {
    display: inline-block;
}

.filtro {
    display: block;
    width: 100%;
}
</style>
