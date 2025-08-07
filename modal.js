// modal.js

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBsSEaxwAsWigHfs9FHhtmJlntU-MeSIOs",
  authDomain: "animeblog-87e80.firebaseapp.com",
  projectId: "animeblog-87e80",
  storageBucket: "animeblog-87e80.appspot.com",
  messagingSenderId: "353731840842",
  appId: "1:353731840842:web:c684581140433d2ebc4fb3",
  measurementId: "G-1SRVB5271T"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Anonymous user ID
const userId = localStorage.getItem("anonId") || generateAnonId();
function generateAnonId() {
  const id = "user_" + Math.random().toString(36).substr(2, 9);
  localStorage.setItem("anonId", id);
  return id;
}

// Show Modal Function
function showModal(message, options = {}) {
  let modal = document.getElementById("modalMsg");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modalMsg";
    modal.className = "modal hidden";
    modal.innerHTML = `
      <div class="modal-content">
        <p id="modalText"></p>
        <div class="modal-buttons" id="modalBtns"></div>
      </div>`;
    document.body.appendChild(modal);

    const style = document.createElement("style");
    style.innerHTML = `
      .modal {
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.6);
        display: flex; align-items: center; justify-content: center;
        z-index: 9999;
      }
      .modal.hidden { display: none; }
      .modal-content {
        background: white; padding: 20px 25px;
        border-radius: 10px;
        max-width: 320px;
        text-align: center;
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
      }
      .modal-buttons {
        margin-top: 15px;
      }
      .modal-buttons button {
        margin: 0 5px;
        padding: 8px 16px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        background: #f0c420;
        color: black;
        font-weight: bold;
      }
      .modal-buttons button:hover {
        background: #e0b000;
      }`;
    document.head.appendChild(style);
  }

  document.getElementById("modalText").innerText = message;
  const buttons = document.getElementById("modalBtns");
  buttons.innerHTML = "";

  modal.classList.remove("hidden");

  if (options.buttons) {
    options.buttons.forEach(btn => {
      const button = document.createElement("button");
      button.innerText = btn.text;
      button.onclick = () => {
        modal.classList.add("hidden");
        btn.onClick && btn.onClick();
      };
      buttons.appendChild(button);
    });
  } else {
    setTimeout(() => modal.classList.add("hidden"), options.duration || 2000);
  }
}

// Public functions to use anywhere
function likeBlog(blogId) {
  const ref = db.ref("likes/" + blogId + "/" + userId);
  ref.once("value", snapshot => {
    if (snapshot.exists()) {
      showModal("You already liked this blog.");
    } else {
      ref.set(true);
      showModal("Thanks for liking the blog!");
    }
  });
}

function rateBlog(blogId, rating = 5) {
  const ref = db.ref("ratings/" + blogId + "/" + userId);
  ref.once("value", snapshot => {
    if (snapshot.exists()) {
      showModal("You already rated this blog.");
    } else {
      ref.set({ rating });
      showModal("Thank you for rating!");
    }
  });
}

function checkInternet() {
  if (!navigator.onLine) {
    showModal("Please check your internet connection.");
  }
}

function confirmExit() {
  showModal("Are you sure you want to exit AnimeFlix?", {
    buttons: [
      { text: "Yes", onClick: () => window.close() },
      { text: "No" }
    ]
  });
}
