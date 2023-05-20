import PanelProductCard from '../panel-product-card/panel-product-card.component';
import ProductCard from '../product-card/product-card.component';

import {
  PanelCategoryPreviewContainer,
  Title,
  Preview,
} from './panel-category-preview.styles';
import PanelCategoryProduct from './panel-category-product/panel-category-product';

const PanelCategoryPreview = ({ title, products }) => {
  return (
    <div className='p-2 my-4 border border-2 container-fluid bg-light'>
      <div className='row align-items-center'>
        <div className='col-lg-6 d-flex align-items-center'>
          <div className='row'>
            <div className='col-xs-12 col-sm-7'>
              <div className='input-group px-1' >
                <span className="input-group-text" id="basic-addon1">Category name</span>
                <input className='form-control' type='text' onChange={() => { }} placeholder='Category Name' value={title.toUpperCase()} />
              </div>
            </div>
            <div className='col-xs-12 mt-1 mt-sm-0 col-sm-5 '>
              <div className='px-1 '>
                <div className="input-group input-group-sm ">
                  <label className="d-flex align-items-center" style={{ cursor: 'pointer' }} htmlFor='new_color_image'>Category Image: <img className="mx-1" style={{ width: '35px', height: '35px' }} src={products.imageUrl} /></label>
                  <input className='d-none' type='file' id='new_color_image'/*  onChange={(e) => setNewColor({ ...newColor, imageUrl: e.target.value })} */ accept="image/*" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex col-sm-6 col-lg-3 mt-1 mt-lg-0'>
          <button className='btn btn-success m-1'>Add Product</button>
          <button className='btn btn-danger m-1'>Delete Category</button>
        </div>
        <div className='d-flex  col-sm-6 col-lg-3 justify-content-sm-end mt-1 mt-lg-0'>
          <button className='btn btn-primary px-5 fw-bold'>
            Save
          </button>
        </div>
      </div>
      <div className='row row-cols-12 row-cols-md-3 row-cols-lg-4'>
        {products ? products
          .map((product) => (
            <PanelCategoryProduct product={product} />
          )) : <></>}
      </div>
    </div>
  );
};

export default PanelCategoryPreview;
