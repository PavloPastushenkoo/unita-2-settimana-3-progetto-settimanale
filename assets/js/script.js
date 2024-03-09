window.addEventListener("load", init);

let articoli = [];

function init() {
  caricaImmagini();
}

const aggiungiArticolo = async (nuovoArticolo) => {
  try {
    const risposta = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZWM5MzJkN2IxMTAwMTkwZTcwNGUiLCJpYXQiOjE3MDk4OTQ4MDMsImV4cCI6MTcxMTEwNDQwM30.k1cgXcH-cak7eHOJiW7ZIcDNZAGPopfoD_Mkme2dWlY",
        },
        body: JSON.stringify(nuovoArticolo),
      }
    );

    if (risposta.ok) {
      console.log("Articolo aggiunto con successo");
      const nuovoArticoloInserito = await risposta.json();
      articoli.push(nuovoArticoloInserito);
      generaCard();
    } else {
      console.error(
        "Errore durante l'aggiunta dell'articolo:",
        risposta.status
      );
    }
  } catch (errore) {
    console.error("Si è verificato un errore durante la richiesta:", errore);
  }
};

const contenutoCard = (element) => {
  const card = `<div class="card" style="width: 18rem;">
    <img src="${element.imageUrl}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${element.name}</h5>
      <p class="card-text">${element.description}</p>
    </div>
    <div class="card-body">
    <a href="editProduct.html?id=${element._id}"><button class="btn btn-outline-warning" type="button">Modifica</button></a>
    <a href="infoProduct.html?id=${element._id}"><button class="btn bg-info" type="button">Scopri di più</button></a>
    </div>
  </div>`;
  return card;
};

const generaCard = () => {
  const riga = document.getElementById("row");
  riga.innerHTML = "";
  riga.classList.add("row");
  console.log("Numero di articoli caricati:", articoli.length);
  articoli.forEach((element) => {
    const col = document.createElement("div");
    col.classList.add("col-3", "my-3");
    const cardHTML = contenutoCard(element);
    col.innerHTML = cardHTML;
    riga.appendChild(col);
  });
};

const caricaImmagini = async () => {
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
    console.log("Articoli recuperati:", articoli);
    generaCard();
  } catch (error) {
    console.error("Si è verificato un errore durante il caricamento:", error);
  }
};

const nuovoArticolo = {
  name: "Nuovo prodotto3",
  brand: "Brand del nuovo prodotto",
  price: 100,
  description: "Descrizione del nuovo prodotto",
  imageUrl:
    "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/page/franchise/alienware-laptops/dell-alienware-lt-franchise-cd-1920x1440-x16-mod03-collapsed-1.png?fmt=png-alpha&wid=1920&hei=1440",
};