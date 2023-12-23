const express = require("express");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const app = express();
const port = process.env.PORT || 3000;

// Configure SerialPort
const serialPort = new SerialPort("COM3", { baudRate: 9600 }); // Change 'COM3' to your port
const parser = serialPort.pipe(new Readline({ delimiter: "\r\n" }));

serialPort.on("open", () => {
    console.log("Serial Port Open");
});

app.get("/send/:command", (req, res) => {
    const { command } = req.params;
    serialPort.write(`${command}\n`, (err) => {
        if (err) {
            return res.status(500).send("Failed to send command");
        }
        res.send(`Command '${command}' sent to Arduino`);
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
