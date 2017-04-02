'use strict';
module.exports = function(sequelize, DataTypes) {
  var books = sequelize.define('books', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    first_published: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        books.hasMany(models.loans, {foreignKey: 'book_id'});
      }
    }
  });
  return books;
};