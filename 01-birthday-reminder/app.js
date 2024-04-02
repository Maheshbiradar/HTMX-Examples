import express from "express";

import data from "./data/data.js";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Web site created using create-react-app"
      />
      <link rel="apple-touch-icon" href="logo192.png" />
      <link rel="manifest" href="manifest.json" />
      <script src="/htmx.js" defer></script>
      <link rel="stylesheet" href="/main.css" />
      <title>Reminder Complete</title>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">
      <main>
      <section hx-get="/info" class='container' hx-trigger="load" hx-target="section" hx-swap="afterbegin">
        <button hx-get="/clear" hx-swap="outerHTML">Clear All</button>
      </section>
    </main></div>
    </body>
  </html>
  
  `);
});

app.get("/info", (req, res) => {
  const header = `<h3>${data.length} birthdays today</h3>`;
  const htmlContent = `${header}
  ${data
    .map((person) => {
      const { id, name, age, image } = person;
      return `
      <article key="${id}" class="person">
          <img src="${image}" alt="${name}" />
          <div>
            <h4>${name}</h4>
            <p>${age} years</p>
          </div>
       </article>
     `;
    })
    .join("")}`;
  res.send(htmlContent);
});

app.get("/clear", (req, res) => {
  const header = `<h3>${data.length} birthdays today</h3>`;
  const htmlContent = `${header}
  ${data
    .map((person) => {
      const { id, name, age, image } = person;
      return `
      <article key="${id}" class="person">
          <img src="${image}" alt="${name}" />
          <div>
            <h4>${name}</h4>
            <p>${age} years</p>
          </div>
       </article>
     `;
    })
    .join("")}`;
  res.send(htmlContent);
});

app.listen(3000);
