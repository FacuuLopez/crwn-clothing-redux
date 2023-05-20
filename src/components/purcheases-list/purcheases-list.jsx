import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPurchases } from "../../store/purchases/purchases.selector";
import Purchase from "../purchase/purchase";

const PurcheasesList = () => {
    const purchases = useSelector(selectPurchases);
  
    useEffect(() => console.log('inicio purchases', purchases), []);
    useEffect(() => console.log('cambio purchases', purchases), [purchases]);
  
    if (!purchases || !Array.isArray(purchases)) {
      // Manejar el caso cuando purchases es undefined o no es un array
      return null; // O muestra un mensaje de carga, un indicador de progreso, etc.
    }
  
    return (
      <div>
        <h1>Purchases History</h1>
        <ul className="list-unstyled">
          {purchases.map((purchase) => (
            <li>
              <Purchase purchase={purchase} />
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default PurcheasesList;
  