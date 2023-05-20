import { useState } from "react";
import { useSelector } from "react-redux"

const ControlPanelCategories = () => {
    const categories = []//useSelector();
    const [newCategories, setNewCategories] = useState(categories);
    const [newCategory, setNewCategory] = useState({ name: '', imageURL: '' });

    const onChangeNewCategoryName = (newName) => {
        setNewCategory(prevCategory => {
            return { ...prevCategory, name: newName }
        });
    }

    const onChangeNewCategoryImage = (newImageFile) => {
        const reader = new FileReader();
        console.log('newImage' , newImageFile)
        reader.onload = function (event) {
            const newImagePath = event.target.result;
            console.log('newImagePath',newImagePath)
            setNewCategory(prevCategory => {
                return { ...prevCategory, imageURL: newImagePath }
            });


        }
        reader.readAsDataURL(newImageFile);
    }

    const addNewCategory = () => {
        newCategory.name && newCategory.imageURL &&
        setNewCategories(prevCategories => {
            return [...prevCategories, newCategory];
        });
        console.log('newCategory',newCategory)
        console.log('newCategories', newCategories)
    }

    const onChangeCategoryName = (name, newName) => {
        setNewCategories(prevCategories => {
            prevCategories.map(category => {
                return (
                    category.name === name ?
                        { ...category, name: newName } :
                        category
                );
            })
        })
    }

    const onChangeCategoryImage = (name, newImageFile) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const newImagePath = event.target.result;
            setNewCategories(prevCategories => {
                prevCategories.map(category => {
                    return (
                        category.name === name ?
                            { ...category, imageURL: newImagePath } :
                            category
                    );
                })
            });
        };

        reader.readAsDataURL(newImageFile);
    }

    return (
        <div>
            <ul>
                <li>
                    <label htmlFor='new_category_name'>Category's Name </label>
                    <input type="text"
                        id='new_category_name'
                        onChange={e => onChangeNewCategoryName(e.target.value)}
                        placeholder="Insert New Category's Name"
                    />
                    <div>
                       { newCategory.imageUrl && <img src={ newCategory.imageUrl} />}
                    </div>
                    <label htmlFor='new_category_image'>Image</label>
                    <input onChange={(e)=>onChangeNewCategoryImage(e.target.files[0])} id='new_category_image' type='file' accept="image/*" multiple max={3}/>
                    <button onClick={addNewCategory}> Add Category </button>
                </li>
                {categories.map((category) => {
                    const { name, imageURL } = category;
                    return (
                        <li>
                            <label htmlFor={`category_${name}`}>Category's Name </label>
                            <input type="text"
                                id={`category_${name}`}
                                onChange={e => onChangeCategoryName(name, e.target.value)}
                                value={name}
                                placeholder="Insert New Category's Name"
                            />
                            <div>
                                <img src={imageURL} />
                            </div>
                            <label htmlFor={`category_${name}_image`}>Image</label>
                            <input id={`category_${name}_image`} onChange={e => onChangeCategoryImage(name, e.target.files[0])} type='file' />
                            <button> SAVE </button>
                        </li>
                    )

                })}
            </ul>
        </div>

    )
}
export default ControlPanelCategories;