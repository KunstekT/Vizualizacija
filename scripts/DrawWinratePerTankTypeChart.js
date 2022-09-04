
DrawWinratePerTankTypeUtils = {    
    
    PrintTankTypeCountsToMetadataDiv: function(){   
        d3.select("#moredata").selectAll("*").remove();
        var x = d3.select("#moredata").append("div").attr("class", "piemoredata col-md-12");
        var count=[0,0,0,0,0];
        for (let step = 0; step < tankCount; step++) {
            if(tankTypes[step]=="Light Tank"){
                count[0]++;
            }
            if(tankTypes[step]=="Medium Tank"){
                count[1]++;
            }
            if(tankTypes[step]=="Heavy Tank"){
                count[2]++;
            }
            if(tankTypes[step]=="Tank Destroyer"){
                count[3]++;
            }
            if(tankTypes[step]=="SPG"){
                count[4]++;
            }
        }
        
        x.append("p").text("Light Tanks: "+count[0]);
        x.append("p").text("Medium Tanks: "+count[1]);
        x.append("p").text("Heavy Tanks: "+count[2]);
        x.append("p").text("Tank Destroyers: "+count[3]);
        x.append("p").text("SPGs: "+count[4]);
    },

    GetData: function(){
        var data = [
            {name: 'LT', value: parseFloat(0)},
            {name: 'MT', value: parseFloat(0)},
            {name: 'HT', value: parseFloat(0)},
            {name: 'TD', value: parseFloat(0)},
            {name: 'SPG', value: parseFloat(0)}
            ];
        
        var lcount = 0;
        var mcount = 0;
        var hcount = 0;
        var tdcount = 0;
        var spgcount = 0;
    
    
        for (let step = 0; step < tankCount; step++) {
            if(tankTypes[step]=="Light Tank"){
                data[0].value=parseFloat(data[0].value)+parseFloat(tankWinrate[step]); 
                lcount= parseFloat(lcount)+1;
            }
            else if(tankTypes[step]=="Medium Tank"){
                data[1].value=parseFloat(data[1].value)+parseFloat(tankWinrate[step]); 
                mcount= parseFloat(mcount)+1;
            }
            else if(tankTypes[step]=="Heavy Tank"){
                data[2].value=parseFloat(data[2].value)+parseFloat(tankWinrate[step]); 
                hcount= parseFloat(hcount)+1;
            }
            else if(tankTypes[step]=="Tank Destroyer"){
                data[3].value=parseFloat(data[3].value)+parseFloat(tankWinrate[step]); 
                tdcount= parseFloat(tdcount)+1;
            }
            else if(tankTypes[step]=="SPG"){
                data[4].value=parseFloat(data[4].value)+parseFloat(tankWinrate[step]); 
                spgcount= parseFloat(spgcount)+1;
            }
            else{console.log("Not a tank type");}
        }
        
        data[0].value = (data[0].value/lcount).toFixed(2);
        data[1].value = (data[1].value/mcount).toFixed(2);
        data[2].value = (data[2].value/hcount).toFixed(2);
        data[3].value = (data[3].value/tdcount).toFixed(2);
        data[4].value = (data[4].value/spgcount).toFixed(2);

        return data;
    }
}

function DrawWinratePerTankTypeChart(){

    d3.select("#moredata").selectAll("*").remove();
    DrawWinratePerTankTypeUtils.PrintTankTypeCountsToMetadataDiv()
    
    var data = DrawWinratePerTankTypeUtils.GetData();
    var margin = {top: 20, bottom: 70, left:40, right: 20};
    var width = 1000 - margin.left - margin.right;
    var height = 700- margin.top - margin.bottom;
    
    var barPadding = 10;
    var barWidth = width / data.length/2 - barPadding;
    
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var x = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([0, width]);
    
    var maxWinrate = parseFloat(0);
    data.forEach(element => {
        if(parseFloat(element.value) > parseFloat(maxWinrate)){
            maxWinrate = parseFloat(element.value);
        }
    });    
    maxWinrate=parseFloat(maxWinrate)+parseFloat(5)
    
    var minWinrate = parseFloat(100);
    data.forEach(element => {
        if(parseFloat(element.value) < parseFloat(minWinrate)){
            minWinrate = parseFloat(element.value);
        }
    });        
    minWinrate=parseFloat(minWinrate)-parseFloat(5)

    var y = d3.scaleLinear()
    .domain([parseInt(minWinrate), parseInt(maxWinrate)])
    .range([height, 0]);
    
    var svg = d3.select("#chart")
    .append("svg")
    .attr("class","scaling-svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom + margin.top)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var allTankTypes=[
        {name: "Light Tank"},
        {name: "Medium Tank"},
        {name: "Heavy Tank"},
        {name: "Tank Destroyer"},
        {name: "SPG"}
    ];

    var xAxis = d3.axisBottom(x)
    .tickFormat(function(d, i) { return allTankTypes[i].name; });
    
    var yAxis = d3.axisLeft(y);
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle");
    
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", (height + (margin.bottom / 2)))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Tank type");
    
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x",0 - (height / 2))
        .attr("y", 0 - margin.left)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Winrate [%]");
    
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 25 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "28px") 
        .style("text-decoration", "underline")  
        .text("Average winrate per tank type");

    var chartData = [data[0].value, data[1].value, data[2].value, data[3].value, data[4].value];

    var barchart = svg.selectAll("rect")
        .data(chartData)
        .enter()
        .append("rect")
        .attr("id", function(d,i) { return i;})
        .attr("x", function(d, i) { return x(i)+50; })
        .attr("y", y).attr("height", function(d) { return height - y(d);})
        .attr("width", barWidth)
        .attr("fill", function(d) { return color(d); })  
    
        .on('mouseover',function(d, i){
            d3.select(this).transition()            
                .duration('50')
                .attr('opacity','.85')
                .duration(50)
                .style("opacity",1)
            TheObject.showTooltip(d, chartData[d3.select(this).attr("id")] + "%");
        })
        .on('mouseout',function(d, i){
            d3.select(this).transition()
                .duration('50')
                .attr('opacity','1');
            TheObject.hideTooltip();
        });
}

