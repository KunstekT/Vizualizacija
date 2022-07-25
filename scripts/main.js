var defaultmessage = "WN8 is a number representing the skill of the player with a specific tank. "+
"The formula for WN8 includes damage done, number of destroyed tanks, number of spotted tanks, team base defense points and win rate. ";
    
TheObject = {
    LoadPlayerStats: function(pname){   

         this.LoadJsonStats(pname);
         
        // d3.select("#container").append("div").attr("class","row").attr("id","graphholderrow")
        // .append("div").attr("class", "col-md-8").attr("id","leftcol")
        // .append("div").attr("id", "buttonholder");
        // d3.select("#buttonholder").append("button").attr("class", "graphchanger").attr("id", "btnstate1").attr("onclick", "ChangeGraph('1')").text("WN8 comparison");
        // d3.select("#buttonholder").append("button").attr("class", "graphchanger").attr("id", "btnstate2").attr("onclick", "ChangeGraph('2')").text("WN8 offset [%]");
        // d3.select("#leftcol").append("div").attr("class","chartdiv").attr("id", "chart");
        // d3.select("#graphholderrow").append("div").attr("class", "rightdiv col-md-4")
        // .append("div").attr("id", "moredata")
        // .append("p").attr("class", "text1").text(""+
        //   "WN8 is a number representing the skill of the player with a specific tank."+
        //   " The formula for WN8 includes damage done, number of destroyed tanks, "+
        //   "number of spotted tanks, team base defense points and win rate.")
        //   .append('br')
        //   .text("WN8 = 980*dd + 210*dd*dt + 155*dt*st + 75*bd*dt + 145*MIN(1.8, wr)")
        //   .append('br')
        //   .text("dd - damage done")
        //   .append('br')
        //   .text("dt - destroyed tanks")
        //   .append('br')
        //   .text("st - spotted tanks")
        //   .append('br')
        //   .text("bd - base defense")
        //   .append('br')
        //   .text("wr - win ratio");


    },

    SetOnMouseClickMoreDataFill: function(bc){
      bc.on('click',function(d, i){
            d3.select("#moredata").selectAll("*").remove();
            d3.select("#moredata").append('svg').attr("class", "tankImageSvg").attr("height", "250").attr("width", "400")
                .append("image").attr("class", "tankImage")            
                .attr("xlink:href", "images/".concat(tankNames[d3.select(this).attr("id")],".png"))
                .attr('x', 0)
                .attr('y', 0)
            d3.select("#moredata").append("div").attr("class", "moredatatextmeaning col-md-6").attr("id","moredatatextmeaning");
            d3.select("#moredata").append("div").attr("class", "moredatatext col-md-6").attr("id","moredatatext");
            d3.select("#moredatatextmeaning").append("p").text("Tank name: ");
            d3.select("#moredatatext").append("p").text(tankNames[d3.select(this).attr("id")]);
            d3.select("#moredatatextmeaning").append("p").text("Rank: ");
            d3.select("#moredatatext").append("p").text(tankRanks[d3.select(this).attr("id")]);            
            d3.select("#moredatatextmeaning").append("p").text("Type: ");
            d3.select("#moredatatext").append("p").text(tankTypes[d3.select(this).attr("id")]);
            d3.select("#moredatatextmeaning").append("p").text("Win rate: ");
            d3.select("#moredatatext").append("p").text(tankWinrate[d3.select(this).attr("id")]);
            d3.select("#moredatatextmeaning").append("p").text("Average damage: ");       
            d3.select("#moredatatext").append("p").text(tankAvgDmg[d3.select(this).attr("id")]);   
            d3.select("#moredatatextmeaning").append("p").text("Average experience: ");
            d3.select("#moredatatext").append("p").text(tankAvgXp[d3.select(this).attr("id")]);  
            d3.select("#moredatatextmeaning").append("p").text("Battles: ");
            d3.select("#moredatatext").append("p").text(tankBattles[d3.select(this).attr("id")]);          
            d3.select("#moredatatextmeaning").append("p").text("Player WN8: ");
            d3.select("#moredatatext").append("p").text(tankWN8[d3.select(this).attr("id")]);
            d3.select("#moredatatextmeaning").append("p").text("EU average WN8: ");
            d3.select("#moredatatext").append("p").text(tankEUWN8[d3.select(this).attr("id")]);

      }); 
    },
    DrawLegend: function(svg){
      if(state==1){
        svg.append("rect").attr("width","20").attr("height","20").attr("x","840").attr("y","0").attr("style","fill:#9cb83e;");
        svg.append("text").attr("x","860").attr("y","0").attr("dy", "1em").style("text-anchor", "start").text("Player WN8");
        svg.append("rect").attr("width","20").attr("height","20").attr("x","840").attr("y","20").attr("style","fill:#3e6bb8;");
        svg.append("text").attr("x","860").attr("y","20").attr("dy", "1em").style("text-anchor", "start").text("EU WN8");
      }
      if(state==2){
        svg.append("rect").attr("width","20").attr("height","20").attr("x","840").attr("y","0").attr("style","fill:#855238;");
        svg.append("text").attr("x","860").attr("y","0").attr("dy", "1em").style("text-anchor", "start").text("Below average WN8");
        svg.append("rect").attr("width","20").attr("height","20").attr("x","840").attr("y","20").attr("style","fill:#3a8a50;");
        svg.append("text").attr("x","860").attr("y","20").attr("dy", "1em").style("text-anchor", "start").text("Above average WN8");
      } 
      if(state==3){
        // '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
        svg.append("rect").attr("width","20").attr("height","20").attr("x","780").attr("y","0").attr("style","fill:#1f77b4;");
        svg.append("text").attr("x","800").attr("y","0").attr("dy", "1em").style("text-anchor", "start").text("Light tanks");
        
        svg.append("rect").attr("width","20").attr("height","20").attr("x","780").attr("y","20").attr("style","fill:#ff7f0e;");
        svg.append("text").attr("x","800").attr("y","20").attr("dy", "1em").style("text-anchor", "start").text("Medium tanks ");
        
        svg.append("rect").attr("width","20").attr("height","20").attr("x","780").attr("y","40").attr("style","fill:#2ca02c;");
        svg.append("text").attr("x","800").attr("y","40").attr("dy", "1em").style("text-anchor", "start").text("Heavy tanks");
        
        svg.append("rect").attr("width","20").attr("height","20").attr("x","780").attr("y","60").attr("style","fill:#d62728;");
        svg.append("text").attr("x","800").attr("y","60").attr("dy", "1em").style("text-anchor", "start").text("Tank Destroyers");
        
        svg.append("rect").attr("width","20").attr("height","20").attr("x","780").attr("y","80").attr("style","fill:#9467bd;");
        svg.append("text").attr("x","800").attr("y","80").attr("dy", "1em").style("text-anchor", "start").text("SPGs");
      } 
    },
    showTooltip: function(evt, text) {
    let tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = text;
    tooltip.style.display = "block";
    tooltip.style.left = evt.pageX + 10 + 'px';
    tooltip.style.top = evt.pageY + 10 + 'px';
  },

   hideTooltip:function() {
    var tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
  },

  ChangeNumbersToPercentage:function(value, index, array) {
    if(value<1){
      array[index] = (-(1-value))*100;
    }
    else if(value > 1){
      array[index] = (value-1)*100;
    }
    else{
      array[index] = 0;
    }
  },


    LoadJsonStats:function(playerName) {
    let text1 = "./stats/";
    let link = text1.concat(playerName, ".json");
    
    fetch(link)
   .then(response => {
      if (!response.ok) {
          throw new Error("HTTP error " + response.status);
      }
      return response.json();
   })
   .then(json => {
       jsonStats = json;
       console.log(jsonStats);

        tankCount = jsonStats.length;

        tankIndex =[jsonStats[0].Index, jsonStats[1].Index, jsonStats[2].Index, jsonStats[3].Index, jsonStats[4].Index, jsonStats[5].Index, jsonStats[6].Index, jsonStats[7].Index, jsonStats[8].Index,jsonStats[9].Index];
        tankNames =[jsonStats[0].TankModel, jsonStats[1].TankModel, jsonStats[2].TankModel, jsonStats[3].TankModel, jsonStats[4].TankModel, jsonStats[5].TankModel, jsonStats[6].TankModel, jsonStats[7].TankModel, jsonStats[8].TankModel,jsonStats[9].TankModel];
        tankRanks =[jsonStats[0].Rank, jsonStats[1].Rank, jsonStats[2].Rank, jsonStats[3].Rank, jsonStats[4].Rank, jsonStats[5].Rank, jsonStats[6].Rank, jsonStats[7].Rank, jsonStats[8].Rank,jsonStats[9].Rank];
        tankTypes =[jsonStats[0].Type, jsonStats[1].Type, jsonStats[2].Type, jsonStats[3].Type, jsonStats[4].Type, jsonStats[5].Type, jsonStats[6].Type, jsonStats[7].Type, jsonStats[8].Type,jsonStats[9].Type];
        tankAvgDmg =[jsonStats[0].AvgDmg, jsonStats[1].AvgDmg, jsonStats[2].AvgDmg, jsonStats[3].AvgDmg, jsonStats[4].AvgDmg, jsonStats[5].AvgDmg, jsonStats[6].AvgDmg, jsonStats[7].AvgDmg, jsonStats[8].AvgDmg,jsonStats[9].AvgDmg];
        tankAvgXp =[jsonStats[0].AvgXP, jsonStats[1].AvgXP, jsonStats[2].AvgXP, jsonStats[3].AvgXP, jsonStats[4].AvgXP, jsonStats[5].AvgXP, jsonStats[6].AvgXP, jsonStats[7].AvgXP, jsonStats[8].AvgXP,jsonStats[9].AvgXP]; 
        tankBattles =[jsonStats[0].Battles, jsonStats[1].Battles, jsonStats[2].Battles, jsonStats[3].Battles, jsonStats[4].Battles, jsonStats[5].Battles, jsonStats[6].Battles, jsonStats[7].Battles, jsonStats[8].Battles,jsonStats[9].Battles];
        tankWinrate =[jsonStats[0].WinRate, jsonStats[1].WinRate, jsonStats[2].WinRate, jsonStats[3].WinRate, jsonStats[4].WinRate, jsonStats[5].WinRate, jsonStats[6].WinRate, jsonStats[7].WinRate, jsonStats[8].WinRate,jsonStats[9].WinRate];
        tankWN8 =[jsonStats[0].WN8, jsonStats[1].WN8, jsonStats[2].WN8, jsonStats[3].WN8, jsonStats[4].WN8, jsonStats[5].WN8, jsonStats[6].WN8, jsonStats[7].WN8, jsonStats[8].WN8,jsonStats[9].WN8];
        tankEUWN8 =[jsonStats[0].EUWN8, jsonStats[1].EUWN8, jsonStats[2].EUWN8, jsonStats[3].EUWN8, jsonStats[4].EUWN8, jsonStats[5].EUWN8, jsonStats[6].EUWN8, jsonStats[7].EUWN8, jsonStats[8].EUWN8,jsonStats[9].EUWN8];
        
        tankWN8diff=[
        tankWN8[0]/tankEUWN8[0],
        tankWN8[1]/tankEUWN8[1],
        tankWN8[2]/tankEUWN8[2],
        tankWN8[3]/tankEUWN8[3],
        tankWN8[4]/tankEUWN8[4],
        tankWN8[5]/tankEUWN8[5],
        tankWN8[6]/tankEUWN8[6],
        tankWN8[7]/tankEUWN8[7],
        tankWN8[8]/tankEUWN8[8],
        tankWN8[9]/tankEUWN8[9]
        ];

        tankWN8diff.forEach(TheObject.ChangeNumbersToPercentage);

        console.log(tankTypes);
        ChangeGraph(1);
    
    })
    .catch(function () {
      console.log("error while reading json");
    })
  }

      // other functions...
}



