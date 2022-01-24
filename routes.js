const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");

    res.write(
      `<html>
          <head>
              <title>My First Page</title>
          </head>
          <body>
            <form action="/message" method="POST">
                <input type="text" name="message" />
                <button type="submit">Send</button>
            </form>
          </body>
      </html>`
    );
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    const data = req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      console.log("Buffer", Buffer);
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      console.log(message);
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write(
    `<html>
        <head>
            <title>My First Page</title>
        </head>
        <body>
            <h1>Hello World</h1>
        </body>
    </html>`
  );

  res.end();
};

module.exports = requestHandler;
