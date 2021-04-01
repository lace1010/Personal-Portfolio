const express = require("express");
const helmet = require("helmet");

const app = express();
app.use(
  helmet({
    dnsPrefetchControl: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [
          "'self'",
          "http://fonts.gstatic.com/s/notoserifsc/v8/", // The downloaded font we are using
          "https://use.fontawesome.com/",
        ],
        "img-src": ["'self'", "https://i.ibb.co/"], // Need this to have images shown (all images are on imgbb.com in one album)

        // following tow lines allow loading of scripts and CSS from your server only using self. jquery link is to connect with jquery and font awesome link is for font awesome obviously.
        scriptSrc: ["'self'", "https://code.jquery.com/jquery-3.1.1.js"],
        styleSrc: [
          "'self'",
          "http://fonts.googleapis.com/", // Use base url not the full link we use in html
          "https://use.fontawesome.com/",
        ],
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
