export const filterCategoryProducts = (products, categoryProducts) => {
    const filteredProducts =  products.filter(product => {
      return categoryProducts.some(categoryProduct => {
        return product.name.toLowerCase() === categoryProduct.toLowerCase();
      });
    });
    console.log('filteredProducts', filteredProducts)
    return filteredProducts
  }