const express = require("express");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 3000;

// middlewares to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup session management 
app.use(
  session({
    secret: "veryveryverysecretpasswordfrfrnooneWillhAcKtHis127", 
    resave: false,
    saveUninitialized: false,
  })
);

// setup view engine (HBS)
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// data file path
const dataFile = path.join(__dirname, "accounts.json");

// function: read accounts from JSON file
function readAccounts() {
  try {
    if (!fs.existsSync(dataFile)) {
      fs.writeFileSync(dataFile, JSON.stringify([]));
    }
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading accounts:", err);
    return [];
  }
}

// function: write accounts to JSON file
function writeAccounts(accounts) {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(accounts, null, 2));
        console.log("Accounts saved successfully:", accounts); // Debugging log
    } catch (err) {
        console.error("Error writing accounts:", err);
    }
}

// middleware to protect routes that require loging in (yes security very cool)
function requireLogin(req, res, next) {
  if (!req.session.username) {
    return res.redirect("/login");
  }
  next();
}

// route: Home page
app.get("/", (req, res) => {
  res.render("index");
});

// route: Registration form - GET
app.get("/register", (req, res) => {
  res.render("register", { message: null });
});

// route: Registration handling - POST
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  let accounts = readAccounts();
  // check for duplicate username
  if (accounts.find((acc) => acc.username === username)) {
    res.render("register", { message: "Username already exists." });
  } else {
    accounts.push({ username, password });
    writeAccounts(accounts);
    res.redirect("/login");
  }
});

// route: Login form - GET
app.get("/login", (req, res) => {
  res.render("login", { message: null });
});

// route: Login handling - POST
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  let accounts = readAccounts();
  const account = accounts.find(
    (acc) => acc.username === username && acc.password === password
  );
  if (account) {
    // store the username in the session
    req.session.username = username;
    res.redirect("/profile");
  } else {
    res.render("login", { message: "Invalid username or password" });
  }
});

// route: profile page - GET 
app.get("/profile", requireLogin, (req, res) => {
  let accounts = readAccounts();
  // get the account info for the logged-in user only
  const account = accounts.find((acc) => acc.username === req.session.username);
  if (account) {
    res.render("profile", { account });
  } else {
    res.redirect("/login");
  }
});

// route: edit account form - GET 
app.get("/edit", requireLogin, (req, res) => {
  let accounts = readAccounts();
  const account = accounts.find((acc) => acc.username === req.session.username);
  if (account) {
    res.render("edit", { account, message: null });
  } else {
    res.redirect("/login");
  }
});

// route: Edit account handling - POST 
app.post("/edit", requireLogin, (req, res) => {
  const { original_username, username, password } = req.body;
  let accounts = readAccounts();
  const index = accounts.findIndex((acc) => acc.username === original_username);
  if (index !== -1) {
    accounts[index] = { username, password };
    writeAccounts(accounts);
    // update the session if the username changed
    req.session.username = username;
    res.redirect("/profile");
  } else {
    res.render("edit", { message: "Account not found." });
  }
});

// route: Delete account confirmation page- GET 
app.get("/delete", requireLogin, (req, res) => {
  res.render("delete", { username: req.session.username, message: null });
});

// route: delete account handling -POST
app.post("/delete", requireLogin, (req, res) => {
  const { username } = req.body;
  let accounts = readAccounts();
  accounts = accounts.filter((acc) => acc.username !== username);
  writeAccounts(accounts);
  // destroy session after deleting the account
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/");
  });
});

// start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use(express.static(path.join(__dirname, "public")));

const accounts = readAccounts();
console.log("Current Accounts:", accounts);
