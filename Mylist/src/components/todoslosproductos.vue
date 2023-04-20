<template>
 <v-container>
    <v-row>
        <v-col cols="12" md="8" sm="4" v-for="(categoria, idx) in categorias" :key="idx" >
            <v-card class="mx-auto" max-width="344" :class="categoria.color" :to="categoria.route">
                <v-card-title>
                    <v-avatar>
                    <v-img :src="categoria.img"></v-img>
                </v-avatar>
                    {{ categoria.name }}
                </v-card-title>
            </v-card>
        </v-col>
    </v-row>
 </v-container>
</template>

<script>

export default {
  data() {
    return {
        categorias:[
            {
                name: "Carnes",
                color: "carnes",
                img:"https://cdn-icons-png.flaticon.com/512/1046/1046769.png",
                route:"/carnes",
            },
            {
                name: "Pescaderia",
                color: "pescados",
                img:"https://cdn-icons-png.flaticon.com/512/3142/3142692.png",
                route:"/pescados",
            },
            {
                name: "Congelados",
                color: "congelados",
                img:"https://cdn-icons-png.flaticon.com/512/5029/5029236.png",
                route: "/congelados"
            },
            {
                name: "Arroces",
                color: "arroces",
                img:"https://cdn-icons-png.flaticon.com/512/2714/2714041.png",
                route:"/arroces"
            },
            {
                name: "Lacteos y huevos",
                color: "lacteosyhuevos",
                img:"https://cdn-icons-png.flaticon.com/512/1509/1509470.png",
            },
            {
                name: "Pasta",
                color: "pasta",
                img:"https://cdn-icons-png.flaticon.com/512/3871/3871987.png",
            },
            {
                name: "Verduras",
                color: "verduras",
                img:"https://cdn-icons-png.flaticon.com/512/4251/4251938.png",
            },
            {
                name: "Frutas",
                color: "frutas",
                img:"https://cdn-icons-png.flaticon.com/512/1625/1625048.png",
            },
            {
                name: "Embutidos",
                color: "embutidos",
                img:"https://cdn-icons-png.flaticon.com/512/5239/5239138.png",
            },
            {
                name: "Panaderia",
                color: "panaderia",
                img:"https://cdn-icons-png.flaticon.com/512/992/992747.png",
            },
            {
                name: "Frutos secos",
                color: "frutosSecos",
                img:"https://cdn-icons-png.flaticon.com/512/5263/5263359.png",
            },
            {
                name: "Salsas",
                color: "salsas",
                img:"https://cdn-icons-png.flaticon.com/512/3082/3082037.png",
            },
            {
                name: "Encurtidos",
                color: "encurtidos",
                img:"https://cdn-icons-png.flaticon.com/512/2079/2079331.png",
            },
            {
                name: "Cafe y azucar",
                color: "cafeyAzucar",
                img:"https://cdn-icons-png.flaticon.com/512/6451/6451224.png",
            },
            {
                name: "Bollería",
                color: "bolleria",
                img:"https://cdn-icons-png.flaticon.com/512/977/977699.png",
            },
            {
                name: "Limpieza",
                color: "limpieza",
                img:"https://cdn-icons-png.flaticon.com/512/994/994928.png",
            },
        ]
    };
  },
};
</script>

<style>
.carnes {
    background-color: #BB6A3D;
    color: white;
  }
.pescados {
    background-color: #494F60;
    color: white;
  }
.congelados {
    background-color: #415A9B;
    color: white;
  }
.arroces {
  background-color: #3F91BE;
  color: white;
}
.lacteosyhuevos {
  background-color: #AAAC57;
  color: white;
}
.pasta {
  background-color: #BBAE3D;
  color: white;
}
.verduras {
  background-color: #7C9C38;
  color: white;
}
.frutas {
  background-color: #9C6838;
  color: white;
}
.embutidos {
  background-color: #826D61;
  color: white;
}
.panaderia {
  background-color: #774427;
  color: white;
}
.frutosSecos {
  background-color: #9B4141;
  color: white;
}
.salsas {
  background-color: #8F5678;
  color: white;
}
.encurtidos {
  background-color: #568F85;
  color: white;
}
.cafeyAzucar {
  background-color: #6D3A33;
  color: white;
}
.bolleria {
  background-color: #8F7C56;
  color: white;
}
.limpieza {
  background-color: #BC419A;
  color: white;
}


</style>
