
const asyncRequest = require("async-request");

const getWeather = async (location) => {
    const access_key = "862a092d824a19dd378e74813a1c993b";
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${location}`;
    try {
        const res = await asyncRequest(url);
        const data = JSON.parse(res.body);
        const weather = {
            isSuccess: true,
            region: data.location.region,
            country: data.location.country,
            temperature: data.current.temperature,
            wind_speed: data.current.wind_speed,
            precip: data.current.precip,
            cloudcover: data.current.cloudcover,
        };
        return weather;
    } catch (error) {
        return {
            isSuccess: false,
            error,
        };
    }
};

const express = require("express");
const app = express();
const path = require("path");

const pathPublic = path.join(__dirname, "../public");
app.use(express.static(pathPublic));

// http:localhost:7000/
app.get("/", async (req, res) => {
    // res.send("Hello world!");
    const params = req.query;
    const location = params.address;
    const weather = await getWeather(location);

    if (location) {
        res.render("weather", {
            isSearch: true,
            region: weather.region,
            country: weather.country,
            temperature: weather.temperature,
            wind_speed: weather.wind_speed,
            precip: weather.precip,
            cloudcover: weather.cloudcover,
        });
    } else {
        res.render("weather", {
            isSearch: false,
        });
    }
});

app.set("view engine", "hbs");

const port = 7000;

app.listen(port, () => {
    console.log(`app run on server port ${port}`);
});
