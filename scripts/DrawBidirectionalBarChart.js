function DrawBidirectionalBarChart(){
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
    
    var y = d3.scaleLinear()
    .domain([-100, 100])// d3.max(tankWN8)
    .range([height, 0]);    
    
    var y2 = d3.scaleLinear()
    .domain([-100, 100])
    .range([height/2, 0]);
    
    var svg = d3.select("#chart")
    .append("svg")
    .attr("class","scaling-svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom + margin.top)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var xAxis = d3.axisBottom(x)
    .tickFormat(function(d, i) { return tankNames[i]; });    
    
    var xAxis2 = d3.axisBottom(x).tickValues([]);
    
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
        .text("WN8 difference [%]");
    
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 25 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "28px") 
        .style("text-decoration", "underline")  
        .text("Player - EU average: WN8 offset [%]");
    
        svg.append("g")
        .attr("class", "x axis 2")
        .attr("transform", "translate(0," + height/2 + ")")
        .call(xAxis2);
    
    var barchart = svg.selectAll("rect")
        .data(tankWN8diff)
        .enter()
        .append("rect")
        .attr("id", function(d,i) { return i;})
        .attr("x", function(d, i) { return x(i)+28; })
        .attr("y", y)
        .attr("height", function(d) { 
            if(d >= 0){
            return height/2 - y(d);  
            }else{
            return height/2 - y(-d);
            }    
        })
        .attr("transform", function(d){
            if(d >= 0){
                return "translate(0, 0)";
            }
            else
            {
                return "translate(0, "+  (y(-d)-parseFloat(height/2)) +")";
            }   
        })
        .attr("width", barWidth)
        .attr("fill", function(d){
        if(d >= 0){
            return "#3a8a50";
            }else{
            return "#855238";
            }        
        })
    
        barchart.on('mouseover',function(d, i){
        d3.select(this).transition()            
            .duration('50')
            .attr('opacity','.85')
            .duration(50)
            .style("opacity",1);
            
            TheObject.showTooltip(d, tankWN8diff[d3.select(this).attr("id")].toFixed(2) + "%");
            
        }).on('mouseout',function(d, i){
            d3.select(this).transition()
            .duration('50')
            .attr('opacity','1');
            TheObject.hideTooltip();
        });      
    
    TheObject.SetOnMouseClickMoreDataFill(barchart);
    TheObject.DrawLegend(svg);
    
    }