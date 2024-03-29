export default (sequelize, DataTypes, Model) => {

  class Setting extends Model {}

  Setting.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      reviewId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'review',
          key: 'id',
        },
        allowNull: false,
      },
      words: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'setting',
      freezeTableName: true,
    });
    
    return Setting;
};