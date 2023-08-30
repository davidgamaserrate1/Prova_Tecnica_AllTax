import React, { useState } from "react";
import { Chart } from "react-google-charts";
import data from "../../data";
import './chart-styles.css'
import Dropdown from "../Dropdown";

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
     
    <div className="dropdown_slist">
      <Dropdown label="Categoria"
      options={data.categories}
      value="categories"
      onChange={handleCategoryChange}
      selectedValue={selectedCategory}
      />
      <Dropdown
        label="Produto"
        options={data.products[selectedCategory]}
        value="products"
        onChange={handleProductChange}
        selectedValue={selectedProduct}
      />
      <Dropdown
        label="Marca"
        options={data.brands[selectedProduct]}
        value="brands"
        onChange={handleBrandChange}
        selectedValue={selectedBrand}
      />
    </div>
    
    <Chart className="chart" chartType="LineChart" width="100vw" height="600px" data={chartData} options={options} />
       
    </>
  );
}

export default ChartComponent;
