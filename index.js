#!/usr/bin/env node

const luhn = require("fast-luhn");
// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const yargs = require("yargs");

const argv = yargs
  .usage("Usage: $0 <command> [options]")
  .option("generate", {
    alias: "g",
    describe: "Generate a card using a bin",
    type: "string",
  })
  .option("count", {
    alias: "n",
    describe: "Number of cards to generate",
    type: "number",
    default: 1,
  })
  //   .option("check", {
  //     alias: "c",
  //     describe: "Check a cards validity",
  //     type: "array",
  //   })
  .option("json", {
    alias: "j",
    describe: "Output in json format",
  }).argv;

if (!argv.generate) {
  argv.generate = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
}

if (argv.generate) {
  let cards = [];
  let card;
  for (let i = 0; i < argv.count; i++) {
    card = genCard(argv.generate);
    cards.push(card);
  }

  if (argv.json) {
    console.log(cards);
  } else {
    for (card in cards) {
      console.log(jsonToPipe(cards[card]));
    }
  }
}

function genNumber(bin) {
  while (true) {
    let random = Array.from({ length: 16 - bin.length }, () => Math.floor(Math.random() * 10)).join("");
    let card = bin + random;

    if (luhn(card)) {
      return card;
    }
  }
}

function genDate() {
  let now = new Date();
  let month = Math.floor(Math.random() * 12) + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let year = now.getFullYear() + Math.floor(Math.random() * 5);
  return {
    month,
    year,
  };
}

function genCvv() {
  return Array.from({ length: 3 }, () => Math.floor(Math.random() * 10)).join("");
}

function genCard(bin) {
  return {
    number: genNumber(bin),
    date: genDate().month + "/" + genDate().year,
    cvv: genCvv(),
  };
}

function jsonToPipe(json) {
  return (
    json.number +
    "|" +
    json.date.split("/")[0] +
    "|" +
    json.date.split("/")[1] +
    "|" +
    json.cvv
  );
}

// async function checkCards(cards) {
//   puppeteer.use(StealthPlugin());

//   const browser = await puppeteer.launch({ headless: false }); //false to see browser
//   const [page] = await browser.pages();
//   for (let i = 0; i < cards.length; i++) {
//     cards[i] = jsonToPipe(cards[i]);
//   }
//   let cardList = cards.join("\n");
//   await page.setUserAgent(
//     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36"
//   );
//   await page.goto("https://www.mrchecker.net/card-checker/ccn2/");
//   await page.waitForSelector("#cc", { visible: true, timeout: 0 });
//   let onPage = true;
//   while (onPage) {
//     await page.goto("https://www.mrchecker.net/card-checker/ccn2/");
//     await page.focus("#cc");
//     await page.click("#cc");
//     if (page.url() !== "https://www.mrchecker.net/card-checker/ccn2/api.php") {
//       onPage = false;
//     }
//   }

//   let sel = "#cc";
//   let val = cardList;
//   page.evaluate(
//     (data) => {
//       return (document.querySelector(data.sel).value = data.val);
//     },
//     { sel, val }
//   );

//   await page.focus(
//     "#form > div.col-xs-3.col-sm-3.col-md-3.col-lg-3.col-md-offset-5 > div > button.btn.btn-success"
//   );
//   await page.click(
//     "#form > div.col-xs-3.col-sm-3.col-md-3.col-lg-3.col-md-offset-5 > div > button.btn.btn-success",
//     { button: "left" }
//   );

//   page.on("requestfinished", async (request) => {
//     if (request.url().includes("card-checker/ccn2/api.php")) {
//       let response = await request.response().buffer();
//       response = JSON.parse(response.toString());
//       let cardRegex = /\d{16}\|\d{2}\|\d{4}\|\d{3}/g;
//       let status;
//       if (response.error == "4") {
//         status = "[invd] " + JSON.stringify(response.msg).match(cardRegex);
//       } else if (response.error == "2") {
//         status = "[dead] " + JSON.stringify(response.msg).match(cardRegex);
//       } else if (response.error == "1") {
//         status = "[live] " + JSON.stringify(response.msg).match(cardRegex);
//       } else if (response.error == "3") {
//         status = "[unkn] " + JSON.stringify(response.msg).match(cardRegex);
//       }
//       if (status !== undefined) {
//         console.log(status);
//       }
//     }
//   });
// }
