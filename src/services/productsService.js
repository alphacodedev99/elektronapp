import axios from "axios";

class ProductsService{
    // static getAllProducts
    static getAllCategory = () => axios.get('/products/category-list');
    static getAllProducts = () => axios.get('/products/category/smartphones');
    static getSingleProduct = (id) => axios.get(`/products/${id}`);
}


export default ProductsService;

