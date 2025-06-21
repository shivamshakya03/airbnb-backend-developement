# 🏡 Airbnb Clone (Basic MVC Express App)

This is a simple Airbnb-style home listing application built with **Node.js**, **Express**, and **EJS** using the **MVC architecture**. Users can view homes, and hosts can add new home listings using a form.

---

## 📁 Project Structure

airbnb-clone/
├── controllers/
│ └── homeReqHandlerController.js
├── models/
│ └── homeDatalogic.js
├── routes/
│ ├── hostRouter.js
│ └── storeRouter.js (userRouter)
├── views/
│ ├── addHomes.ejs
│ ├── post-home.ejs
│ ├── home-index.ejs
│ └── pageNotfound404.ejs
├── public/
│ └── style.css
├── data/
│ └── homes.json
├── server.js
├── .env
├── package.json
└── README.md


---

## 🚀 Features

- View a list of default Airbnb-style homes
- Host can add new homes via form
- Data persisted in `homes.json`
- Server-side rendering using EJS
- Uses `Express Router` for modular routing
- MVC (Model-View-Controller) structured code

---

## 📦 Tech Stack

- **Backend:** Node.js, Express
- **View Engine:** EJS
- **Routing:** Express Router
- **Templating:** EJS
- **Storage:** File-based persistence (`homes.json`)
- **Dev Tools:** `node --watch` for hot-reloading

---

## 🔧 Setup Instructions

1. Clone the Repository

git clone https://github.com/your-username/airbnb-clone.git
cd airbnb-clone


2. Install Dependencies

npm install

3. Environment Configuration

Create a .env file in the root directory:
PORT=5001

4. Run the App (Development)

npm run dev
Visit: http://localhost:5001
