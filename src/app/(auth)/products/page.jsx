"use client";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./index.css";
import Link from "next/link";
import DropDown from "../../components/DropDown/DropDown";
import SearchBar from "../../components/SearchBar/SearchBar";
import fetchProducts from "../../fetcher/fetchProducts";
import ProductActions from "../../components/buttons/ProductActions";
import { useEffect, useState } from "react";
import AddButton from "../../components/AddButton/AddButton";

export default function Products({ searchParams }) {
  const debouncedSearch = searchParams.search || "";
  const sortOption = searchParams.option || "";
  const sortOrder = searchParams.order || "";
  const fetchItemType = "products";
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState();

  const sortOptions = [
    {
      label: "Price: Low to High",
      value: "price-low-to-high",
      option: "price",
      order: "asc",
    },
    {
      label: "Price: High to Low",
      value: "price-high-to-low",
      option: "price",
      order: "desc",
    },
    {
      label: "Name: A-Z",
      value: "name-ascending",
      option: "title",
      order: "asc",
    },
    {
      label: "Name: Z-A",
      value: "name-descending",
      option: "title",
      order: "desc",
    },
  ];

  function editProducts({ products, setProducts }) {
    return function changeProductproducts(product) {
      products.forEach((item) => {
        if (item.id === product.id) {
          const index = products.indexOf(item);
          const newArray = products;
          newArray[index] = product;
          setProducts(newArray);
        }
      });
    };
  }

  const deleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const addProduct = (item) => {
    const newId = Date.now();
    const itemWithId = { ...item, id: newId };
    setProducts((prevProducts) => [...prevProducts, itemWithId]);
  };

  useEffect(() => {
    async function fetch() {
      var productArray = await fetchProducts({
        fetchItemType,
        debouncedSearch,
        sortOption,
        sortOrder,
      });
      setProducts(productArray);
    }
    fetch();
  }, [fetchItemType, debouncedSearch, sortOption, sortOrder]);
  var callBack = editProducts({ products, setProducts });

  function onEditingChange(editing) {
    setEditing(editing);
  }

  if (products.length === 0) {
    return (
      <div className="loading-screen">
        <div className="app-bar">
          <Header />
          <SearchBar searchItemType="Search Products" />
        </div>
        <h2>Could not find anything...</h2>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="app-bar">
        <Header />
        <SearchBar searchItemType="Search Products" />
      </div>

      <div className="dropdown-menu">
        <DropDown
          buttonText="Sort Products By:"
          content={sortOptions}
        ></DropDown>
      </div>
      <div className="products-list">
        {products.map((product) => {
          return (
            <div key={product.id} className="product-card">
              <img
                className="product-image"
                src={product.thumbnail}
                alt={product.title}
              ></img>
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="product-info">
                  <strong>{product.title}</strong>
                </div>
              </Link>
              <div className="product-info">{product.description}</div>
              <div className="product-info">Price: {product.price}$</div>
              <ProductActions
                type={"products"}
                product={product}
                setProductCallBack={callBack}
                onEditingChange={onEditingChange}
                deleteProductCallback={deleteProduct}
              />
            </div>
          );
        })}
      </div>

      <AddButton item="Products" addProduct={addProduct} />
      <Footer />
    </div>
  );
}
