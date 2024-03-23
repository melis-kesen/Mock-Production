import axios from "axios";
const API = `http://localhost:3001/products`
const ProductService = {
  async getProductsAsc() {
    try {
      const response = await axios.get(API + "/asc");
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  async getProductsDesc() {
    try {
      const response = await axios.get(API + "/desc");
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  async resetProductsPin() {
    try {
        const response = await axios.post(API + "/unpin");
        return response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
  },
  async pinProducts(id: number, position: number) {
    try {
        const response = await axios.post(API + "/pin/" + id + "/"+ position);
        return response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
  }
};

export default ProductService;
