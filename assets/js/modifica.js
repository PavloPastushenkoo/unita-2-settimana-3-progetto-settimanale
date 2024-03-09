let articoli = [];
let id;
const name = document.getElementById("nome");
const brand = document.getElementById("brand");
const price = document.getElementById("prezzo");
const imageUrl = document.getElementById("immagine");
const description = document.getElementById("descrizioneProdotto");
const elimina = document.getElementById("delete");

const cercaFetch = async () => {
  try {
    const caricamento = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZWM5MzJkN2IxMTAwMTkwZTcwNGUiLCJpYXQiOjE3MDk4OTQ4MDMsImV4cCI6MTcxMTEwNDQwM30.k1cgXcH-cak7eHOJiW7ZIcDNZAGPopfoD_Mkme2dWlY",
        },
      }
    );
    const response = await caricamento.json();
    articoli = response;
    console.log("Articoli recuperati", articoli);
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", init);

function recuperoDati(dataString) {
  articoli.forEach((element) => {
    console.log(element, dataString);
    if (element._id == dataString) {
      name.value = element.name;
      brand.value = element.brand;
      price.value = element.price;
      description.value = element.description;
      imageUrl.value = element.imageUrl;
    }
  });
}
async function salvaDati(articolo) {
  try {
    const request = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/" + id,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZWM5MzJkN2IxMTAwMTkwZTcwNGUiLCJpYXQiOjE3MDk4OTQ4MDMsImV4cCI6MTcxMTEwNDQwM30.k1cgXcH-cak7eHOJiW7ZIcDNZAGPopfoD_Mkme2dWlY",
          "Content-Type": "application/json",
        },
        method: "put",
        body: JSON.stringify(articolo),
      }
    );
    if (request.ok) {
      window.location.href = "index.html";
    } else {
      console.log(request.status);
    }
  } catch (error) {
    console.log(error);
  }
}

const salvaArticolo = function (e) {
  e.preventDefault();
  const articolo = {
    name: name.value,
    brand: brand.value,
    price: price.value,
    description: description.value,
    imageUrl: imageUrl.value,
  };
  salvaDati(articolo);
};

const save = document.getElementById("save");

save.addEventListener("click", salvaArticolo);

const cancellaArticolo = async function () {
  try {
    const request = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/" + id,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZWM5MzJkN2IxMTAwMTkwZTcwNGUiLCJpYXQiOjE3MDk4OTQ4MDMsImV4cCI6MTcxMTEwNDQwM30.k1cgXcH-cak7eHOJiW7ZIcDNZAGPopfoD_Mkme2dWlY",
          "Content-Type": "application/json",
        },
        method: "delete",
      }
    );
    if (request.ok) {
      window.location.href = "index.html";
    } else {
      console.log(request.status);
    }
  } catch (error) {
    console.log(error);
  }
};

elimina.addEventListener("click", (e) => {
  e.preventDefault();
  let conferma = confirm(
    "L'articolo verrà eliminato, premi conferma per confermare l'operazione"
  );
  if (conferma) {
    cancellaArticolo();
  }
});

async function init() {
  await cercaFetch();
  const urlParams = new URLSearchParams(window.location.search);
  const dataString = urlParams.get("id");
  id = dataString;
  if (dataString) {
    recuperoDati(dataString);
  }
}
