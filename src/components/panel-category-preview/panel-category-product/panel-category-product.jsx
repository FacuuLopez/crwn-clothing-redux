import { useRef, useEffect } from "react";

const PanelCategoryProduct = ({ product }) => {
    const { name, imageUrl } = product;
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
                    {/* <LikeIconStyle onClick={addProductToWishList} /> */}
                    <div className="d-flex justify-content-between align-items-center px-2">
                        <h6 className='card-title'> {name}</h6>
                        <button className='btn btn-danger text-uppercase'
                            data-bs-toggle="tooltip" data-bs-placement="right" title="Delete product from category"
                        >delete</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PanelCategoryProduct