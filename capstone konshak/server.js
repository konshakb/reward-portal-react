const express = require(`express`);

//integrated mysql
const path = require(`path`);
const config = require(`./config`);

const users = require(`./routes/api/users`);
const profile = require(`./routes/api/profile`);
const posts = require(`./routes/api/posts`);
const csv = require(`./routes/api/csv`);
const app = express();
//INTEGRATED
app.disable(`etag`);
app.get("/", (req, res) => res.send(`Hello `));

//use routs
app.use(`/api/users`, users);
app.use(`/api/profile`, profile);
app.use(`/api/posts`, posts);
app.use(`/api/csv`, csv);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
