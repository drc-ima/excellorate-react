import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './server';

function App() {

  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState(0.0);

  const fetchProducts = () => {
    api.products().then(res => {
        
        setProducts(res.data);
        
        // console.log(res.data);
    });
  };

  const addToCart = (item) => {
    
    if (localStorage.getItem('carts')){
      // var cartts = JSON.parse(localStorage.getItem('carts'));
      carts.push(item);
      localStorage.setItem('carts', JSON.stringify(carts));
    }else{
      var cartts = [];
      carts.push(item);
      localStorage.setItem('carts', JSON.stringify(carts))
    }
    fetchCarts();
    
  };

  const removeItem = (item, id) => {
    carts.splice(id, 1);
    localStorage.setItem('carts', JSON.stringify(carts));
    fetchCarts();
  }

  const fetchCarts = () => {
    setCarts(JSON.parse(api.carts()));
    
    // console.log(carts.length);
    calTotal();
  };

  const calTotal = () => {
    var tot = 0;
    // console.log(carts)
    carts.forEach((cart) => {
      tot += cart.price
    });
    console.log(tot);
    setTotal(tot);
  };


  useEffect(() => {
    fetchProducts();
    fetchCarts();
    calTotal();
  }, [])

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Xcellorate Ecommerce</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                  
                      <li className="nav-item">
                          <a className="nav-link active" aria-current="page" href="">Home</a>
                      </li>

              </ul>
              <ul className="navbar-nav d-flex">
                <li className="nav-item"><button className="btn btn-outline-success nav-link" data-bs-toggle="modal" data-bs-target="#cart" aria-current="page" href="">My Cart <span className="badge bg-primary rounded-pill">{carts.length}</span></button></li>
              </ul>
              
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-shrink-0">
        <div className="container">
          <h1 className="mt-5">Products</h1>
          <div className="row row-cols-1 rows-cols-sm-2 rows-cols-sm-3 g3">
            {(
              products.length > 0 ? (
                products.map((product) => (
                  <div className="col-md-4 mb-2" key={product._id['$oid']}>
                    <div className="card shadow-sm">
                      {/* <svg className="bd-placeholder-img" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
                      <img src={product.image} className="card-img-top" alt="" height="255" width="100%" />
                      <div className="card-body">
                        <p className="card-text h4">{product.name}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button type="button" onClick={() => {addToCart(product)}} className="btn btn-sm btn-outline-success">Add To Cart</button>
                            
                          </div>
                          <small className="text-muted fw-bolder h3">$ {product.price}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ):(
                <h3>No products here</h3>
              )
            )}
            
          </div>
        </div>
      </main>
      <div className="modal fade" id="cart" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">My Cart ({carts.length}) Items</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="list-group-flush list-group">
                {(
                  carts.length > 0 ? (
                    carts.map((cart, id) => (
                      <div className="list-group-item d-flex justify-content-between align-items-center" key={id}>
                        <div>
                          <button onClick={() => {removeItem(cart, id)}}className="btn btn-sm btn-danger">Remove</button>&nbsp;&nbsp;
                          <img src={cart.image} className="bordered" width="50" height="50" /> {cart.name}
                        </div>
                        <span className="badge bg-primary rounded-pill">$ {cart.price}</span>
                      </div>
                    )) 
                  ):(
                    <div className="list-group-item">There is nothing in your basket</div>
                  )
                )}
              </div>
              
            </div>
            <div className="modal-footer fw-bolder">
              Total: $ {total}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
