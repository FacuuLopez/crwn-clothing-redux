import ControlPanelPurchase from "../../components/control-panel-purchase/control-panel-purchase";

const ControlPanelPurchases = ({purchases}) => {
    return (
        <>
            {purchases.map(purchase => (
                <ControlPanelPurchase purchase={purchase} />
            ))}
        </>


    );
}
export default ControlPanelPurchases