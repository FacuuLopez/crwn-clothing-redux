import { useSelector } from "react-redux";
import ControlPanelListProduct from "../control-panel-list-product/control-panel-list-product.component";
import { selectProducts } from "../../store/products/product.selector";

const ControlPanelProducts = () => {
    const products = useSelector(selectProducts)

    return (
        <div>
            <div className='row row-cols-12 row-cols-md-3 row-cols-lg-4'>
                {
                    products.map( product => <ControlPanelListProduct product={product} /> )
                }
            </div>
        </div>
    )
}
export default ControlPanelProducts