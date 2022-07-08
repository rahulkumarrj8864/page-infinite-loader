import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function InfiniteScrollingFrontendHacks() {
  const [product, setProduct] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const page_limit = 15;
  const totalCount = 99
  const api = "https://fakestoreapi.com/products?sort=price";
  const getProduct = () => {
    let pageNo = Math.ceil((product.length / page_limit)+1);
    // const queryParam = "?page=" + pageNo + "&limit" + page_limit
    const queryParam = "?limit=" + page_limit;
    const final = api + queryParam;
    // console.log({final});
    axios
      .get(final)
      .then((res) => {
        const apiRest = res?.data;
        // console.log(apiRest);
        const margeData = [...product,...apiRest]
        setProduct(margeData);
      })
      .catch((err) => {
        console.error("error", err);
      });
  };
  useEffect(() => {
    getProduct();
  }, []);

const fetchMoreData = () => {
    if(product.length < totalCount) {
        getProduct()
    }
}
const handleOnChange = () => {
  if(!isChecked) {
    setProduct(product.sort((a, b) => (a.price < b.price ? -1 : 1)))
    // getProduct()
  }else {
    setProduct(product.sort((a, b) => (a.price > b.price ? -1 : 1)))
  }
  setIsChecked(!isChecked);
  getProduct()
};

  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center mb-5 mt-5 text-primary border-bottom pb-5 fw-bold">Product List <br/><input type='checkbox' aria-label="Filter Price" className="me-2" checked={isChecked}
  onChange={handleOnChange} style={{width:"24px",height:'24px'}}/><span className="fw-bold fs-5 text-black d-flex justify-content-center" style={{}}>Filter Price</span></h1>
        <div className="row justify-content-center d-flex">
          <InfiniteScroll
            dataLength={product.length}
            next={fetchMoreData}
            // style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
            // inverse={true} //
            // hasMore={true}
            hasMore={product.length < totalCount}
            loader={<h2 className="text-success text-center mb-2 mt-5">Plese Wait...</h2>}
            // scrollableTarget="scrollableDiv"
          >
          <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        
            {/* Array.from(Array(100)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>xs=2</Item>
          </Grid>
        )) */}
            {/* product.sort((a, b) => (a.price < b.price ? -1 : 1)).map((res, i) => { */}
        {product &&
            product.length > 0 &&
            product.map((res, i) => {
              return (
        
                <Fragment>
                <Grid item xs={2} sm={4} md={4} key={i}>
                  <div className="card" key={res.id} style={{width:"300px", height:"100%",flexDirection:"column",display:"flex",justifyContent:"space-around",borderRadius:"15px"}}>
                    <div className="image-block d-flex justify-content-center align-item-center">
                      <img className="p-3" src={res?.image} alt="photo" width={"200px"} />
                    </div>
                    <div className="content-block">
                      <h4 className="p-2" style={{wordWrap:"break-word"}}>{res?.title}</h4>
                      <h5 className="p-2">$ {res?.price}</h5>
                    </div>
                  </div>
                  </Grid>
                </Fragment>
              );
            })}
        
        
      </Grid>
            
          </InfiniteScroll>
          
        </div>
      </div>
    </Fragment>
  );
}
