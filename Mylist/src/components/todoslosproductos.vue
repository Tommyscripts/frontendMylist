<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="8"
        sm="4"
        v-for="(categoria, idx) in categorias"
        :key="idx"
      >
        <v-card
          class="mx-auto"
          max-width="344"
          :class="categoria.color"
          :to="categoria.route"
        >
          <v-card-title>
            <v-avatar>
              <v-img :src="categoria.img"></v-img>
            </v-avatar>
            {{ categoria.name }}
          </v-card-title>
        </v-card>
      </v-col>
      <v-row id="btn">
        <v-btn rounded color="#375B83" @click="retroceder()">
          <a id="colores"><v-icon>mdi-arrow-left</v-icon> Back</a>
        </v-btn>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Button",
  methods: {
    retroceder() {
      this.$router.go(-1);
    },
  },
  data() {
    return {
      categorias: [
        {
          name: "Carnes",
          color: "carnes",
          img: "https://cdn-icons-png.flaticon.com/512/1046/1046769.png",
          route: "/carnes",
        },
        {
          name: "Pescaderia",
          color: "pescados",
          img: "https://cdn-icons-png.flaticon.com/512/3142/3142692.png",
          route: "/pescados",
        },
        {
          name: "Congelados",
          color: "congelados",
          img: "https://cdn-icons-png.flaticon.com/512/5029/5029236.png",
          route: "/congelados",
        },
        {
          name: "Arroces",
          color: "arroces",
          img: "https://cdn-icons-png.flaticon.com/512/2714/2714041.png",
          route: "/arroces",
        },
        {
          name: "Lacteos y huevos",
          color: "lacteosyhuevos",
          img: "https://cdn-icons-png.flaticon.com/512/1509/1509470.png",
          route:"/lacteosyhuevos"
        },
        {
          name: "Pasta",
          color: "pasta",
          img: "https://cdn-icons-png.flaticon.com/512/3871/3871987.png",
          route: "/pasta"
        },
        {
          name: "Verduras",
          color: "verduras",
          img: "https://cdn-icons-png.flaticon.com/512/4251/4251938.png",
          route: "/verduras"
        },
        {
          name: "Frutas",
          color: "frutas",
          img: "https://cdn-icons-png.flaticon.com/512/1625/1625048.png",
        },
        {
          name: "Embutidos",
          color: "embutidos",
          img: "https://cdn-icons-png.flaticon.com/512/5239/5239138.png",
        },
        {
          name: "Panaderia",
          color: "panaderia",
          img: "https://cdn-icons-png.flaticon.com/512/992/992747.png",
        },
        {
          name: "Frutos secos",
          color: "frutosSecos",
          img: "https://cdn-icons-png.flaticon.com/512/5263/5263359.png",
        },
        {
          name: "Salsas",
          color: "salsas",
          img: "https://cdn-icons-png.flaticon.com/512/3082/3082037.png",
        },
        {
          name: "Encurtidos",
          color: "encurtidos",
          img: "https://cdn-icons-png.flaticon.com/512/2079/2079331.png",
        },
        {
          name: "Cafe y azucar",
          color: "cafeyAzucar",
          img: "https://cdn-icons-png.flaticon.com/512/6451/6451224.png",
        },
        {
          name: "Bollería",
          color: "bolleria",
          img: "https://cdn-icons-png.flaticon.com/512/977/977699.png",
        },
        {
          name: "Limpieza",
          color: "limpieza",
          img: "https://cdn-icons-png.flaticon.com/512/994/994928.png",
        },
      ],
    };
  },
};
</script>

<style>
.carnes {
  background-color: #bb6a3d;
  color: white;
}
.pescados {
  background-color: #494f60;
  color: white;
}
.congelados {
  background-color: #415a9b;
  color: white;
}
.arroces {
  background-color: #3f91be;
  color: white;
}
.lacteosyhuevos {
  background-color: #aaac57;
  color: white;
}
.pasta {
  background-color: #bbae3d;
  color: white;
}
.verduras {
  background-color: #7c9c38;
  color: white;
}
.frutas {
  background-color: #9c6838;
  color: white;
}
.embutidos {
  background-color: #826d61;
  color: white;
}
.panaderia {
  background-color: #774427;
  color: white;
}
.frutosSecos {
  background-color: #9b4141;
  color: white;
}
.salsas {
  background-color: #8f5678;
  color: white;
}
.encurtidos {
  background-color: #568f85;
  color: white;
}
.cafeyAzucar {
  background-color: #6d3a33;
  color: white;
}
.bolleria {
  background-color: #8f7c56;
  color: white;
}
.limpieza {
  background-color: #bc419a;
  color: white;
}
</style>
