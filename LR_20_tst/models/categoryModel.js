class categoryModel {
  getCategory(conn) {
    return conn.categories.findMany();
  }

  getOneCategory(conn, categoryName) {
    return conn.categories.findMany({
      where: {
        category_name: categoryName,
      },
    });
  }

  getOneCategoryById(conn, categoryId) {
    return conn.categories.findMany({
      where: {
        category_id: categoryId,
      },
    });
  }

  addCategory(conn, categoryObj) {
    let result = conn.categories.create({
      data: {
        category_name: categoryObj.category_name,
      },
    });
    return result;
  }

  updateCategory(conn, categoryObj) {
    let result = conn.categories.update({
      data: {
        category_name: categoryObj.category_name,
      },
      where: { category_id: parseInt(categoryObj.category_id) },
    });
    return result;
  }

  deleteCategory(conn, categoryId) {
    let result = conn.categories.delete({ where: { category_id: categoryId } });
    return result;
  }
}

module.exports = categoryModel;
