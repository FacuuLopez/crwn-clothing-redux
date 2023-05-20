import { Link } from "react-router-dom";
import { ConfigDropdownContainer } from "./config-dropdown.styles";
import { useEffect } from "react";

const ConfigDropdown = () => {
    return (
        <ConfigDropdownContainer >
          <ul className='list-unstyled'>
            <li><Link to='control-panel/' > Config Categories</Link></li>
            <li><Link to='control-panel/products'>Config Products</Link></li>
            <li><Link to='control-panel/purchases'>Purchases Status</Link></li>
          </ul>
        </ConfigDropdownContainer>
      );
}
export default ConfigDropdown;