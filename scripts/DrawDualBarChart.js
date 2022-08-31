function DrawDualBarChart(){
    d3.select("#moredata").selectAll("*").remove();
    var x = d3.select("#moredata").append("div").attr("class", "moredatadefaultmessage col-md-12");
    x.append("p").text(defaultmessage1)
    x.append("p").text(defaultmessage2)
    x.append("p").text(defaultmessage3)
    x.append("p").text(defaultmessage4)
    x.append("p").text(defaultmessage5)
    x.append("p").text(defaultmessage6)
    x.append("p").text(defaultmessage7)
    
    
    var margin = {top: 20, bottom: 70, left:40, right: 20};
    var width = 1000 - margin.left - margin.right;
    var height = 700- margin.top - margin.bottom;
    
    var barPadding = 10;
    var barWidth = width / tankWN8.length/2 - barPadding;
    
    var x = d3.scaleBand()
    .domain(d3.range(tankWN8.length))
    .rangeRound([0, width]);
    
    var maxvalue = 0;
    maxvalue = parseInt(maxvalue);
    
    var maxWN8 = 0;
    var maxEUWN8 = 0;
    tankWN8.forEach(element => {
        element = parseInt(element);
        if(element > maxWN8){
            maxWN8 = element;
        }
    });
    tankEUWN8.forEach(element => {
        element = parseInt(element);
        if(element > maxEUWN8){
            maxEUWN8 = element;
        }
    });
    console.log(maxWN8);
    console.log(maxEUWN8);
    
    if(maxWN8 < maxEUWN8){
        maxvalue = maxEUWN8;
    }else{
        maxvalue = maxWN8;
    }
    
    var y = d3.scaleLinear()
    .domain([0, parseInt(maxvalue)+200])
    .range([height, 0]);
    
    var svg = d3.select("#chart")
    .append("svg")
    .attr("class","scaling-svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom + margin.top)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var xAxis = d3.axisBottom(x)
    .tickFormat(function(d, i) { return tankNames[i]; });
    
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
        .text("Tank");
    
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x",0 - (height / 2))
        .attr("y", 0 - margin.left)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("WN8");
    
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 25 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "28px") 
        .style("text-decoration", "underline")  
        .text("Player - EU average: WN8 comparison");
    
    var barchart = svg.selectAll("rect")
        .data(tankWN8)
        .enter()
        .append("rect")
        .attr("id", function(d,i) { return i;})
        .attr("x", function(d, i) { return x(i)+10; })
        .attr("y", y).attr("height", function(d) { return height - y(d);})
        .attr("width", barWidth)
        .attr("fill", "#9cb83e")  
    
        .on('mouseover',function(d, i){
            d3.select(this).transition()            
                .duration('50')
                .attr('opacity','.85')
                .duration(50)
                .style("opacity",1)
            TheObject.showTooltip(d, tankWN8[d3.select(this).attr("id")]);
        })
        .on('mouseout',function(d, i){
            d3.select(this).transition()
                .duration('50')
                .attr('opacity','1');
            TheObject.hideTooltip();
        });
        TheObject.SetOnMouseClickMoreDataFill(barchart);
    
    var barchart2 = svg.selectAll("rect2")
        .data(tankEUWN8)
        .enter()
        .append("rect")
        .attr("id", function(d,i) { return i;})
        .attr("x", function(d, i) { return x(i)+47; })
        .attr("y", y).attr("height", function(d) { return height - y(d);})
        .attr("width", barWidth)
        .attr("fill", "#3e6bb8")      
    
        .on('mouseover',function(d, i){
            d3.select(this).transition()            
                .duration('50')
                .attr('opacity','.85')
                .duration(50)
                .style("opacity",1)
                
            TheObject.showTooltip(d, tankEUWN8[d3.select(this).attr("id")]);
        })
        .on('mouseout',function(d, i){
            d3.select(this).transition()
            .duration('50')
            .attr('opacity','1');
            TheObject.hideTooltip();
        });
        TheObject.SetOnMouseClickMoreDataFill(barchart2);
        TheObject.DrawLegend(svg);
    }
    