import { useEffect } from "react";

const Purchase = ({ purchase }) => {
    const { state = '', createdAt = new Date(), total = 0, products = [] } = purchase;
    let formattedDate;

    if (createdAt) {
        const date = createdAt.seconds ? new Date(createdAt.seconds * 1000) : createdAt;
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1; // Los meses en JavaScript son indexados desde 0, por lo tanto se suma 1
        const day = date.getUTCDate();
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} UTC-3`;
    }


    useEffect(() => console.log('purcheasemen', purchase))
    return (
        <div className="card border border-1 rounded-2 my-4 m-2 bg-ligth ">
            <div className="card-header text-center text-bold text-uppercase bg-warning">
                {state}
            </div>
            <div className="card-body p-2">
                <h3 className="text-center text-decoration-underline">
                    Products
                </h3>
                <ul style={{ maxHeight: '170px' }} className="list-unstyled overflow-auto border-primary">
                    <div className="row m-0">
                        {products.map(product => {
                            const { name, quantity, price, color = '', total, imageUrl = "https://http2.mlstatic.com/D_739989-MLA53245880663_012023-N.jpg" } = product
                            return (

                                <div className="col-12 col-md-6 col-lg-4">
                                    <li className="row m-0 my-3">
                                        <div className="col-6">
                                            <img className="w-100" src={imageUrl} />
                                        </div>
                                        <div className="col-6">
                                            <h4>{name}</h4>
                                            {color && <p className="card-text">Color: {color}</p>}
                                            <p className="card-text"> Quantity: {quantity}</p>
                                            <p className="card-text"> $ {price}</p>
                                            <h4 className="card-title badge bg-info text-wrap">Total: {total}</h4>
                                        </div>
                                    </li>
                                </div>

                            )
                        })
                        }
                    </div>
                </ul>
                {state === 'pending' ?
                    <div className="px-5 mt-3 mb-1 d-flex justify-content-between align-items-center">
                        <button className="btn btn-danger px-4 ">Cancel</button>
                        <p className="badge bg-secondary m-0 text-wrap fs-4">Total: ${total}</p>
                    </div> :
                    <div className="px-5 mt-3 d-flex justify-content-end">
                        <p className="badge bg-dark text-wrap fs-4">Total: ${total}</p>
                    </div>
                }

            </div>
            {formattedDate && <div className="card-footer text-muted text-end">
                <p>{formattedDate}</p>
            </div>
            }
        </div>
    )
}
export default Purchase;