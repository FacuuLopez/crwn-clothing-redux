const ControlPanelPurchase = ({ purchase }) => {
    const { user, date, state, products, total } = purchase;
    return (
        <div>
            <ul>
                <li>User: {user}</li>
                <ul>
                    {products.map(product => {
                        <>
                            <li>{product.name}</li>
                            <li>{product.quantity}</li>
                            <li>{product.price}</li>
                            <li>{product.total}</li>
                        </>
                    })}
                </ul>
                <li>Total: {total}$</li>
                <li>date: {date}</li>
                <select defaultValue={state}>
                    <option value="pending" selected>Pending</option>
                    <option value="preparation" >In Preparation</option>
                    <option value="sent" >Sent</option>
                    <option value="received">Received</option>
                    <option value="devolution">Waiting Return</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </ul>
        </div>
    );
}

export default ControlPanelPurchase