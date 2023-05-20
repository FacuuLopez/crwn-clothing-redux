import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import ControlPanelListProduct from "../control-panel-list-product/control-panel-list-product.component";
import { useEffect } from "react";

const ControlPanelProducts = () => {

    const categories = useSelector(selectCategoriesMap)

    useEffect(() => console.log('categories', categories), [])
    useEffect(() => console.log('categories', categories), [categories])
    return (
        <div>
            <div className='row row-cols-12 row-cols-md-3 row-cols-lg-4'>

                {Object.values(categories).map((category) => {
                    console.log(category); // Agregado para imprimir category en la consola
                    return category.map((product) => (

                    
                            <ControlPanelListProduct product={product} />
                        )
                    );
                })}

            </div>
        </div>
    )
}
export default ControlPanelProducts