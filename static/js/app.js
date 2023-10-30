// Create a constant variable for the URL
const url =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Create a function that acts as a default dashboard when the webpage is opened
function init(){
    // Use D3 to request the data
    d3.json(url).then((data) => { 
        // Log response in the console
        console.log(data);
        // Create variable for drop-down menu
        let dropDown = d3.select("#selDataset");
        // Creat variable for names object data
        let names = data.names;
        // Create for loop to iterate through each name in the names variable,
        // and append the result to the options within the drop-down menu
        for(let i = 0; i < names.length; i++){
            dropDown.append("option").text(names[i]).property("value", names[i])
        };
        // Create a variable for the first 'names' result only
        let firstID = names[0];
        // Log response in the console
        console.log(firstID);

        // Build the webpage start-up plots
        buildCharts(firstID);
        buildMetaData(firstID);
    });
};

// --- CHARTS ---

// Create an umbrella function for the bar and bubble charts
function buildCharts(sampleId){
  // Use D3 to request the data
  d3.json(url).then((data) => {
    // Create variable to store all 'samples' data
    let allSamples = data.samples;
    // Create variable to store filtered samples that match required condition
    let theSample = allSamples.filter((sample) => sample.id == sampleId);
    // Create variable to store values from filtered sample
    let sampleData = theSample[0];
    // Log response in the console
    console.log(sampleData);

    // Create variables to store otu_labels, ids and values data
    let labels = sampleData.otu_labels;
    let ids = sampleData.otu_ids;
    let values = sampleData.sample_values;

    // Log response in the console
    console.log(labels, ids, values);

    // --- BAR CHART ---

    // Create variables to store data for the x-axis, y-axis and labels
    let xaxis = values.slice(0, 10).reverse();
    let yaxis = ids
      .slice(0, 10)
      .map((otu_id) => `OTU ${otu_id}`)
      .reverse();
    let plotLabels = labels.slice(0, 10).reverse();

    // Create trace for plotting
    let barTrace = [
      {
        x: xaxis,
        y: yaxis,
        labels: plotLabels,
        type: "bar",
        orientation: "h",
      },
    ];

    // Create plot title
    let barLayout = {
      title: "Top 10 OTUs",
    };

    // Call Plotly to plot bar chart
    Plotly.newPlot("bar", barTrace, barLayout);

    // --- BUBBLE CHART ---

    // Create trace for plotting
    let bubbleTrace = [
      {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          size: values,
          color: ids,
          colorscale: "Earth",
        },
      },
    ];

    // Create plot title
    let bubbleLayout = {
      title: "OTU ID",
    };

    // Call Plotly to plot bubble chart
    Plotly.newPlot("bubble", bubbleTrace, bubbleLayout);
  });
};

// --- METADATA ---

// Create a function for Metadata
function buildMetaData(sampleId){
  // Use D3 to request the data
  d3.json(url).then((data) => {
    // Create variable to store all metadata
    let metadata = data.metadata;
    // Create variable to store filtered items that match required condition
    let theMetadata = metadata.filter((item) => item.id == sampleId);
    // Create variable to store first Metadata item
    itemID = theMetadata[0];
    // Log response in the console
    console.log(itemID);
    // Create panel variable connected to index.html
    let panel = d3.select("#sample-metadata");
    // Clear metadata when option changes
    panel.html("");
    // Create for loop to iterate through each item in the itemID array
    for (key in itemID) {
        // Append the values associated with each dictionary key to the panel
      panel.append("p").text(key + ": " + itemID[key]);
    }
  });
};

// Create a function that changes panel data and charts data when dropdown option changes
function optionChanged(newSelection){
    buildCharts(newSelection);
    buildMetaData(newSelection);
};

// Initialise the init function
init();