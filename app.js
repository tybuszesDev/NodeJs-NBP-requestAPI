const request = require("request");
const fs = require("fs");

//  http://api.nbp.pl/api/exchangerates/rates/a/${code}/

const validCodes = ["usd", "eur", "gbp", "chf"];

const code = process.argv[2];

const isValid = validCodes.find((currency) => currency === code) ? true : false;

if (isValid) {
  const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`;
  request(url, { json: true }, (err, res, body) => {
    if (err) {
      return console.log("bląd", err);
    }
    if (res.statusCode !== 200) {
      return console.log("coś poszło nie tak, sprawdź url");
    }
    const message = `średnia cena ${body.currency} w dniu ${body.rates[0].effectiveDate} wynosi ${body.rates[0].mid} złotych`;
    console.log(message);
    fs.appendFile("curriencies.txt", message + "\n", (err) => {
      console.log("wynik dodany do pliku");
    });
  });
} else {
  console.log("podaj poprawny kod waluty");
  process.exit();
}
