import { useEffect, useState } from "react";
import "./assets/style.css";
import api from "./api/axiosInstance";

import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(null);
  const [tempImgUrl, setTempImgUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((preData) => ({ ...preData, [name]: value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.login(formData);
      const { token, expired } = res.data;
      //設定cookie
      document.cookie = `PAPAYA_KG_TOKEN=${token};expires=${new Date(
        expired,
      )};`;
      setIsAuth(true);
      getProducts();
    } catch (error) {
      console.dir(error.response);
      setIsAuth(false);
      alert("登入失敗", error.response?.data.message);
    }
  };
  const checkLogin = async (e) => {
    try {
      const res = await api.checkLogin();
      console.log(res.data);
      setIsAuth(true);
      getProducts();
    } catch (error) {
      console.dir(error.response?.data.message);
    }
  };

  const getProducts = async () => {
    try {
      const res = await api.getProducts();
      setProducts(res.data.products);
    } catch (error) {
      console.dir(error.response);
      alert("取得產品列表失敗", error.response?.data.message);
    }
  };
  const updateProducts = async (id, product, type) => {
    if (!product) {
      throw new Error("product is null");
    }
    const productData = {
      data: {
        ...product,
        origin_price: Number(product.origin_price || 0),
        price: Number(product.price || 0),
        is_enabled: product.is_enabled ? 1 : 0,
        imagesUrl: [...product.imagesUrl.filter((url) => url !== undefined)],
      },
    };
    try {
      const res = await api.updateProduct(type, id, productData);
      console.log(res.data.message);
      alert(res.data.message);
      await getProducts();
    } catch (error) {
      console.dir(error.response?.data.message);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const res = await api.deleteProduct(id);
      console.log(res.data.message);
      alert(res.data.message);
      await getProducts();
    } catch (error) {
      console.dir(error.response?.data.message);
    }
  };

  //確認是否已登入，若已登入則取得產品列表
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      {isAuth ? (
        <AdminPage
          products={products}
          tempProduct={tempProduct}
          tempImgUrl={tempImgUrl}
          setTempProduct={setTempProduct}
          setTempImgUrl={setTempImgUrl}
          checkLogin={checkLogin}
          updateProducts={updateProducts}
          deleteProduct={deleteProduct}
        />
      ) : (
        <LoginPage
          formData={formData}
          handleInputChange={handleInputChange}
          handleLogin={handleLogin}
        />
      )}
    </>
  );
}

export default App;
