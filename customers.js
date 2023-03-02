module.exports = function () {
    var express = require('express');
    var router = express.Router();
}

function getCharacters(res, mysql, context, complete) {
    mysql.pool.query("SELECT got_character.id, got_character.first_name, got_character.last_name, got_house.name AS house_name, got_title.name AS title FROM got_character LEFT JOIN got_house ON got_character.house_id = got_house.id LEFT JOIN got_title ON got_character.title_id = got_title.id", function (error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
        }
        context.characters = results;
        complete();
    });
}