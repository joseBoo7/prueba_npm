<template>
  <div class="about">
    <h1>Comentarios</h1>
    <br />
    <div class="container col-4 border">
      <form>
        <div class="form-group my-3">
          <label for="exampleInputEmail1">Nombre</label>
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Ingrese su nombre"
            v-model="nombre"
            required
          />
        </div>
        <div class="form-group my-3">
          <label for="exampleInputPassword1">Comentario</label>
          <input
            type="text"
            class="form-control"
            v-model="comentario"
            placeholder="Ingrese su comentario"
            required
          />
        </div>
        <button
          type="button"
          @click="saveEditItem()"
          class="btn btn-primary form-control my-3"
        >
          ENVIAR
        </button>
      </form>
      <div>
        <b-table  sort-by="id" striped hover :items="desserts"></b-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    estados: [
      { value: false, name: "Activo" },
      { value: true, name: "Inactivo" },
    ],
    rulesCampo: [(v) => !!v || "Campo requerido"],
    page: {
      title: "Categorias",
    },
    breadcrumbs: [
      {
        text: "Categorías",
        disabled: false,
        to: "#",
      },
      {
        text: "Todos las Categorías",
        disabled: true,
      },
    ],

    items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ],

    dialog: false,
    search: "",
    headers: [
      { text: "Usuario", value: "name" },
      { text: "Comentario", value: "comment" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      name: "",
      props: {
        deleted: Boolean,
      },
      timestamp: "",
    },
    submitted: false,
    defaultItem: {
      id: null,
      name: "",
      props: {
        deleted: Boolean,
      },
      timestamp: "",
    },
  }),

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      let res = await this.$axios.get("/publication/list");
        var aux = [];
        for (var i in res.data) {
          var obj = {
            name: res.data[i].name,
            comment: res.data[i].comment,
          };
          aux.push(obj);
        }
        this.desserts = aux;
    },
    async saveEditItem() {
      //console.log(this.editedItem.status);
      try {
        await this.$axios.post("/publication/register", {
          name: this.nombre,
          comment: this.comentario,
        }).then(() => {
            this.initialize();
          });
      } catch (e) {
        console.log(e.response);
      }
    },
  },
};
</script>
