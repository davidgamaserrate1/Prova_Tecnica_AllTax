import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import data from "../../data";
import './chart-styles.css'
import Dropdown from "../Dropdown";
import { PDFDownloadLink, Document, Page,  Image } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
 
function DashBoard() {
  const [selectedCategory, setSelectedCategory] = useState(data.categories[0]);
  const [selectedProduct, setSelectedProduct] = useState(data.products[selectedCategory][0]);
  const [selectedBrand, setSelectedBrand] = useState(data.brands[selectedProduct][0]);

  const options = {
    title: `Sales By Month by: ${selectedProduct}`   ,
    curveType: "none",
    legend: { position: "bottom" },
    hAxis: { title: "Meses" },
    vAxis: { title: "Vendas" },
    pointSize: 5,
    series: {
      0: { pointShape: "circle", pointSize: 8, color: "#5896E6" },
    },
  };
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
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

  const [chartImage, setChartImage] = useState(null);

  useEffect(() => {
    async function generateImage() {
      const image = await generateChartImage();
      setChartImage(image);
    }
    generateImage();
  }, [selectedCategory, selectedProduct, selectedBrand]);

  const generateChartImage = async () => {
    const chartElement = document.querySelector(".chart"); 

    if (chartElement) {
      const canvas = await html2canvas(chartElement, { scale: 2 });
      return canvas.toDataURL("image/png");
    }

    return null;
  };

  const PdfDocument = () => (
    <Document>
      <Page>         
        {chartImage && <Image src={chartImage} style={{   width:"100vw", height: 400 }} />}
      </Page>
    </Document>
  );

  const sales = data.salesData[selectedBrand];
  const month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  
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
        <div className="download">
        {chartImage && (
          <PDFDownloadLink style={{textDecoration:'none', display:'flex', justifyContent:'center', 'alignItems':'center'}} document={<PdfDocument />} fileName={`relatorio_vendas - ${selectedProduct} (${selectedBrand}).pdf`}>
            {({ loading }) => (loading ? "Carregando documento..." :  <>
                <span className="material-symbols-outlined">download</span> <div className="download__buton"> Baixar PDF</div>
            </>)}
          </PDFDownloadLink>
        )}
      </div> 
      </div>
      
      <Chart
        className="chart"
        chartType="LineChart"
        width="100vw"
        height="600px"
        data={chartData}
        options={options}
      />

      
    </>
  );
}

export default DashBoard;
