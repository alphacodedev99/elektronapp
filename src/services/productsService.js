import axios from "axios";

class ProductsService {
    // static getAllProducts
    static getAllCategory = () => axios.get('/products/category-list');
    static getAllProducts = () => axios.get('/products?limit=190');
    static getSingleProduct = (id) => axios.get(`/products/${id}`);
    static getSearchProduct = (search) => axios.get(`/products/search?q=${search}`); 
    static getProductsByCategory = (cat) => axios.get(`/products/category/${cat}`);
}


export default ProductsService;