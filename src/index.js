import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var allBtn = document.getElementById("allBtn")
var rockBtn = document.getElementById("rock")
var metalBtn = document.getElementById("metal")
var folkBtn = document.getElementById("folk")

allBtn.addEventListener("click", getAlbums)
rockBtn.addEventListener("click", filterGenre)
metalBtn.addEventListener("click", filterGenre)
folkBtn.addEventListener("click", filterGenre)

async function getAlbums() {
  document.getElementById("display").innerHTML = "";

  //get all documents from "Albums" collection
  const querySnapshot = await getDocs(collection(db, "Albums"));

  //for each document, add it to the page
  querySnapshot.forEach((doc) => {
    document.getElementById("display").innerHTML += `
      <div class="albumItem">
        <img src="${doc.data().albumPhoto}" alt="${doc.data().albumPhoto}">
        <div class="albumInfo">
          <p><b>Album: </b>${doc.data().albumName}</p>
          <p><b>Artist: </b>${doc.data().artistName}</p>
          <p><b>Genre</b>: </b>${doc.data().genre}</p>
        </div>
      </div>
    `;
  });
};

async function filterGenre(e) {
  document.getElementById("display").innerHTML = "";

  let genre = e.currentTarget.value //get genre from button value

  //equivalent to SQL query: SELECT * FROM Albums WHERE genre='metal'
  const q = query(
    collection(db, "Albums"),
    where("genre", "==", genre) 
  );

  const querySnapshot = await getDocs(q); //wait for the queried items to return

  //for each item, display on the page
  querySnapshot.forEach((doc) => {
    document.getElementById("display").innerHTML += `
      <div class="albumItem">
        <img src="${doc.data().albumPhoto}" alt="${doc.data().albumPhoto}">
        <div class="albumInfo">
          <p><b>Album: </b>${doc.data().albumName}</p>
          <p><b>Artist: </b>${doc.data().artistName}</p>
          <p><b>Genre</b>: </b>${doc.data().genre}</p>
        </div>
      </div>
    `;
  });
}

$(document).ready(() => {
  getAlbums(); //display items on page load
});
