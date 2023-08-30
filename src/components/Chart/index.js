import React, { useState } from "react";
import { Chart } from "react-google-charts";
import data from "../../data";

const options = {
  title: "Sales Report",
  curveType: "none",
  legend: { position: "bottom" },
  hAxis: {
    title: "Meses", 
  },
  vAxis: {
    title: "Vendas", 
  },

};

function ChartComponent() {
  const [selectedCategory, setSelectedCategory] = useState(data.categories[0]);
  const [selectedProduct, setSelectedProduct] = useState(data.products[selectedCategory][0]);
  const [selectedBrand, setSelectedBrand] = useState(data.brands[selectedProduct][0]);

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    console.log(newCategory)
    setSelectedCategory(newCategory);
    setSelectedProduct(data.products[newCategory][0]);
    setSelectedBrand(data.brands[data.products[newCategory][0]][0]);
  };

  const handleProductChange = (event) => {
    const newProduct = event.target.value;
    setSelectedProduct(newProduct);
    setSelectedBrand(data.brands[newProduct][0]);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  console.log(selectedBrand)

  const sales = data.salesData[selectedBrand];
  const month = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  const chartData = [["Meses", "Vendas"]];
  for (let i = 0; i < sales.length; i++) {
    chartData.push([month[i], sales[i]]);
  }

  return (
    <>
     Categoria: <select name="categories" id="categories" onChange={handleCategoryChange} value={selectedCategory}>
        {data.categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      Produto:<select name="products" id="products" onChange={handleProductChange} value={selectedProduct}>
        {data.products[selectedCategory].map((product) => (
          <option key={product} value={product}>
            {product}
          </option>
        ))}
      </select>
      Marca:<select name="brands" id="brands" onChange={handleBrandChange} value={selectedBrand}>
        {data.brands[selectedProduct].map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <Chart chartType="LineChart" width="100%" height="400px" data={chartData} options={options} />
    </>
  );
}

export default ChartComponent;
