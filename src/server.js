import axios from 'axios';

// normal axios

const ax = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type' : "application/json"
    }
});

const api = {
  products(){
    return ax.get('/api/products/')
  },

  carts(){
    return localStorage.getItem('carts');
  },

  addToCart(items){
    return localStorage.setItem('carts', items);
  },

  removeFromCart(items){
    return localStorage.setItem('carts', items);
  },

  clearCart(){
    return localStorage.removeItem('carts');
  }
}

export default api;