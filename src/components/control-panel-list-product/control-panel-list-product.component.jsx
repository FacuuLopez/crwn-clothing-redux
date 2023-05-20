import { useRef, useEffect } from "react";

const PanelCategoryProduct = ({ product }) => {
    const { name, imageUrl, price } = product;
    const imageRef = useRef(null);

    useEffect(() => {
        const imageWidth = imageRef.current.clientWidth;
        const imageHeight = imageWidth * 1.25;
        imageRef.current.style.height = `${imageHeight}px`;
    }, []);

    return (
        <div className="col">
            <div className='card m-3'>
                <img ref={imageRef} className='card-img-top' src={imageUrl} alt={`${name}`} />
                <div className='card-body'>
                    <h5 className='card-title'> {name}</h5>
                    <h6 className='card-title'> ${price}</h6>
                    <div className="d-flex justify-content-between align-items-center px-2">
                        <button className='btn btn-primary text-uppercase'>edit</button>
                        <button className='btn btn-danger text-uppercase'
                            data-bs-toggle="tooltip" data-bs-placement="right" title="Delete product"
                        >delete</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PanelCategoryProduct