var jsonStats;
var state;
state = 2;

var tankCount, tankIndex, tankNames, tankRanks, tankTypes, tankAvgDmg, tankAvgXp, tankBattles, tankWinrate, tankWN8, tankEUWN8, tankWN8diff;


TheObject.LoadPlayerStats("player1");



function ChangeGraph(graphIndex){
    var x = "";
    document.getElementById(x.concat("btnstate", state)).style.backgroundColor = "gray";

    if(graphIndex==1){
        state = 1;
        document.getElementById(x.concat("btnstate", state)).style.backgroundColor = "yellowgreen";
        d3.select("#chart").selectAll("*").remove();
        DrawDualBarChart();
    }
    if(graphIndex==2){
        state = 2;
        document.getElementById(x.concat("btnstate", state)).style.backgroundColor = "yellowgreen";
        d3.select("#chart").selectAll("*").remove();
        DrawBidirectionalBarChart();        
    }
    if(graphIndex==3){
        state = 3;
        document.getElementById(x.concat("btnstate", state)).style.backgroundColor = "yellowgreen";
        d3.select("#chart").selectAll("*").remove();
        DrawTankTypesPie();        
    }
}

function DrawDualBarChart(){
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
    .text("Player WN8 to average comparison");

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

function DrawBidirectionalBarChart(){
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
    .text("Player to average WN8 offset [%]");

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
        }else{
        return "translate(0, "+3*d+")";
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

function DrawTankTypesPie(){
    var data = [
        {name: 'LT', value: 0},
        {name: 'MT', value: 0},
        {name: 'HT', value: 0},
        {name: 'TD', value: 0},
        {name: 'SPG', value: 0}
        ];

        
    var element;
    for (let step = 0; step < tankCount; step++) {
        if(tankTypes[step]=="Light Tank"){data[0].value=data[0].value+tankBattles[step];}
        if(tankTypes[step]=="Medium Tank"){data[1].value=data[1].value+tankBattles[step];}
        if(tankTypes[step]=="Heavy Tank"){data[2].value=data[2].value+tankBattles[step];}
        if(tankTypes[step]=="Tank Destroyer"){data[3].value=data[3].value+tankBattles[step];}
        if(tankTypes[step]=="SPG"){data[4].value=data[4].value+tankBattles[step];}
    }
    
    console.log(data);


    var pie = d3.pie()
    .value(function(d) { return d.value; });

    pie(data);

    var margin = {top: 20, bottom: 70, left:40, right: 20};
    var width = 1000 - margin.left - margin.right;
    var height = 700- margin.top - margin.bottom;
    var outerRadius = 200;
    var innerRadius = 120;

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

    var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    var pieArcs = svg.selectAll("g.pie")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "pie")
    .attr("transform", "translate(" + (width / 2) + ", " + (height / 2) + ")");

    pieArcs.append("path")
    .attr("fill", function(d) { return color(d); })
    .attr("d", arc);

    pieArcs.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; }) 
    .attr("text-anchor", "middle")
    .text(function(d) { 
        if(d.data.value!=0){
            return d.value;             
        }
        else{
            return "";
        }
    });

    pieArcs.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d)[0]*1.4 + "," + (arc.centroid(d)[1]*1.4) + ")" }) 
    .attr("text-anchor", "middle")
    .text(function(d) { 
        if(d.data.value!=0){
            return d.data.name;             
        }
        else{
            return "";
        }
    });

    pieArcs.append("text")    
    .attr("class", "piemiddle")
    .attr("text-anchor", "middle")
    .text("Battles per  tank type");

    // TheObject.DrawLegend(svg);

    pieArcs.on('mouseover',function(d, i){
        d3.select(this).transition()            
            .duration('50')
            .attr('opacity','.85')
            .duration(50)
            .style("opacity",1);            

        }).on('mouseout',function(d, i){
            d3.select(this).transition()
            .duration('50')
            .attr('opacity','1');
        }).on('click',function(d, i){
            d3.select("#moredata").selectAll("*").remove();
            var x = d3.select("#moredata").append("div").attr("class", "piemoredata col-md-12");
            for (let step = 0; step < tankCount; step++) {
                if(){
                    x.append("p").text("abcabc");
                }
            }
      }); 
}
