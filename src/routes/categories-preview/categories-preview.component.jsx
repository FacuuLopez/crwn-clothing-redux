import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import {
  selectCategoriesMap,
  selectIsLoading,
} from '../../store/categories/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';
import { createCategories, getUserCategories, getUserProducts } from '../../utils/firebase/firebase.utils';
import { selectCurrentUser } from '../../store/user/user.selector';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectCurrentUser);
  const categories = async () => {
    const categoriesLoaded = await getUserCategories(user);
    console.log('categoriesLoaded', categoriesLoaded)
  }
  const products = async () => {
    const categoriesLoaded = await getUserProducts(user);
    console.log('productsLoaded', categoriesLoaded)
  }
  

  const exportCategories = () => {
    const categories = [
      {
        id: 1,
        title: 'hats',
        imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
        route: 'shop/hats',
      },
      {
        id: 2,
        title: 'jackets',
        imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
        route: 'shop/jackets',
      },
      {
        id: 3,
        title: 'sneakers',
        imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
        route: 'shop/sneakers',
      },
      {
        id: 4,
        title: 'womens',
        imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
        route: 'shop/womens',
      },
      {
        id: 5,
        title: 'mens',
        imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
        route: 'shop/mens',
      },
    ];

    const newCategories = categories.map(category => {
      const {title, imageUrl} = category;
      const products = categoriesMap[title];
      const newProducts = products.map(product => product.name)
      return(
        {
          title,
          imageUrl,
          products: newProducts,
        }
      )
    })
    console.log('categories', newCategories)
    createCategories(newCategories, user);
    
  }

  return (
    <Fragment>
      <button onClick={categories}>categories </button>
      <button onClick={products}>products </button>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
