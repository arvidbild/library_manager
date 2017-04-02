'use strict';
module.exports = function(sequelize, DataTypes) {
  var loans = sequelize.define('loans', {
    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER,
    loaned_on: DataTypes.DATE,
    return_by: DataTypes.DATE,
    returned_on: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        //think of ".belongsTo" as "the table belongs to the column"   
        loans.belongsTo(models.patrons, {foreignKey: 'patron_id'});
        loans.belongsTo(models.books, {foreignKey: 'book_id'});
      }
    }
  });
  return loans;
};