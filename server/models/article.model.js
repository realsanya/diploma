export default (sequelize, DataTypes, Model) => {

  class Article extends Model {}

  Article.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      storageName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      text: {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
      keywords: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'article',
    });
    
    return Article;
};