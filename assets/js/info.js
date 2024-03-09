const name = document.getElementById("nome");
const brand = document.getElementById("brand");
const price = document.getElementById("prezzo");
const imageUrl = document.getElementById("immagine");
const description = document.getElementById("descrizioneProdotto");

const cercaFetch = async (id) => {
  try {
    const caricamento = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/"+id,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZWM5MzJkN2IxMTAwMTkwZTcwNGUiLCJpYXQiOjE3MDk4OTQ4MDMsImV4cCI6MTcxMTEwNDQwM30.k1cgXcH-cak7eHOJiW7ZIcDNZAGPopfoD_Mkme2dWlY",
        },
      }
    );
    const response = await caricamento.json();
    console.log("Articolo recuperato", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", init);

async function recuperoDati(id) {
  const articoli = await cercaFetch(id);
  name.innerText = articoli.name;
  brand.innerText = articoli.brand;
  price.innerText = articoli.price+"€";
  description.innerText = articoli.description;
  imageUrl.src = articoli.imageUrl;
}

async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (id) {
    recuperoDati(id);
  }
}
