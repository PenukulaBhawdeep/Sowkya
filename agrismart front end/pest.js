// Dictionary storing pest data for various crops
const pestData = {
    cotton: `
  Month 1: Seedling Stage<br>
  Pest: Thrips, jassids, aphids<br>
  Effect: Leaves deform, growth slows down.<br>
  What to Use: Spray neem oil or treat seeds with Imidacloprid.<br><br>
  
  తెలుగులో<br>
  పీడకాలు: త్రిప్స్, జాసిడ్స్, ఆఫిడ్స్<br>
  ఫలితం: ఆకులు ముడుచుకుని మొక్కలు వృద్ధి చెందవు.<br>
  వాడాల్సినది: విత్తనాలకు ఇమిడాక్లోప్రిడ్ వాడండి లేదా నిమ్మతేలు నూనె స్ప్రే చేయండి.<br><br>
  
  Month 2-3: Vegetative Stage<br>
  Pest: Whiteflies, pink bollworm<br>
  Effect: Sucks sap and spreads leaf curl virus.<br>
  What to Use: Use sticky traps and Acetamiprid spray.<br><br>
  
  తెలుగులో<br>
  పీడకాలు: వైట్‌ఫ్లైలు, పింక్ బోర్వార్మ్<br>
  ఫలితం: రసం పీల్చి, ఆకులు ముడుచుకునే వైరస్ వ్యాప్తి చేస్తాయి.<br>
  వాడాల్సినది: స్టిక్కీ ట్రాప్స్ వాడండి మరియు అసిటామిప్రిడ్ స్ప్రే చేయండి.<br><br>
  
  Month 4-5: Flowering Stage<br>
  Pest: American bollworm, spotted bollworm<br>
  Effect: Bores into bolls, reducing yield.<br>
  What to Use: Spray Chlorantraniliprole or Spinosad.<br><br>
  
  తెలుగులో<br>
  పీడకాలు: అమెరికన్ బోర్వార్మ్, స్పాటెడ్ బోర్వార్మ్<br>
  ఫలితం: బోళ్లను తినడంతో దిగుబడి తగ్గుతుంది.<br>
  వాడాల్సినది: క్లోరాన్‌ట్రానిలిప్రోల్ లేదా స్పినోసాడ్ స్ప్రే చేయండి.<br><br>
  
  Month 6: Harvest Stage<br>
  Pest: Bacterial blight, leaf spot<br>
  Effect: Reduces photosynthesis, affecting yield.<br>
  What to Use: Spray Copper Oxychloride.<br><br>
  
  తెలుగులో<br>
  పీడకాలు: బ్యాక్టీరియల్ బ్లైట్, లీఫ్ స్పాట్<br>
  ఫలితం: ఆకులు పాడవడంతో దిగుబడి తగ్గుతుంది.<br>
  వాడాల్సినది: కాపర్ ఆక్సీక్లోరైడ్ స్ప్రే చేయండి.<br>
  `,
  
    maize: `
  Month 1: Early Growth<br>
  Pest: Fall armyworm, stem borers<br>
  Effect: Damages leaves and stems.<br>
  What to Use: Use pheromone traps; spray Chlorantraniliprole.<br><br>
  
  తెలుగులో<br>
  పీడకాలు: ఫాల్ ఆర్మీవార్మ్, స్టెమ్ బోరర్లు<br>
  ఫలితం: ఆకులు మరియు కాండం దెబ్బతింటాయి.<br>
  వాడాల్సినది: ఫెరోమోన్ ట్రాప్స్ వాడండి, క్లోరాన్‌ట్రానిలిప్రోల్ స్ప్రే చేయండి.<br><br>
  
  Month 2-3: Vegetative Stage<br>
  Pest: Shoot fly<br>
  Effect: Damages stem, stunts plant growth.<br>
  What to Use: Apply Carbofuran granules to soil.<br><br>
  
  తెలుగులో<br>
  పీడకాలు: షూట్ ఫ్లై<br>
  ఫలితం: కాండం దెబ్బతిని వృద్ధి నిలుస్తుంది.<br>
  వాడాల్సినది: మట్టిలో కార్బోఫ్యూరాన్ గ్రాన్యూల్స్ వాడండి.<br><br>
  
  Month 4: Flowering Stage<br>
  Pest: Aphids, leaf miners<br>
  Effect: Reduces vigor, spreads viral diseases.<br>
  What to Use: Spray Imidacloprid.<br><br>
  
  తెలుగులో<br>
  పీడకాలు: ఆఫిడ్స్, లీఫ్ మైనర్స్<br>
  ఫలితం: మొక్కల శక్తి తగ్గిపోతుంది, వైరస్ వ్యాప్తి చెందుతుంది.<br>
  వాడాల్సినది: ఇమిడాక్లోప్రిడ్ స్ప్రే చేయండి.<br>
  `,
  
    groundnut: `
  Month 2-3: Pod Formation<br>
  Pest: Pod borers<br>
  Effect: Damages pods, reduces yield.<br>
  What to Use: Spray Chlorpyrifos.<br><br>
  
  తెలుగులో<br>
  పీడకాలు: పాడ్ బోరర్లు<br>
  ఫలితం: కాయలను తినడం వల్ల దిగుబడి తగ్గుతుంది.<br>
  వాడాల్సినది: క్లోర్పిరిఫోస్ స్ప్రే చేయండి.<br>
  `,
  
    fruits: `
  Month 3-4: Flowering Stage<br>
  Pest: Fruit flies<br>
  Effect: Lays eggs inside fruits, causing them to rot.<br>
  What to Use: Use pheromone traps.<br><br>
  
  తెలుగులో<br>
  పీడకాలు: ఫ్రూట్ ఫ్లైలు<br>
  ఫలితం: పండ్లలో గుడ్లు పెట్టడం వల్ల పండ్లు పాడవుతాయి.<br>
  వాడాల్సినది: ఫెరోమోన్ ట్రాప్స్ వాడండి.<br>
  `,
  
    vegetables: `
  Month 4: Flowering Stage<br>
  Pest: Fruit borers<br>
  Effect: Bores into young fruits.<br>
  What to Use: Spray Chlorantraniliprole.<br><br>
  
  తెలుగులో<br>
  పీడకాలు: ఫ్రూట్ బోరర్లు<br>
  ఫలితం: చిన్న పండ్లను తినేస్తాయి.<br>
  వాడాల్సినది: క్లోరాన్‌ట్రానిలిప్రోల్ స్ప్రే చేయండి.<br>
  `,
  
    millets: `
  Month 3-4: Vegetative Stage<br>
  Pest: Stem borers<br>
  Effect: Damages stems, reducing growth.<br>
  What to Use: Use pheromone traps and insecticides.<br><br>
  
  తెలుగులో<br>
  పీడకాలు: స్టెమ్ బోరర్లు<br>
  ఫలితం: కాండం పాడవడంతో వృద్ధి తగ్గుతుంది.<br>
  వాడాల్సినది: ఫెరోమోన్ ట్రాప్స్ మరియు పురుగు మందులు వాడండి.<br>
  `,
  
    rice: `
  Month 1: Nursery Stage<br>
  Pest: Stem borers, thrips, root-knot nematodes<br>
  Effect: Roots get damaged, seedlings don’t grow well.<br>
  What to Use: Phorate or Fipronil on seeds, ensure water flows out properly.<br><br>
  
  తెలుగులో<br>
  పీడకాలు: స్టెమ్ బోరర్లు, త్రిప్స్, రూట్-నాట్ నేమటోడ్‌లు<br>
  ఫలితం: వేర్లు దెబ్బతింటాయి, మొక్కలు పూర్వకోపం పెరగవు.<br>
  వాడాల్సినది: విత్తనాలకు ఫొరేట్ లేదా ఫిప్రోనిల్ వాడండి, నీరు సరైనంగా బయటకు పోవాలి.<br>
  `
  };
  
  // Function to retrieve pest data based on user input
  document.getElementById('pestPredictionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const cropType = document.getElementById('cropType').value.toLowerCase();
    const pestResult = document.getElementById('pestResult');
    const popup = document.getElementById('popup');

    if (pestData[cropType]) {
        pestResult.innerHTML = pestData[cropType];
        popup.style.display = 'block';
    } else {
        pestResult.innerHTML = 'No pest data available for the specified crop type.';
        popup.style.display = 'block';
    }
});

// Close the popup
document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});