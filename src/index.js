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

const firebaseConfig = {
  apiKey: "AIzaSyABSUfYuSKFxvkQGqSkG_QSrnEmHyStWbU",
  authDomain: "n423-data-mattwolf.firebaseapp.com",
  projectId: "n423-data-mattwolf",
  storageBucket: "n423-data-mattwolf.appspot.com",
  messagingSenderId: "452144208034",
  appId: "1:452144208034:web:ffcc6447c9cd6c56969ffb",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getAlbums() {
  document.getElementById("display").innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "Albums"));

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
  getAlbums();
});

//load all albums on startup
//have a way to filter albums in a specific genre