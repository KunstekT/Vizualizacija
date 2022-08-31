Top10TanksWinrateUtils = {
    PrintTop10TanksWinrateToMetadataDiv:function(){
    
    d3.select("#moredata").selectAll("*").remove();
    var x = d3.select("#moredata").append("div").attr("class", "piemoredata col-md-12");
    
    console.log(tankWinrate);
    console.log(tankEuWinrate);
    var PlayerTop10TanksPlayedWinrate = parseFloat(0);
    var EUWTop10TanksPlayerPlayedWinrate = parseFloat(0);
    for (let step = 0; step < tankCount; step++) {
        PlayerTop10TanksPlayedWinrate = parseFloat(PlayerTop10TanksPlayedWinrate) + parseFloat(tankWinrate[step]);
        EUWTop10TanksPlayerPlayedWinrate = parseFloat(EUWTop10TanksPlayerPlayedWinrate) + parseFloat(tankEuWinrate[step]);
    }
    PlayerTop10TanksPlayedWinrate = parseFloat(PlayerTop10TanksPlayedWinrate)/parseFloat(tankWinrate.length)
    EUWTop10TanksPlayerPlayedWinrate = parseFloat(EUWTop10TanksPlayerPlayedWinrate)/parseFloat(tankEuWinrate.length)
    
    console.log(PlayerTop10TanksPlayedWinrate.toFixed(2));
    console.log(EUWTop10TanksPlayerPlayedWinrate.toFixed(2));    

    x.append("p").text("Total winrate of the mostly played 10 tanks played by: ");
    x.append("p").text("Player: "+PlayerTop10TanksPlayedWinrate.toFixed(2)+"%");
    x.append("p").text("EU: "+EUWTop10TanksPlayerPlayedWinrate.toFixed(2)+"%");
    },

    GetMaxWR:function(){
        var maxWinrate = parseFloat(0);
        tankWinrate.forEach(element => {
            console.log(parseFloat(element)+", "+parseFloat(maxWinrate))
            if(parseFloat(element) > parseFloat(maxWinrate)){
                maxWinrate = parseFloat(element);
            }
        });    
        console.log("Max "+ parseFloat(maxWinrate).toFixed(2));
        
        var maxEUWinrate = parseFloat(0);
        tankEuWinrate.forEach(element => {
            if(parseFloat(element) > parseFloat(maxEUWinrate)){
                maxEUWinrate = parseFloat(element);
            }
        });    
        console.log("MaxEU "+ parseFloat(maxEUWinrate).toFixed(2));
        
        
    
        if(maxWinrate < maxEUWinrate){
            maxWinrate = maxEUWinrate;
        }

        return maxWinrate;
    },

    GetMinWR:function(){
        var minWinrate = parseFloat(100);
        tankWinrate.forEach(element => {
            if(parseFloat(element) < parseFloat(minWinrate)){
                minWinrate = parseFloat(element);
            }
        });        
        console.log("Min "+ parseFloat(minWinrate).toFixed(2));
        
        var minEUWinrate = parseFloat(100);
        tankEuWinrate.forEach(element => {
            if(parseFloat(element) < parseFloat(minEUWinrate)){
                minEUWinrate = parseFloat(element);
            }
        });        
        console.log("MinEU "+ parseFloat(minEUWinrate).toFixed(2));

        if( minWinrate > minEUWinrate){
            minWinrate = minEUWinrate;
        }

        return minWinrate;
    },
}

function DrawWinRateGraph(){
    d3.select("#moredata").selectAll("*").remove();
    Top10TanksWinrateUtils.PrintTop10TanksWinrateToMetadataDiv();
    
    var margin = {top: 20, bottom: 70, left:40, right: 20};
    var width = 1000 - margin.left - margin.right;
    var height = 700- margin.top - margin.bottom;

    var barPadding = 10;
    var barWidth = width / tankWN8.length/2 - barPadding;

    var x = d3.scaleBand()
    .domain(d3.range(tankWN8.length))
    .rangeRound([0, width]);

    var minWR = Top10TanksWinrateUtils.GetMinWR() - parseFloat(5);
    if(parseFloat(minWR)<0)minWR = 0;
    var maxWR = Top10TanksWinrateUtils.GetMaxWR() + parseFloat(5);
    if(parseFloat(maxWR)>100)maxWR = 100;
        
    
    console.log("MinWR "+ parseFloat(minWR).toFixed(2)+", MAXWR "+ parseFloat(maxWR).toFixed(2));

    var y = d3.scaleLinear()
    .domain([minWR, maxWR])
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
        .text("Winrate [%]");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 25 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "28px") 
        .style("text-decoration", "underline")  
        .text("Player - EU average: winrate comparison");

    var barchart = svg.selectAll("rect")
        .data(tankWinrate)
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
            TheObject.showTooltip(d, tankWinrate[d3.select(this).attr("id")] + "%");
        })
        .on('mouseout',function(d, i){
            d3.select(this).transition()
                .duration('50')
                .attr('opacity','1');
            TheObject.hideTooltip();
        });
        TheObject.SetOnMouseClickMoreDataFill(barchart);

    var barchart2 = svg.selectAll("rect2")
        .data(tankEuWinrate)
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
                
            TheObject.showTooltip(d, tankEuWinrate[d3.select(this).attr("id")]);
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
