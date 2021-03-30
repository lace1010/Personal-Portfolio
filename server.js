const express = require("express");
const helmet = require("helmet");

const app = express();
app.use(
  helmet({
    dnsPrefetchControl: false,
    contentSecurityPolicy: {
      directives: {
        // for fontAwesome and google fonts console.log said we need to add these links to defaultrc to allow indiviual icons and fonts
        defaultSrc: [
          "'self'",
          "http://fonts.gstatic.com/s/notoserifsc/",
          "https://use.fontawesome.com/releases/v5.8.1/webfonts/",
        ],
        "img-src": ["'self'", "https://i.ibb.co/"], // Need this to have images shown (all images are on imgbb.com in one album)
        // following tow lines allow loading of scripts and CSS from your server only using self. jquery link is to connect with jquery and font awesome link is for font awesome obviously.
        scriptSrc: ["'self'", "https://code.jquery.com/jquery-3.1.1.js"],
        styleSrc: [
          "'self'",
          "http://fonts.googleapis.com/css",
          "https://use.fontawesome.com/releases/v5.8.1/css/all.css",
        ],
        // need to allow fontawesome still...
      },
    },
  })
);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/portfolio.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
