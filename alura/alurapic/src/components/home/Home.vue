<template>
  <div>
    <img src="/static/teste.png" />
    <h1 class="centralizado">{{ titulo }}</h1>
    <!-- MESMO RESULTADO: <h1 v-text="titulo"></h1> -->

    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

    <!-- v-on com @ -->
    <!-- <input type="search" class="filtro" @:input="filtro = $event.target.value" placeholder="Filtre pelo título" /> -->
    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="Filtre pelo título" />
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto in fotosComFiltro" :key="foto._id">
        <meu-painel :titulo="foto.titulo">
            <!-- o que está depois do . na diretiva é o modificador -->
            <!-- o que está depois de : na diretiva é o argumento -->
            <imagem-responsiva
                v-meu-transform:scale.animate.reverse="1.2" 
                :url="foto.url" 
                :titulo="foto.titulo" />
            <!-- Named slot: -->
            <!-- <div slot="solt-name-1">
                <h1>Title</h1>
            </div>
            <p>I can still use default slot</p>
            <div slot="solt-name-2">
                <p>Paragraph</p>
            </div> -->
            <router-link :to="{ name: 'altera', params: { id: foto._id } }">
                <meu-botao tipo="button" rotulo="ALTERAR" />
            </router-link>
            <meu-botao 
                tipo="button"
                rotulo="REMOVER" 
                @botaoAtivado="remove($event, foto)" 
                :confirmacao="true" 
                estilo="perigo" />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import Botao from '../shared/botao/Botao.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import FotoService from '../../domain/foto/FotoService';

export default {

    components: {
        'meu-painel': Painel,
        'meu-botao': Botao,
        'imagem-responsiva': ImagemResponsiva
    },
    // a propriedade directives pode ser usada para importar
    // diretivas não globais pra dentro do componente, e nomea-la
    // como quiser, como os componentes. A diretiva precisa dar o
    // o export default para isso, ai não precisa usar o vue global
    // object para declará-la dentro dela mesma.

    data() {
        return {
            titulo: 'Alurapic',
            fotos: [],
            filtro: '',
            mensagem: ''
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

    methods: {
        remove($event, foto) {
            console.log('Remover a foto ' + foto.titulo + ' em ' + $event);
            // this.$http.delete(`v1/fotos/${foto._id}`)
            this.service.apaga(foto._id)
                .then(() => {
                    let indice = this.fotos.indexOf(foto);
                    this.fotos.splice(indice, 1);
                    this.mensagem = 'Foto removida com sucesso';
                }, err => this.mensagem = err.message);
        }
    },

    created() {
        this.service = new FotoService(this.$resource);
        this.service.lista()
            .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);

        // this.$http.get('v1/fotos')
        //     // res.json() também é uma promisse
        //     .then(res => res.json())
        //     .then(fotos => this.fotos = fotos, err => console.log(err));
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
