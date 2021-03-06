'use strict';
module.exports = function(sequelize, DataTypes) {
  var patrons = sequelize.define('patrons', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    adress: DataTypes.STRING,
    email: DataTypes.STRING,
    library_id: DataTypes.STRING,
    zip_code: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
    patrons.hasMany(models.loans, {foreignKey: 'patron_id'});
      }
    }
  });
  return patrons;
};