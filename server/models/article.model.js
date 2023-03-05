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
    }, {
      sequelize,
      modelName: 'article',
    });
    
    return Article;
};