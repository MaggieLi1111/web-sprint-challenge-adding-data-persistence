// build your `Project` model here
const db =require("../../data/dbConfig.js")

function get() {
    return db("resources")
}