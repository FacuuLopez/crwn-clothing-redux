import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import PanelCategory from "../panel-category/panel-category.component";
import { fetchCategoriesStartAsync } from "../../store/categories/category.reducer";
import PanelCategoriesPreview from "../panel-categories-preview/panel-categories-preview.component";
import ControlPanelPurchases from "../control-panel-purchases/control-panel-purchases";
import ControlPanelCategories from "../../components/control-panel-categories/control-panel-categories.component";
import ControlPanelProducts from "../../components/control-panel-products/control-panel-products.component";
const ControlPanel = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesStartAsync());
    }, []);

    return (
        <Routes>
            <Route index element={<PanelCategoriesPreview />} />
            {/*  <Route path=":category"  element={<PanelCategory />} /> */}
            <Route path='/categories' element={<ControlPanelCategories/>}/>
            <Route path='/products' element={<ControlPanelProducts/>}/>
            <Route path='/purchases' element={<ControlPanelPurchases purchases={[
                {
                    user: "facuLopez",
                    date: "22/04/2023",
                    total: 5000,
                    state: "cancelled",
                    products: [
                        {
                            name: "remerita de boquita",
                            price: 5000,
                            quantity: 1,
                            total: 5000,
                        }
                    ]
                }
            ]} />} />
        </Routes>
    )
}

export default ControlPanel