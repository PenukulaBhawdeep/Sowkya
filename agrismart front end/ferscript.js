
const cropNPKRequirements = {
    Rice: {
      Black_Soil: {
        N: { Month_1: 25, Month_2: 35, Month_3: 30, Month_4: 25, Total: 140 },
        P: { Month_1: 30, Month_2: 25, Month_3: 20, Month_4: 10, Total: 85 },
        K: { Month_1: 30, Month_2: 25, Month_3: 20, Month_4: 10, Total: 85 },
      },
      Alluvial_Soil: {
        N: { Month_1: 20, Month_2: 30, Month_3: 25, Month_4: 15, Total: 110 },
        P: { Month_1: 25, Month_2: 20, Month_3: 15, Month_4: 10, Total: 70 },
        K: { Month_1: 20, Month_2: 20, Month_3: 15, Month_4: 10, Total: 65 },
      },
      Clayey_Soil: {
        N: { Month_1: 25, Month_2: 35, Month_3: 30, Month_4: 20, Total: 135 },
        P: { Month_1: 30, Month_2: 20, Month_3: 15, Month_4: 10, Total: 75 },
        K: { Month_1: 25, Month_2: 25, Month_3: 20, Month_4: 15, Total: 85 },
      },
      Red_Soil: {
        N: { Month_1: 30, Month_2: 35, Month_3: 25, Month_4: 15, Total: 105 },
        P: { Month_1: 28, Month_2: 20, Month_3: 12, Month_4: 8, Total: 68 },
        K: { Month_1: 22, Month_2: 18, Month_3: 15, Month_4: 10, Total: 65 },
      },
    },
    Maize: {
        Black_Soil: {
            N: {Month_1: 50, Month_2: 60, Month_3: 50, Month_4: 40, Total: 200},
            P: {Month_1: 30, Month_2: 25, Month_3: 15, Month_4: 10, Total: 80},
            K: {Month_1: 35, Month_2: 30, Month_3: 25, Month_4: 20, Total: 110},
        },
        Alluvial_Soil: {
            N: {Month_1: 45, Month_2: 55, Month_3: 40, Month_4: 30, Total: 170},
            P: {Month_1: 25, Month_2: 20, Month_3: 15, Month_4: 10, Total: 70},
            K: {Month_1: 30, Month_2: 25, Month_3: 20, Month_4: 15, Total: 90},
        },
        Clayey_Soil: {
            N: {Month_1: 55, Month_2: 60, Month_3: 45, Month_4: 35, Total: 195},
            P: {Month_1: 28, Month_2: 22, Month_3: 18, Month_4: 12, Total: 80},
            K: {Month_1: 40, Month_2: 35, Month_3: 30, Month_4: 25, Total: 130},
        },
        Red_Soil: {
            N: {Month_1: 50, Month_2: 55, Month_3: 40, Month_4: 30, Total: 175},
            P: {Month_1: 26, Month_2: 20, Month_3: 15, Month_4: 10, Total: 71},
            K: {Month_1: 35, Month_2: 30, Month_3: 25, Month_4: 15, Total: 105},
        },
    },
    Groundnut: {
        Black_Soil: {
            N: {Month_1: 25, Month_2: 20, Month_3: 15, Month_4: 10, Total: 70},
            P: {Month_1: 15, Month_2: 12, Month_3: 10, Month_4: 8, Total: 45},
            K: {Month_1: 12, Month_2: 10, Month_3: 8, Month_4: 5, Total: 35},
        },
        Alluvial_Soil: {
            N: {Month_1: 20, Month_2: 18, Month_3: 12, Month_4: 8, Total: 58},
            P: {Month_1: 12, Month_2: 10, Month_3: 8, Month_4: 5, Total: 35},
            K: {Month_1: 10, Month_2: 8, Month_3: 6, Month_4: 4, Total: 28},
        },
        Clayey_Soil: {
            N: {Month_1: 22, Month_2: 18, Month_3: 15, Month_4: 10, Total: 65},
            P: {Month_1: 14, Month_2: 12, Month_3: 8, Month_4: 6, Total: 40},
            K: {Month_1: 12, Month_2: 10, Month_3: 8, Month_4: 5, Total: 35},
        },
        Red_Soil: {
            N: {Month_1: 20, Month_2: 15, Month_3: 12, Month_4: 8, Total: 55},
            P: {Month_1: 12, Month_2: 10, Month_3: 8, Month_4: 5, Total: 35},
            K: {Month_1: 10, Month_2: 8, Month_3: 6, Month_4: 4, Total: 28},
        },
    },
    Millet: {
        Black_Soil: {
            N: {Month_1: 30, Month_2: 25, Month_3: 20, Month_4: 15, Total: 90},
            P: {Month_1: 10, Month_2: 8, Month_3: 6, Month_4: 5, Total: 29},
            K: {Month_1: 12, Month_2: 10, Month_3: 8, Month_4: 5, Total: 35},
        },
        Alluvial_Soil: {
            N: {Month_1: 28, Month_2: 22, Month_3: 18, Month_4: 12, Total: 80},
            P: {Month_1: 10, Month_2: 8, Month_3: 5, Month_4: 4, Total: 27},
            K: {Month_1: 10, Month_2: 8, Month_3: 6, Month_4: 5, Total: 29},
        },
        Clayey_Soil: {
            N: {Month_1: 35, Month_2: 30, Month_3: 25, Month_4: 15, Total: 105},
            P: {Month_1: 12, Month_2: 10, Month_3: 8, Month_4: 5, Total: 35},
            K: {Month_1: 15, Month_2: 12, Month_3: 10, Month_4: 8, Total: 45},
        },
        Red_Soil: {
            N: {Month_1: 32, Month_2: 28, Month_3: 20, Month_4: 12, Total: 92},
            P: {Month_1: 12, Month_2: 8, Month_3: 6, Month_4: 4, Total: 30},
            K: {Month_1: 12, Month_2: 10, Month_3: 8, Month_4: 6, Total: 36},
        },
    }
    // Other crops like Maize, Groundnut, Millet...
  };
  
  const fertilizerData = [
    { Fertilizer: "Urea", N_content: 46, P_content: 0, K_content: 0, Cost_per_kg: 68 },
    { Fertilizer: "DAP", N_content: 18, P_content: 46, K_content: 0, Cost_per_kg: 30 },
    { Fertilizer: "MOP", N_content: 0, P_content: 0, K_content: 60, Cost_per_kg: 35 },
  ];
  
  // Function to recommend fertilizers based on inputs
  function recommendFertilizers(crop, soilType, soilN, soilP, soilK, areaAcres, month) {
    const cropData = cropNPKRequirements[crop]?.[soilType];
  
    if (!cropData) {
      return { recommendations: [], message: `No data available for ${crop} in ${soilType}!` };
    }
  
    const areaHectares = areaAcres * 0.404686;
    const nDeficit = Math.max(0, cropData.N[month] - soilN);
    const pDeficit = Math.max(0, cropData.P[month] - soilP);
    const kDeficit = Math.max(0, cropData.K[month] - soilK);
  
    let recommendations = [];
    let totalCost = 0;
  
    // Calculate recommendations and cost
    if (nDeficit > 0) {
      const ureaNeeded = (nDeficit / 46) * areaHectares;
      const cost = ureaNeeded * fertilizerData.find(f => f.Fertilizer === "Urea").Cost_per_kg;
      recommendations.push(`Urea: ${ureaNeeded.toFixed(2)} kg (₹${cost.toFixed(2)})`);
      totalCost += cost;
    }
  
    if (pDeficit > 0) {
      const dapNeeded = (pDeficit / 46) * areaHectares;
      const cost = dapNeeded * fertilizerData.find(f => f.Fertilizer === "DAP").Cost_per_kg;
      recommendations.push(`DAP: ${dapNeeded.toFixed(2)} kg (₹${cost.toFixed(2)})`);
      totalCost += cost;
    }
  
    if (kDeficit > 0) {
      const mopNeeded = (kDeficit / 60) * areaHectares;
      const cost = mopNeeded * fertilizerData.find(f => f.Fertilizer === "MOP").Cost_per_kg;
      recommendations.push(`MOP: ${mopNeeded.toFixed(2)} kg (₹${cost.toFixed(2)})`);
      totalCost += cost;
    }
  
    return { recommendations, message: `Total cost: ₹${totalCost.toFixed(2)}` };
  }
  
  function submitForm() {
      // Get values from the form
      const crop = document.getElementById('crop-type').value;
      const soilType = document.getElementById('soil-type').value;
      const soilN = parseFloat(document.getElementById('n').value);
      const soilP = parseFloat(document.getElementById('p').value);
      const soilK = parseFloat(document.getElementById('k').value);
      const areaAcres = parseFloat(document.getElementById('area').value);
      const month = `Month_${document.getElementById('month').value}`;
  
      // Call recommendFertilizers function
      const { recommendations, message } = recommendFertilizers(crop, soilType, soilN, soilP, soilK, areaAcres, month);
  
      // Display the results in the popup
      const fertilizerNameElem = document.getElementById('fertilizer-name');
      const fertilizerAmountElem = document.getElementById('fertilizer-amount');
      const fertilizerCostElem = document.getElementById('fertilizer-cost');
      
      // If recommendations exist
      if (recommendations.length > 0) {
          fertilizerNameElem.innerHTML = `Fertilizer Recommendations:<br> ${recommendations.join('<br>')}`;
          fertilizerCostElem.textContent = message;
          fertilizerAmountElem.style.display = "none"; // No need to display specific amount here
      } else {
          fertilizerNameElem.textContent = "No recommendations available.";
          fertilizerCostElem.textContent = "";
      }
  
      // Show the popup
      document.getElementById('fertilizer-popup').style.display = 'block';
  }
  
  // Close button functionality for popup
  document.getElementById('close-btn').addEventListener('click', function() {
      document.getElementById('fertilizer-popup').style.display = 'none';
  });