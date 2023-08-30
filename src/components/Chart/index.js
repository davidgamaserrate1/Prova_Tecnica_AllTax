import React, { useState } from "react";
import { Chart } from "react-google-charts";
import data from "../../data";
import './chart-styles.css'
const options = {
  title: "Sales By Month by:",
 
  curveType: "none",
  legend: { position: "bottom" },
  hAxis: {
    title: "Meses",     
  },
  vAxis: {
    title: "Vendas",
  },

 
  pointSize: 5, 
  series: {
    0: { pointShape: "circle", pointSize: 8, color: "#5896E6" },     
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

  

  const sales = data.salesData[selectedBrand];
  const month = ["Janeiro", "Fevereiro", "Marça", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  console.log(sales)
  const chartData = [["Meses", "Vendas"]];
  for (let i = 0; i < sales.length; i++) {
    chartData.push([month[i], sales[i]]);
  }

  return (
    <>
     
      <div className="dropdown_list">
        <span className="dropdown_list__name">Categoria:</span> 
          <select name="categories" id="categories" onChange={handleCategoryChange} value={selectedCategory}>
            {data.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          
          <span className="dropdown_list__name">Produto:</span> 
          <select name="products" id="products" onChange={handleProductChange} value={selectedProduct}>
            {data.products[selectedCategory].map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>

          <span className="dropdown_list__name">Marca:</span>         
          <select name="brands" id="brands" onChange={handleBrandChange} value={selectedBrand}>
            {data.brands[selectedProduct].map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
      </div>
    

       
        <Chart className="chart" chartType="LineChart" width="100vw" height="600px" data={chartData} options={options} />
       
    </>
  );
}

export default ChartComponent;
