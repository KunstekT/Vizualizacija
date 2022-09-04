// var defaultmessage = "WN8 is a number representing the skill of the player with a specific tank. "+
// "The formula for WN8 includes damage done, number of destroyed tanks, number of spotted tanks, team base defense points and win rate. ";
    
var defaultmessage1 = "WN8 is a number representing the skill of the player with a specific tank. ";
var defaultmessage2 = "WN8 = 980⋅d + 210⋅d⋅n + 155⋅n⋅s + 75⋅b⋅n + 145⋅MIN(1.8,w)";
var defaultmessage3 = "d - damage done";
var defaultmessage4 = "n - destroyed tanks";
var defaultmessage5 = "s - number of spotted tanks";
var defaultmessage6 = "b - team base defense points";
var defaultmessage7 = "w - win rate";






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
            d3.select("#moredatatextmeaning").append("p").text("EU Win rate: ");
            d3.select("#moredatatext").append("p").text(tankEuWinrate[d3.select(this).attr("id")]);
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
        svg.append("rect").attr("width","20").attr("height","20").attr("x","840").attr("y","0").attr("style","fill:#9cb83e;");
        svg.append("text").attr("x","860").attr("y","0").attr("dy", "1em").style("text-anchor", "start").text("Player Winrate");
        svg.append("rect").attr("width","20").attr("height","20").attr("x","840").attr("y","20").attr("style","fill:#3e6bb8;");
        svg.append("text").attr("x","860").attr("y","20").attr("dy", "1em").style("text-anchor", "start").text("EU Winrate");
      } 
      if(state==4){
        // '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'4

        svg.append("rect").attr("width","20").attr("height","20").attr("x","840").attr("y","0").attr("style","fill:#855238;");
        svg.append("text").attr("x","860").attr("y","0").attr("dy", "1em").style("text-anchor", "start").text("Below average winrate");
        svg.append("rect").attr("width","20").attr("height","20").attr("x","840").attr("y","20").attr("style","fill:#3a8a50;");
        svg.append("text").attr("x","860").attr("y","20").attr("dy", "1em").style("text-anchor", "start").text("Above average winrate");

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

        tankCount = jsonStats.length;

        tankIndex =[jsonStats[0].Index, jsonStats[1].Index, jsonStats[2].Index, jsonStats[3].Index, jsonStats[4].Index, jsonStats[5].Index, jsonStats[6].Index, jsonStats[7].Index, jsonStats[8].Index,jsonStats[9].Index];
        tankNames =[jsonStats[0].TankModel, jsonStats[1].TankModel, jsonStats[2].TankModel, jsonStats[3].TankModel, jsonStats[4].TankModel, jsonStats[5].TankModel, jsonStats[6].TankModel, jsonStats[7].TankModel, jsonStats[8].TankModel,jsonStats[9].TankModel];
        tankRanks =[jsonStats[0].Rank, jsonStats[1].Rank, jsonStats[2].Rank, jsonStats[3].Rank, jsonStats[4].Rank, jsonStats[5].Rank, jsonStats[6].Rank, jsonStats[7].Rank, jsonStats[8].Rank,jsonStats[9].Rank];
        tankTypes =[jsonStats[0].Type, jsonStats[1].Type, jsonStats[2].Type, jsonStats[3].Type, jsonStats[4].Type, jsonStats[5].Type, jsonStats[6].Type, jsonStats[7].Type, jsonStats[8].Type,jsonStats[9].Type];
        tankAvgDmg =[jsonStats[0].AvgDmg, jsonStats[1].AvgDmg, jsonStats[2].AvgDmg, jsonStats[3].AvgDmg, jsonStats[4].AvgDmg, jsonStats[5].AvgDmg, jsonStats[6].AvgDmg, jsonStats[7].AvgDmg, jsonStats[8].AvgDmg,jsonStats[9].AvgDmg];
        tankAvgXp =[jsonStats[0].AvgXP, jsonStats[1].AvgXP, jsonStats[2].AvgXP, jsonStats[3].AvgXP, jsonStats[4].AvgXP, jsonStats[5].AvgXP, jsonStats[6].AvgXP, jsonStats[7].AvgXP, jsonStats[8].AvgXP,jsonStats[9].AvgXP]; 
        tankBattles =[jsonStats[0].Battles, jsonStats[1].Battles, jsonStats[2].Battles, jsonStats[3].Battles, jsonStats[4].Battles, jsonStats[5].Battles, jsonStats[6].Battles, jsonStats[7].Battles, jsonStats[8].Battles,jsonStats[9].Battles];
        tankWinrate =[jsonStats[0].WinRate, jsonStats[1].WinRate, jsonStats[2].WinRate, jsonStats[3].WinRate, jsonStats[4].WinRate, jsonStats[5].WinRate, jsonStats[6].WinRate, jsonStats[7].WinRate, jsonStats[8].WinRate,jsonStats[9].WinRate];
        tankEuWinrate = [jsonStats[0].EUWinrate, jsonStats[1].EUWinrate, jsonStats[2].EUWinrate, jsonStats[3].EUWinrate, jsonStats[4].EUWinrate, jsonStats[5].EUWinrate, jsonStats[6].EUWinrate, jsonStats[7].EUWinrate, jsonStats[8].EUWinrate,jsonStats[9].EUWinrate];
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

        tankWinrateDiff = [
            tankWinrate[0]/tankEuWinrate[0],
            tankWinrate[1]/tankEuWinrate[1],
            tankWinrate[2]/tankEuWinrate[2],
            tankWinrate[3]/tankEuWinrate[3],
            tankWinrate[4]/tankEuWinrate[4],
            tankWinrate[5]/tankEuWinrate[5],
            tankWinrate[6]/tankEuWinrate[6],
            tankWinrate[7]/tankEuWinrate[7],
            tankWinrate[8]/tankEuWinrate[8],
            tankWinrate[9]/tankEuWinrate[9]
        ];

        tankWinrateDiff.forEach(TheObject.ChangeNumbersToPercentage);

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

var tankCount, tankIndex, tankNames, tankRanks, tankTypes, tankAvgDmg, tankAvgXp, tankBattles;
var tankWinrate, tankEuWinrate, tankWN8, tankEUWN8, tankWN8diff, tankWinrateDiff;


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
        DrawWinRateGraph();        
    }
    if(graphIndex==4){
        state = 4;
        document.getElementById(x.concat("btnstate", state)).style.backgroundColor = "yellowgreen";
        d3.select("#chart").selectAll("*").remove();
        DrawBidirectionalWinRateGraph();        
    }
    if(graphIndex==5){
        state = 5;
        document.getElementById(x.concat("btnstate", state)).style.backgroundColor = "yellowgreen";
        d3.select("#chart").selectAll("*").remove();
        DrawTankTypesPie();        
    }
    if(graphIndex==6){
        state = 6;
        document.getElementById(x.concat("btnstate", state)).style.backgroundColor = "yellowgreen";
        d3.select("#chart").selectAll("*").remove();
        DrawWinratePerTankTypeChart();        
    }
}

