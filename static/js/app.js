// Use the D3 library to read in samples.json from the URL
const url =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


function init(){
    d3.json(url).then((data) => {
        console.log(data);
        const dropDown = d3.select("#selDataset");
        for(let index = 0; index < data.names.length; index++){
            dropDown.append("option").text(data.names[index]).property("value", data.names[index])
        }
        buildCharts(data.names[0])
        buildMetaData(data.names[0])
    });
}
init();

function buildCharts(sampleId){
    d3.json(url).then((data) => {
        const samples = data.samples
        const theSample = samples.filter(element => element.id == sampleId)[0]
        console.log(theSample)
    });
}

function buildMetaData(sampleId){
    d3.json(url).then((data) => {
        const metadata = data.metadata;
        const theMetadata = metadata.filter((element) => element.id == sampleId)[0];
        console.log(theMetadata);
        const panel = d3.select("#sample-metadata");
        panel.html("");
        for(key in theMetadata){
            panel.append("p").text(key + ": " + theMetadata[key]);
        }
    });
}

function optionChanged(newSample){
    buildCharts(newSample)
    buildMetaData(newSample)
}