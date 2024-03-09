let articoli = [];
let id;
const name = document.getElementById("nome");
const brand = document.getElementById("brand");
const price = document.getElementById("prezzo");
const imageUrl = document.getElementById("immagine");
const description = document.getElementById("descrizioneProdotto");
const elimina = document.getElementById("delete");

async function salvaDati(articolo) {
  try {
    const request = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZWM5MzJkN2IxMTAwMTkwZTcwNGUiLCJpYXQiOjE3MDk4OTQ4MDMsImV4cCI6MTcxMTEwNDQwM30.k1cgXcH-cak7eHOJiW7ZIcDNZAGPopfoD_Mkme2dWlY",
          "Content-Type": "application/json",
        },
        method: "POST",
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
