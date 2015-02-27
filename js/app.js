

$(document).ready(function(){
  //displayIntro();
  
  $('.layer-switch').on('click', 'a', function(){
	var $this = $(this),
		id = $this.attr('id');
	
	story();
	
	if (id === 'story') {
		$('.list-detailMaps').addClass('hide');
		$('.list-connectivityMaps').removeClass('hide');
				
	} else {
		$('.list-connectivityMaps').addClass('hide');
		$('.list-detailMaps')
			.removeClass('hide')
			.find(':checked').prop('checked', false);
		
		$('#link-connectivity').click();			
	}
	
	$('.layer-switch').find('li').removeClass('active');
	$this.parent('li').addClass('active');
  });
  
  $('#story').click();
  $('#cb1').click();
});

//FROM: http://danzel.github.io/Leaflet.utfgrid/example/layers.html
L.mapbox.accessToken = 'pk.eyJ1IjoieWFoeWExMzk5IiwiYSI6IjNYak5OOGMifQ.oCEwBMambvUHxfLJbMp6gg';
/*
var currentChoice="";
  $(".notselected").click(function(){
    if (currentChoice==""){
      currentChoice=$(this).attr('id');
      $(this).toggleClass("selected");
    }else if($(this).attr('id')=='story'){
      currentChoice='story';
      $(this).toggleClass("selected");
      $("#explore").toggleClass("notselected");
    }else if($(this).attr('id')=='explore'){
      currentChoice='explore';
      $(this).toggleClass("selected");
      $("#story").toggleClass("notselected");
    };
  });
  */




function story(){ 
  $("#maptitle").empty();
  $("#freqsTD").empty();
//  $("#div1").empty();
//  $("#div1").append("<div id='story' class='selected' onClick='story()'>Virginia Health Connectivity Maps</div><div id='explore' class='notselected' onClick='explore()'>Explore the Maps in Detail</div><div id='mands' class='notselected' onClick='displayMethodology()'>Methods & Sources</div><div id='insights' class='notselected' onClick='displayInsights()'>Insights</div>");

  //renderIntro();
  //renderNavMenu("story");
  $("#legend_bbs").empty();
  $("#legend_obesity").empty();
  $("#legend_pop").empty();
  $("#legend_infoaccess").empty();
  $("#legend_physicians").empty();
  clearMap();
  /*$("#controlButtons").empty();
  $("#controlButtons").append("<div class='controlButton' id='cb1' onClick='PopLayer_LC_LC()'>Population Distribution</div>")
  $("#controlButtons").append("<div class='controlButton' id='cb2' onClick='BBSLayer_LC_LC()'>Connectivity: Most common download speed</div>")
  $("#controlButtons").append("<div class='controlButton' id='cb3' onClick='Providers_LC_LC()'>Physicians distribution</div>")
  $("#controlButtons").append("<div class='controlButton' id='cb13' onClick='PCPRatio_LC_LC()'>Persons per Primary Care Provider per County</div>")
  $("#controlButtons").append("<div class='controlButton' id='cb4' onClick='ProvidersxPop_LC()'>Physicians and Population Distribution</div>")
  $("#controlButtons").append("<div class='controlButton' id='cb5' onClick='InfoAccess_LC_LC()'>Online Access to Health Information</div>")
  $("#controlButtons").append("<div class='controlButton' id='cb6' onClick='InfoAccessxPop_LC()'>Online Access to Health Information and Population Distribution</div>")
  $("#controlButtons").append("<div class='controlButton' id='cb7' onClick='InfoAccessxBBS_LC()'>Online Access to Health Information and Connectivity</div>")
  $("#controlButtons").append("<div class='controlButton' id='cb8' onClick='ProvidersxInfoAccess_LC()'>Access to People and Information</div>")
  $("#controlButtons").append("<div class='controlButton' id='cb11' onClick='ProvidersxObesity_LC()'>Obesity Prevalence and Provider Distribution</div>")
  $("#controlButtons").append("<div class='controlButton' id='cb12' onClick='InfoAccessxObesity_LC()'>Obesity Prevalence and Online Access to Health Information</div>")*/
//  $("#controlButtons").append("<hr><div class='controlButton' id='cb10' >Insights</div>")
//  $("#controlButtons").append("<div class='controlButton' id='cb9' >Methodology & Sources</div>")

  $(".controlButton").on("click", function() {
    if($(this).attr('id')=='cb1'){ 
      $("#maptitle").empty();
      $("#maptitle").append("<strong class='maptitle'>Virginia - Population Distribution</strong>");
//    $("#notes").empty();
//    $("#notes").append(cb1Notes);
    }else if($(this).attr('id')=='cb2'){
      $("#maptitle").empty();
      $("#maptitle").append("<strong class='maptitle'>Virginia - Connectivty: Most Common Download Speed (Mbps)</strong>");
//    $("#notes").empty();
//    $("#notes").append(cb2Notes);
    }else if($(this).attr('id')=='cb3'){
      $("#maptitle").empty();
      $("#maptitle").append("<strong class='maptitle'>Virginia - Physicians Distribution</strong>");
//    $("#notes").empty();
//    $("#notes").append(cb3Notes);
    }else if($(this).attr('id')=='cb4'){
      $("#maptitle").empty();
      $("#maptitle").append("<strong class='maptitle'>Virginia - Physicians and Population Distribution</strong>");
//    $("#notes").empty();
//    $("#notes").append(cb4Notes);
    }else if($(this).attr('id')=='cb5'){
      $("#maptitle").empty();
      $("#maptitle").append("<strong class='maptitle'>Virginia - Online Access to Health Information</strong>");
//    $("#notes").empty();
//    $("#notes").append(cb5Notes);
    }else if($(this).attr('id')=='cb6'){
      $("#maptitle").empty();
      $("#maptitle").append("<strong class='maptitle'>Virginia - Online Access to Health Information and Population Distribution</strong>");
//    $("#notes").empty();
//    $("#notes").append(cb6Notes);
    }else if($(this).attr('id')=='cb7'){
      $("#maptitle").empty();
      $("#maptitle").append("<strong class='maptitle'>Virginia - Online Access to Health Information and Connectivity</strong>");
//    $("#notes").empty();
//    $("#notes").append(cb7Notes);
    }else if($(this).attr('id')=='cb8'){
      $("#maptitle").empty();
      $("#maptitle").append("<strong class='maptitle'>Virginia - Access to People and Online Access to Health Information</strong>");
//    $("#notes").empty();
//    $("#notes").append(cb8Notes);
    }else if($(this).attr('id')=='cb9'){
//    $("#notes").empty();
//    $("#notes").append(cb9Notes);
    }else if($(this).attr('id')=='cb10'){
//    $("#notes").empty();
//    $("#notes").append(cb10Notes);
    }else if($(this).attr('id')=='cb11'){
      $("#maptitle").empty();
      $("#maptitle").append("<strong class='maptitle'>Virginia - Obesity Prevalence and Physician Distribution</strong>");
//    $("#notes").empty();
//    $("#notes").append(cb11Notes);
    }else if($(this).attr('id')=='cb12'){
      $("#maptitle").empty();
      $("#maptitle").append("<strong class='maptitle'>Virginia - Obesity Prevalence and Online Access to Health Information</strong>");
//    $("#notes").empty();
//    $("#notes").append(cb12Notes);
    }else if($(this).attr('id')=='cb13'){
      $("#maptitle").empty();
      $("#maptitle").append("<strong class='maptitle'>Virginia - Persons per Primary Care Provider per County</strong>");
//    $("#notes").empty();
//    $("#notes").append(cb12Notes);
    };    
  }); 
};
var popdistribution='<p>Highly populated counties are clustered along the north and eastern border of Virginia. Less populated, central Va. counties still have significant numbers of people.</p>';
var connectivityspeed='<p>While most Virginians have access to higher broadband download speeds, approximately 20 of Virginias 95 counties (21%) have common download speeds of <9Mbs. Lower download speed areas are not confined to areas of lowest population (rural)</p><br><strong>Actual Download Speeds Necessary to Run Concurrent Applications (Mbps)</strong><br><img src="images/actualdownloadspeeds.png"><br>SOURCE: National Broadband Plan, p. 17.'
var providerspercounty='<p>Va medical providers tend to cluster in larger cities Large areas exist within Va. with relatively few medical providers and significant numbers of people. Based on counts of telehealth providers by type of site (see below), some broadband enabled resources appear to be far less available than others in Virginia. (elderly, disabled, the very poor, those in nursing homes, school based health services, home health and employee health services).</p><p><strong>Virginia Telehealth Providers By Type of Site(as of 11/2014)</:strong><ul><li>Health Department sites: 92</li><li>Hospitals: 59</li><li>Community Mental Health Centers: 51</li><li>Prisons: 27</li><li>Private Practice: 23</li><li>Federally Qualified Health Center’s: 21</li><li>Rural Health Clinics: 16</li><li>Nursing Homes/SNF: 6</li><li>PACE: 6</li><li>Critical Access Hospitals: 5</li><li>Academic Medical Centers: 3</li><li>Free Clinics: 3</li><li>School Health Centers: 2</li><li>Agency for Aging Sites: 1</li><li>Outpatient Urgent Care: 1</li><li>Home Health: 0</li><li>Employee Health/Occupational Health: 0</li></ul>SOURCE: Mid-Atlantic Telehealth Resource Center (http://www.matrc.org/). Downloaded: 11/2014.</p>'
var providerandpop='<p>There are large areas within Virginia with relatively few medical providers despite significant numbers of people. Physicians tend to cluster in areas of high population thereby reinforcing existing resources.</p>'
var accesstochronicdzinfo='<p></p>'
var infoaccessandpopdistribution='<p>Consumer searching for health information in Virginia tends to cluster in larger cities. Several areas of higher population levels have little Internet searching occurring Population density does not appear to be the only factor driving online health information searching in Virginia.</p>'
var infoaccessandresources='<p></p>'
var peopleandinformation='<p>Online health searching closely follows a pattern of higher download speeds. Online health searching is less well correlated with provider proximity even in some areas of high population density (they may just see their providers in person). Some Virginians may have less of an ability to access clinical providers or online health information due to poorer broadband access.</p>'
var methodsandsources='<p><strong>PURPOSE</strong><br> Evaluate the degree to which Virginians can connect to the resources they need to get healthy or stay well via available broadband enabled services.<br><strong>METHODS</strong><br>Resources evaluated:<ul><li><strong>Connectivity</strong> - Specifically Internet Download Speed by county is a measure of the average Virginians ability to connect to broadband enabled health services, should they exist, in their county.</li><li><strong>People</strong> –To assess this domain we determined the number of medical (MD/DO) providers available via telehealth resources, by county in Virginia.</li><li><strong>Supports</strong> –To Assess this domain we determined the number of nonclinical health services providers (Mental Health, Employee health, Senior services available via telehealth by county in Virginia.</li><li><strong>Information</strong> –To assess this domain (non clinical data & information needs) we evaluated the number of internet searches for chronic disease information being performed in Virginia in the last year by city. </li></ul></p><p><strong>DATA SOURCES</strong><br>Sources of information and data include:<ul><li><strong>Connectivity</strong> -Data on connectivity was downloaded from the <a href="http://www.broadbandmap.gov">National Broadband Map</a>, a collaboration betwee NIST and the FCC.</li><li><strong>Catographic Data</strong> - Cartographic boundary shape files were downloaded from the <a href="http://www.census.gov/geo/maps-data/data/cbf/cbf_counties.html">United States Census Bureau.</a></li><li><strong>People</strong> -The number and distribution of providers was determined through </li><li><strong>Supports</strong> -The primary source of information regarding availaibility of telehealth connectivity to nonclinical health sources was the <a href="http://www.matrc.org">Mid-Atlantic Telehealth Resource Center</a></li><li><strong>Information</strong> -Google&#39s Google Trends service was used to assess relative search volume in Virginia of the following search terms: High blood pressure,  Hypertension, Alzheimer, Dementia, Heart Disease, Depression, Arhritis, Osteoporosis, Diabetes, COPD. The Google Trends service samples a percentage of all searches for popular search terms that have occurred in a given area in a given time (searches made by few people and those made by the same person over a short period of time are excluded) This was used to quantify the city and total number of searches totalled across all the search terms. This was then normalized using the highest search result in the state thereby generating a rank from 1-100.</li></ul></p>';
var insights='<p><strong>A story of 2 Virginias</strong><br><ul><li>Only one Virginia county (Highland) has an most common download speed of <6mbps. This suggests that there may be some unique challenges, needs or issues in that county that are keeping it from achieving connectivity levels found in every other part of the state.</li><li>It is interesting that virtually no or very little online health searching is occuring in counties with most common download speeds between 10mbps and 25mbps. In addition, there are several counties with average broadband download speeds in excess of 25mbps that also have no or very little online health searching occuring. Many of these counties are found in south-central and southern Virginia. Understanding why this is happening could be important for crafting effective strategies to ensure all consumers can benefit from broadband enabled health technologies.</li><li>It appears that counties with lower obesity prevalence also tend to have more online chronic disease searching occurring. More research in this area may help us to understand if peopole who have more of an ability to use digital health tools (conduct online health search) are better able to avoid/prevent disease (i.e. find more resources to help them avoid obesity).</li></p>';
var providersandobesity='<p><strong>INSIGHTS: Obesity Prevalence and Provider Distribution</strong><br></p>';
var infoandobesity='<p><strong>INSIGHTS: Obesity Prevalence and Information Access</strong><br></p>';

var cb1Notes="<div id='cl1'><h3>Population Distribution</h3>"+popdistribution+"</div>";
var cb2Notes="<div id='cl2'><h3>Connectivity: Most common download speed</h3>"+connectivityspeed+"</div>";
var cb3Notes="<div id='cl3'><h3>Physicians Distribution</h3>"+providerspercounty+"</div>";
var cb4Notes="<div id='cl4'><h3>Physician and Population Distribution</h3>"+providerandpop+"</div>";
var cb5Notes="<div id='cl5'><h3>Online Access to Health Information</h3>"+accesstochronicdzinfo+"</div>";
var cb6Notes="<div id='cl6'><h3>Online Access to Health Information and Population Distribution</h3>"+infoaccessandpopdistribution+"</div>";
var cb7Notes="<div id='cl7'><h3>Online Access to Health Information and Connectivity</h3>"+infoaccessandresources+"</div>";
var cb8Notes="<div id='cl8'><h3>Access to People and Online Access to Health Information</h3>"+peopleandinformation+"</div>";
var cb9Notes="<div id='cl9'><h3>Methodology and Sources</h3>"+methodsandsources+"</div>";
var cb10Notes="<div id='cl10'><h3>Insights</h3>"+insights+"</div>";
var cb11Notes="<div id='cl11'><h3>Obesity Prevalence and Physician Distribution</h3>"+providersandobesity+"</div>";
var cb12Notes="<div id='cl12'><h3>Obesity Prevalence and Online Access to Health Information</h3>"+infoandobesity+"</div>";

function explore(){
  $("#legend_bbs").empty();
  $("#legend_obesity").empty();
  $("#legend_pop").empty();
  $("#legend_infoaccess").empty();
  $("#legend_physicians").empty();
  $("#legend_pcpratio").empty();

  $("#maptitle").empty();
  $("#notes").empty();
  renderIntro();
  renderNavMenu("explore");
//  $("#div1").empty();
//  $("#div1").append("<div id='story' class='notselected' onClick='story()'>Virginia Health Connectivity Maps</div><div id='explore' class='selected' onClick='explore()'>Explore the Maps in Detail</div><div id='mands' class='notselected' onClick='displayMethodology()'>Methods & Sources</div><div id='insights' class='notselected' onClick='displayInsights()'>Insights</div>");
  $("#freqsTD").empty();
  $("#freqsTD").append("<table><tr><td class='tr2'><div id='freqandcounties'><div id='rpc' onClick='resetPopCount()'>RESET POP. COUNTER</div><div id='popfreq'><strong>TOTAL POPULATION COUNT: </strong></div><hr><div id='popcounties'><strong>COUNTIES SELECTED:</strong></div></div></td></tr></table>");

  clearMap();
  $("#controlButtons").empty();
  $("#controlButtons").append("<div class='controlButton' onClick='BBSLayer_LC()'>Connectivity: Most common download speed</div>")
  $("#controlButtons").append("<div class='controlButton' onClick='ObesityLayer_LC()'>Obesity Prevalence</div>")
  $("#controlButtons").append("<div class='controlButton' onClick='PopLayer_LC()'>Population by County</div>")
  $("#controlButtons").append("<div class='controlButton' onClick='infoAccess_LC()'>Online Access to Health Information</div>")
  $("#controlButtons").append("<div class='controlButton' onClick='providers_LC()'>Physicians Distribution</div>")
  $("#controlButtons").append("<div class='controlButton' onClick='PCPRatio_LC()'>Persons per Primary Care Provider per County</div>")

  $(".controlButton").on("click", function() {
      $(this).toggleClass("activated");
  }); 

};

var baseMap=L.mapbox.tileLayer('yahya1399.kkoj3cf3');
//var map = L.mapbox.map('map', 'yahya1399.kkoj3cf3',{
var map = L.mapbox.map('map', 'fcc.map-kzt95hy6',{	
      detectRetina: true,
      zoomControl: true,
      // gridControl: false, //turns off automatic tooltips ??
      scrollWheelZoom:false
  }).setView([37.95, -79.5], 7);

var vamap=L.mapbox.tileLayer('yahya1399.dawf80k9');
var vamap_gridLayer=L.mapbox.gridLayer('yahya1399.dawf80k9');
var interactiveLayerGroupVamap = L.layerGroup([
  vamap,
  vamap_gridLayer
  ]);
interactiveLayerGroupVamap.addTo(map);
L.control.scale().addTo(map);
vamap_gridLayer.on('click', function (e) {
  if (e.data) {
    printVamapInfo(JSON.parse(JSON.stringify(e.data)));
    document.getElementById('click').innerHTML = 'click: ' + JSON.stringify(e.data);
  } else {
    document.getElementById('click').innerHTML = 'click: nothing';
  }
}); 

var populationcount=0;
var _selectedCounties=[]
function printVamapInfo(thisObject){
  var counties_match=0;
  var countyName=JSON.parse(JSON.stringify(thisObject)).countyname;
//  alert('int(JSON.parse(JSON.stringify(thisObject)).pop: '+int(JSON.parse(JSON.stringify(thisObject)).pop);
  for(i=0;i<=_selectedCounties.length;i++){
//    alert(countyName+" | "+_selectedCounties.length);
    if(countyName==_selectedCounties[i]){
      counties_match=1;
//      alert(countyName+" | "+_selectedCounties[i]+" | "+counties_match);
    };
  };
  if(counties_match==0){
    _selectedCounties[_selectedCounties.length]=countyName;
    populationcount=populationcount+parseInt(JSON.parse(JSON.stringify(thisObject)).pop);
    $("#popcounties").append("<br>"+countyName+" | "+JSON.parse(JSON.stringify(thisObject)).pop);  
    $("#popfreq").empty();  
    $("#popfreq").append("<strong>TOTAL POPULATION COUNT: </strong>"+populationcount);    
  };
  counties_match=0;
};

function resetPopCount(){
  populationcount=0;
  _selectedCounties=[];
  $("#popfreq").empty();  
  $("#popcounties").empty(); 
  $("#popfreq").append("<strong>TOTAL POPULATION COUNT: </strong>");  
  $("#popcounties").append("<strong>COUNTIES:</strong>"); 
};


///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/////////////////////BBS///////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
var BBS=L.mapbox.tileLayer('yahya1399.cqiftj4i');
var BBS_gridLayer=L.mapbox.gridLayer('yahya1399.cqiftj4i');
//var BBS_gridControlLayer=L.mapbox.gridControl('yahya1399.cntmaemi');
var interactiveLayerGroupBBS = L.layerGroup([
  BBS,
  BBS_gridLayer]);

//Events
    BBS_gridLayer.on('click', function (e) {
      if (e.data) {
        printBBSInfo(JSON.parse(JSON.stringify(e.data)));
        document.getElementById('click').innerHTML = 'click: ' + JSON.stringify(e.data);
      } else {
        document.getElementById('click').innerHTML = 'click: nothing';
      }
    }); 
    BBS_gridLayer.on('mouseover', function (e) {
      if (e.data) {
        var this_mbps=JSON.parse(JSON.stringify(e.data)).mostcommon;
        var mbps;
        if(this_mbps==2){
          mbps=">200 kbps and <768 kbps";
        }else if(this_mbps==3){
          mbps=">768 kbps and <1.5 mbps"
        }else if(this_mbps==4){
          mbps=">1.5 mbps and <3 mbps"
        }else if(this_mbps==5){
          mbps=">3 mbps and <6 mbps"
        }else if(this_mbps==6){
          mbps=">6 mbps and <10 mbps"
        }else if(this_mbps==7){
          mbps=">10 mbps and <25 mbps"
        }else if(this_mbps==8){
          mbps=">25 mbps and <50 mbps"
        }else if(this_mbps==9){
          mbps=">50 mbps and <100 mbps"
        }else if(this_mbps==10){
          mbps=">100 mbps and <1 gbps"
        }else if(this_mbps==11){
          mbps=">1 gbps"
        };
/*        if(this_mbps==2){
          mbps=">200 kbps and <768 kbps";
        }else if(this_mbps==3){
          mbps=">768 kbps and <1.5 mbps"
        }else if(this_mbps==4){
          mbps=">1.5 mbps and <3 mbps"
        }else if(this_mbps==5){
          mbps=">3 mbps and <6 mbps"
        }else if(this_mbps==6){
          mbps=">6 mbps and <10 mbps"
        }else if(this_mbps==7){
          mbps=">10 mbps and <25 mbps"
        }else if(this_mbps==8){
          mbps=">25 mbps and <50 mbps"
        }else if(this_mbps==9){
          mbps=">50 mbps and <100 mbps"
        }else if(this_mbps==10){
          mbps=">100 mbps and <1 gbps"
        }else if(this_mbps==11){
          mbps=">1 gbps"
        };
*/      $("#mainoutput").empty();
        $("#mainoutput").append("<div class='thisoutput'><strong>County: </strong>"+JSON.parse(JSON.stringify(e.data)).geographyn+"<br><strong>Most Common Download Speed (Mbps): </strong>"+mbps+"</div>");
//        $("#mainoutput").append("<div class='thisoutput'><strong>County: </strong>"+JSON.parse(JSON.stringify(e.data)).geographyn+"<br><strong>Most Common Download Speed (Mbps): </strong>"+mbps+"</div>");
       document.getElementById('hover').innerHTML = 'hover: ' + JSON.stringify(e.data);
      } else {
        document.getElementById('hover').innerHTML = 'hover: nothing';
      }
      //console.log('mouseover: ' + e.data);
    });
    BBS_gridLayer.on('mouseout', function (e) {
      $("#mainoutput").empty();
      //console.log('mouseout: ' + e.data);
    });

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/////////////////////OBESITY///////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
var obesity=L.mapbox.tileLayer('yahya1399.lzxb6gvi',{opacity:0.75});
var obesity_gridLayer=L.mapbox.gridLayer('yahya1399.lzxb6gvi');

var interactiveLayerGroupObesity = L.layerGroup([
  obesity,
  obesity_gridLayer]);

//Events
    obesity_gridLayer.on('click', function (e) {
      if (e.data) {
        document.getElementById('click').innerHTML = 'click: ' + JSON.stringify(e.data);
        printObesityInfo(JSON.parse(JSON.stringify(e.data)));
      } else {
        document.getElementById('click').innerHTML = 'click: nothing';
      }
    }); 
    obesity_gridLayer.on('mouseover', function (e) {
      if (e.data) {
        $("#mainoutput").empty();
        $("#mainoutput").append("<div class='thisoutput'><strong>County: </strong>"+JSON.parse(JSON.stringify(e.data)).NAME+"<br><strong>Obesity Prevalence (%): </strong>"+JSON.parse(JSON.stringify(e.data)).USAObesi_2+"</div>");
        document.getElementById('hover').innerHTML = 'hover: ' + JSON.stringify(e.data);
      } else {
        document.getElementById('hover').innerHTML = 'hover: nothing';
      }
      //console.log('mouseover: ' + e.data);
    });
    obesity_gridLayer.on('mouseout', function (e) {
      $("#mainoutput").empty();
      //console.log('mouseout: ' + e.data);
    });
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/////////////////////PCP RATIO/////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
var pcpratio=L.mapbox.tileLayer('yahya1399.s0ykfbt9',{opacity:0.75});
var pcpratio_gridLayer=L.mapbox.gridLayer('yahya1399.s0ykfbt9');

var interactiveLayerGroupPCP = L.layerGroup([
  pcpratio,
  pcpratio_gridLayer]);

//Events
    pcpratio_gridLayer.on('click', function (e) {
      if (e.data) {
        document.getElementById('click').innerHTML = 'click: ' + JSON.stringify(e.data);
        printPopInfo(JSON.parse(JSON.stringify(e.data)));
      } else {
        document.getElementById('click').innerHTML = 'click: nothing';
      }
    }); 
    pcpratio_gridLayer.on('mouseover', function (e) {
      if (e.data) {
        $("#mainoutput").empty();
        $("#mainoutput").append("<div class='thisoutput'><strong>County: </strong>"+JSON.parse(JSON.stringify(e.data)).countyname+"<br><strong>Number of PCPs in County: </strong>"+JSON.parse(JSON.stringify(e.data)).pcp_num+"<br><strong>PCP Ratio: </strong>"+JSON.parse(JSON.stringify(e.data)).pcp_ratio+"</div>");
        document.getElementById('hover').innerHTML = 'hover: ' + JSON.stringify(e.data);
      } else {
        document.getElementById('hover').innerHTML = 'hover: nothing';
      }
      //console.log('mouseover: ' + e.data);
    });
    pcpratio_gridLayer.on('mouseout', function (e) {
      $("#mainoutput").empty();
      //console.log('mouseout: ' + e.data);
    });
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/////////////////////POPULATION////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
var pop=L.mapbox.tileLayer('yahya1399.13zhncdi',{opacity:0.75});
var pop_gridLayer=L.mapbox.gridLayer('yahya1399.13zhncdi');

var interactiveLayerGroupPop = L.layerGroup([
  pop,
  pop_gridLayer]);

//Events
    pop_gridLayer.on('click', function (e) {
      if (e.data) {
        document.getElementById('click').innerHTML = 'click: ' + JSON.stringify(e.data);
        printPopInfo(JSON.parse(JSON.stringify(e.data)));
      } else {
        document.getElementById('click').innerHTML = 'click: nothing';
      }
    }); 
    pop_gridLayer.on('mouseover', function (e) {
      if (e.data) {
        $("#mainoutput").empty();
        $("#mainoutput").append("<div class='thisoutput'><strong>County: </strong>"+JSON.parse(JSON.stringify(e.data)).countyname+"<br><strong>Population: </strong>"+JSON.parse(JSON.stringify(e.data)).pop+"</div>");
        document.getElementById('hover').innerHTML = 'hover: ' + JSON.stringify(e.data);
      } else {
        document.getElementById('hover').innerHTML = 'hover: nothing';
      }
      //console.log('mouseover: ' + e.data);
    });
    pop_gridLayer.on('mouseout', function (e) {
      $("#mainoutput").empty();
      //console.log('mouseout: ' + e.data);
    });

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/////////////////////INFO ACCESS///////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
function infoAccess_LC(){
      $("#output").append("layerStatus.infoAccess: "+layerStatus.infoAccess);
      if(layerStatus.infoAccess==1){
        layerStatus.infoAccess=0;
        $("#legend_infoaccess").empty();
        $("#output").append(" | layerStatus.infoAccess=1");
        $("#infoAccessdiv-outter").empty();
        $("#infoAccessdiv-outter").append("<div id='infoAccessdiv' class='inactive'>Use of online resources: chronic disease information</div>");
        map.removeLayer(tileLayers.infoAccess);
        map.removeLayer(gridLayers.infoAccess);
//        map.removeLayer(gridControlLayers.infoAccess);
      }else{
        layerStatus.infoAccess=1;
        $("#legend_infoaccess").append("<strong>Access to Chronic Disease Information (score)</strong><br><img src='images/infoaccess.png' width='156' height='57'>")
        $("#output").append(" | layerStatus.infoAccess=0");
        $("#infoAccessdiv-outter").empty();
        $("#infoAccessdiv-outter").append("<div id='infoAccessdiv' class='active'>Use of online resources: chronic disease information</div>");
        tileLayers.infoAccess.addTo(map).bringToFront();
        gridLayers.infoAccess.addTo(map);
 //       gridControlLayers.infoAccess.addTo(map);

        gridLayers.infoAccess.on('click', function (e) {
          if (e.data) {
            document.getElementById('click').innerHTML = 'click: ' + JSON.stringify(e.data);
          } else {
            document.getElementById('click').innerHTML = 'click: nothing';
          }
        }); 
        gridLayers.infoAccess.on('mouseover', function (e) {
          if (e.data) {
            $("#mainoutput").empty();
            $("#mainoutput").append("<div class='thisoutput'><strong>City: </strong>"+JSON.parse(JSON.stringify(e.data)).cities+"<br><strong>Chronic Disease Information Access Score: </strong>"+JSON.parse(JSON.stringify(e.data)).relative_s+"</div>");
            document.getElementById('hover').innerHTML = 'hover: ' + JSON.stringify(e.data);
          } else {
            document.getElementById('hover').innerHTML = 'hover: nothing';
          }
          //console.log('mouseover: ' + e.data);
        });
        gridLayers.infoAccess.on('mouseout', function (e) {
          $("#mainoutput").empty();
          //console.log('mouseout: ' + e.data);
        });
      };
};

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/////////////////////PROVIDERS/////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
function providers_LC(){
      $("#output").append("layerStatus.providers: "+layerStatus.providers);
      if(layerStatus.providers==1){
        layerStatus.providers=0;
        $("#legend_physicians").empty();
        $("#output").append(" | layerStatus.providers=1");
        $("#providersdiv-outter").empty();
        $("#providersdiv-outter").append("<div id='providersdiv' class='inactive'>Numbers of Providers by County</div>");
        map.removeLayer(tileLayers.providers);
        map.removeLayer(gridLayers.providers);
//        map.removeLayer(gridControlLayers.providers);
      }else{
        layerStatus.providers=1;
        $("#legend_physicians").append("<strong>Number of Physicians</strong><br><img src='images/physicians.png' width='174' height='63'>")
        $("#output").append(" | layerStatus.providers=0");
        $("#providersdiv-outter").empty();
        $("#providersdiv-outter").append("<div id='providersdiv' class='active'>Numbers of Providers by County</div>");
        tileLayers.providers.addTo(map).bringToFront();
        gridLayers.providers.addTo(map);
//        gridControlLayers.providers.addTo(map);

    gridLayers.providers.on('click', function (e) {
      if (e.data) {
        document.getElementById('click').innerHTML = 'click: ' + JSON.stringify(e.data);
      } else {
        document.getElementById('click').innerHTML = 'click: nothing';
      }
    }); 
    gridLayers.providers.on('mouseover', function (e) {
      if (e.data) {
      $("#mainoutput").empty();  
      $("#mainoutput").append("<div class='thisoutput'><strong>City: </strong>"+JSON.parse(JSON.stringify(e.data)).city+"<br><strong>Physicians: </strong>"+JSON.parse(JSON.stringify(e.data)).providers+"</div>");
        document.getElementById('hover').innerHTML = 'hover: ' + JSON.stringify(e.data);
      } else {
        document.getElementById('hover').innerHTML = 'hover: nothing';
      }
      //console.log('mouseover: ' + e.data);
    });
    gridLayers.providers.on('mouseout', function (e) {
      $("#mainoutput").empty();  
      //console.log('mouseout: ' + e.data);
    });
  };
};

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/////////////////////LAYERS CONTROLS///////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
//Set up a layers control with the base map
/*
    var layersControl = L.control.layers({
      'Base Map': baseMap,
      'Broadband Coverage - Most common download speed (mbps)': interactiveLayerGroupBBS,
      'Obesity Prevalence by County' :interactiveLayerGroupObesity,
      'Population by County':interactiveLayerGroupPop
    }).addTo(map);
*/
    var maps={
      infoAccess: 'yahya1399.k4akbj4i',
      providers: 'yahya1399.njii19k9',
      pop:'yahya1399.l3zhncdi'
    };
    var tileLayers={
      infoAccess: L.mapbox.tileLayer(maps.infoAccess),
      providers: L.mapbox.tileLayer(maps.providers)
    };
    var gridLayers={
      infoAccess: L.mapbox.gridLayer(maps.infoAccess),
      providers: L.mapbox.gridLayer(maps.providers),
      pop: L.mapbox.gridLayer(maps.pop)
    };
    var gridControlLayers={
      infoAccess: L.mapbox.gridControl(gridLayers.infoAccess),
      providers: L.mapbox.gridControl(gridLayers.providers),
      pop: L.mapbox.gridControl(gridLayers.pop)
    };
    var layerStatus={
      infoAccess: 0,
      providers: 0,
      ObesityLayer: 0,
      BBSLayer: 0,
      PopLayer: 0,
      PCPRatioLayer:0
    };

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/////////////////////ADD/REMOVE FUNCTIONS//////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
function clearMap(){
  map.removeLayer(interactiveLayerGroupObesity);
  map.removeLayer(interactiveLayerGroupBBS);   
  map.removeLayer(interactiveLayerGroupPop);   
  map.removeLayer(interactiveLayerGroupPCP);

  map.removeLayer(tileLayers.providers);
  map.removeLayer(gridLayers.providers);
//  map.removeLayer(gridControlLayers.providers);
  map.removeLayer(tileLayers.infoAccess);
  map.removeLayer(gridLayers.infoAccess);
//  map.removeLayer(gridControlLayers.infoAccess);

  layerStatus.infoAccess=0;
  layerStatus.providers=0;
  layerStatus.ObesityLayer=0;
  layerStatus.BBSLayer=0;
  layerStatus.PopLayer=0;
  layerStatus.PCPRatioLayer=0;

  $("#legend_bbs").empty();
  $("#legend_obesity").empty();
  $("#legend_pop").empty();
  $("#legend_infoaccess").empty();
  $("#legend_physicians").empty();
  $("#legend_pcpratio").empty();
};


  function ObesityLayer_LC(){
    if(layerStatus.ObesityLayer==0){
      interactiveLayerGroupObesity.addTo(map);
      layerStatus.ObesityLayer=1;      
      $("#legend_obesity").append("<strong>Obesity Prevalence (%)</strong><br><img src='images/obesity.png' width='221' height='48'>")
    }else{
      map.removeLayer(interactiveLayerGroupObesity);
      layerStatus.ObesityLayer=0;
      $("#legend_obesity").empty();
    };
  };

  function PCPRatio_LC(){
    if(layerStatus.PCPRatioLayer==0){
      interactiveLayerGroupPCP.addTo(map);
      layerStatus.PCPRatioLayer=1;      
      $("#legend_pcpratio").append("<strong>PCP Ratio</strong><br><img src='images/pcp_ratio.png' width='221' height='48'>")
    }else{
      map.removeLayer(interactiveLayerGroupPCP);
      layerStatus.PCPRatioLayer=0;
      $("#legend_pcpratio").empty();
    };
  };


  function BBSLayer_LC(){
    if(layerStatus.BBSLayer==0){
      interactiveLayerGroupBBS.addTo(map);
      layerStatus.BBSLayer=1;
      $("#legend_bbs").append("<strong>Most Common Download Speed (Mbps)</strong><br><img src='images/connectivity2.png' width='200' height='44'>")
    }else{
      map.removeLayer(interactiveLayerGroupBBS);   
      layerStatus.BBSLayer=0;
      $("#legend_bbs").empty();
    };
//    doLegend("obesity");
  };

  function PopLayer_LC(){
    if(layerStatus.PopLayer==0){
      interactiveLayerGroupPop.addTo(map);
      layerStatus.PopLayer=1;
      $("#legend_pop").append("<strong>Population Distribution</strong><br><img src='images/pop.png' width='192' height='56'>")
    }else{
      map.removeLayer(interactiveLayerGroupPop);   
      layerStatus.PopLayer=0;
      $("#legend_pop").empty();
    };
  };

var thisLayer="";
function getRidOfPreviousLayers(callingLayer){
  if(thisLayer==""){
    thisLayer=callingLayer;
  }else if(thisLayer==callingLayer){
    thisLayer="";
  }else {
    if(thisLayer=="ProvidersxInfoAccess"){ProvidersxInfoAccess_rid()}
    else if(thisLayer=="ProvidersxBBS"){ProvidersxBBS_rid()}
    else if(thisLayer=="ProvidersxObesity"){ProvidersxObesity_rid()}
    else if(thisLayer=="ProvidersxPop"){ProvidersxPop_rid()}
    else if(thisLayer=="InfoAccessxBBS"){InfoAccessxBBS_rid()}
    else if(thisLayer=="InfoAccessxObesity"){InfoAccessxObesity_rid()}
    else if(thisLayer=="InfoAccessxPop"){InfoAccessxPop_rid()}
    else if(thisLayer=="Pop"){Pop_rid()}
    else if(thisLayer=="BBS"){BBSLayer_rid()}
    else if(thisLayer=="Providers"){Providers_rid()}
    else if(thisLayer=="InfoAccess"){InfoAccess_rid()}
    else if(thisLayer=="Obesity"){ObesityLayer_rid()}
    else if(thisLayer=="PCPRatio"){PCPRatio_rid()}
      ;
    thisLayer=callingLayer;
  };
};


function ObesityLayer_LC_LC(){
    getRidOfPreviousLayers("Obesity");
    ObesityLayer_LC();
};

function InfoAccess_LC_LC(){
    getRidOfPreviousLayers("InfoAccess");
    infoAccess_LC();
};

function PopLayer_LC_LC(){
    getRidOfPreviousLayers("Pop");
    PopLayer_LC();
};

function PCPRatio_LC_LC(){
    getRidOfPreviousLayers("PCPRatio");
    PCPRatio_LC();
};

function BBSLayer_LC_LC(){
    getRidOfPreviousLayers("BBS");
    BBSLayer_LC();
};
function Providers_LC_LC(){
    getRidOfPreviousLayers("Providers");
    providers_LC();
};

function ProvidersxInfoAccess_LC(){
    getRidOfPreviousLayers("ProvidersxInfoAccess");
    providers_LC();
    infoAccess_LC();      
};
function ProvidersxBBS_LC(){
  getRidOfPreviousLayers("ProvidersxBBS");
  BBSLayer_LC();
  providers_LC();
};
function ProvidersxObesity_LC(){
  getRidOfPreviousLayers("ProvidersxObesity");
  ObesityLayer_LC();
  providers_LC();
};
function ProvidersxPop_LC(){
  getRidOfPreviousLayers("ProvidersxPop");
  PopLayer_LC();
  providers_LC();
};
function InfoAccessxBBS_LC(){
  getRidOfPreviousLayers("InfoAccessxBBS");
  BBSLayer_LC();
  infoAccess_LC();
};
function InfoAccessxObesity_LC(){
  getRidOfPreviousLayers("InfoAccessxObesity");
  ObesityLayer_LC();
  infoAccess_LC();
};
function InfoAccessxPop_LC(){
  getRidOfPreviousLayers("InfoAccessxPop");
  PopLayer_LC();
  infoAccess_LC();
};


function PCPRatio_rid(){
  clearMap()
};

function ObesityLayer_rid(){
  clearMap()
  /*ObesityLayer_LC();*/
};
function InfoAccess_rid(){
  clearMap()
  /*infoAccess_LC();*/
};
function Pop_rid(){
  clearMap()
/*  PopLayer_LC();*/
};
function BBSLayer_rid(){
  clearMap()
/*    BBSLayer_LC();*/
};
function Providers_rid(){
  clearMap()
/*    providers_LC();*/
};
function ProvidersxInfoAccess_rid(){
  clearMap()
/*    providers_LC();
    infoAccess_LC();      
*/
};
function ProvidersxBBS_rid(){
  clearMap()
/*  BBSLayer_LC();
  providers_LC();
*/
};
function ProvidersxObesity_rid(){
  clearMap()
/*  ObesityLayer_LC();
  providers_LC();
*/
};
function ProvidersxPop_rid(){
  clearMap()
/*  PopLayer_LC();
  providers_LC();
*/
};
function InfoAccessxBBS_rid(){
  clearMap()
/*  BBSLayer_LC();
  infoAccess_LC();
*/
};
function InfoAccessxObesity_rid(){
  clearMap()
/*  ObesityLayer_LC();
  infoAccess_LC();
*/
};
function InfoAccessxPop_rid(){
  clearMap()
/*  PopLayer_LC();
  infoAccess_LC();
*/
};
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
//PRINT FUNCTIONS
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
/*
var sendToPrint=[];
function printThis(){
    $("#output").append('<br><div><table><tr id="thisTr">')
    for(i=0;i<sendToPrint.length;i++){
      $("#thisTr").append("<td>"+sendToPrint[i]+"</td>");
    };
  $("#output").append('</tr></table></div>')
  sendToPrint=[];
};
*/
function printBBSInfo(thisObject){
//      $("#output").empty();
//      $("#output").append("JS va_51001.Obese_prev: "+va_51001.Obese_prev+"<br>");
        var this_mbps=JSON.parse(JSON.stringify(thisObject)).mostcommon;
        var mbps;
        if(this_mbps==2){
          mbps=">200 kbps and <768 kbps";
        }else if(this_mbps==3){
          mbps=">768 kbps and <1.5 mbps"
        }else if(this_mbps==4){
          mbps=">1.5 mbps and <3 mbps"
        }else if(this_mbps==5){
          mbps=">3 mbps and <6 mbps"
        }else if(this_mbps==6){
          mbps=">6 mbps and <10 mbps"
        }else if(this_mbps==7){
          mbps=">10 mbps and <25 mbps"
        }else if(this_mbps==8){
          mbps=">25 mbps and <50 mbps"
        }else if(this_mbps==9){
          mbps=">50 mbps and <100 mbps"
        }else if(this_mbps==10){
          mbps=">100 mbps and <1 gbps"
        }else if(this_mbps==11){
          mbps=">1 gbps"
        };

/*        sendToPrint[sendToPrint.length]=JSON.parse(JSON.stringify(thisObject)).geographyn;
        sendToPrint[sendToPrint.length]=this_mbps;
        printThis();
*/
/*

      $("#output").append("County: "+thisObject.geographyn+"<br>"+"admin_fips: "+thisObject.admin_fips+"<br>"+"anytechnol: "+thisObject.anytechnol+"<br>"+"anywirelin: "+thisObject.anywirelin+"<br>"+"asymmetric: "+thisObject.asymmetric+"<br>"+"cabledocsi: "+thisObject.cabledocsi+"<br>"+"cableother: "+thisObject.cableother+"<br>"+"cabletechn: "+thisObject.cabletechn+"<br>"+"copper: "+thisObject.copper+"<br>"+"downloadsp: "+thisObject.downloadsp+"<br>"+"download_1: "+thisObject.download_1+"<br>"+"download_2: "+thisObject.download_2+"<br>"+"download_3: "+thisObject.download_3+"<br>"+"download_4: "+thisObject.download_4+"<br>"+"download_5: "+thisObject.download_5+"<br>"+"download_6: "+thisObject.download_6+"<br>"+"download_7: "+thisObject.download_7+"<br>"+"download_8: "+thisObject.download_8+"<br>"+"download_9: "+thisObject.download_9+"<br>"+"download10: "+thisObject.download10+"<br>"+"download11: "+thisObject.download11+"<br>"+"download12: "+thisObject.download12+"<br>"+"download13: "+thisObject.download13+"<br>"+"dsltechnol: "+thisObject.dsltechnol+"<br>"+"fibertechn: "+thisObject.fibertechn+"<br>"+"fixedwirel: "+thisObject.fixedwirel+"<br>"+"fixedwir_1: "+thisObject.fixedwir_1+"<br>"+"fixedwir_2: "+thisObject.fixedwir_2+"<br>"+"geographyn: "+thisObject.geographyn+"<br>"+"greater_th: "+thisObject.greater_th+"<br>"+"fixedwir_1: "+thisObject.greatestdo+"<br>"+"greatest_1: "+thisObject.greatest_1+"<br>"+"greatestup: "+thisObject.greatestup+"<br>"+"greatest_2: "+thisObject.greatest_2+"<br>"+"mobilewire: "+thisObject.mobilewire+"<br>"+"mostcommon: "+thisObject.mostcommon+"<br>"+"mostcomm_1: "+thisObject.mostcomm_1+"<br>"+"mostcomm_2: "+thisObject.mostcomm_2+"<br>"+"mostcomm_3: "+thisObject.mostcomm_3+"<br>"+"numberofwi: "+thisObject.numberofwi+"<br>"+"numberof_1: "+thisObject.numberof_1+"<br>"+"numberof_2: "+thisObject.numberof_2+"<br>"+"numberof_3: "+thisObject.numberof_3+"<br>"+"numberof_4: "+thisObject.numberof_4+"<br>"+"numberof_5: "+thisObject.numberof_5+"<br>"+"numberof_6: "+thisObject.numberof_6+"<br>"+"numberof_7: "+thisObject.numberof_7+"<br>"+"numberof_8: "+thisObject.numberof_8+"<br>"+"numberof_9: "+thisObject.numberof_9+"<br>"+"numberof10: "+thisObject.numberof10+"<br>"+"numberof11: "+thisObject.numberof11+"<br>"+"numberof12: "+thisObject.numberof12+"<br>"+"numberof13: "+thisObject.numberof13+"<br>"+"numberof14: "+thisObject.numberof14+"<br>"+"numberof15: "+thisObject.numberof15+"<br>"+"numberof16: "+thisObject.numberof16+"<br>"+"numberof17: "+thisObject.numberof17+"<br>"+"othertechn: "+thisObject.othertechn+"<br>"+"powerline: "+thisObject.powerline+"<br>"+"satellite: "+thisObject.satellite+"<br>"+"symmetricd: "+thisObject.symmetricd+"<br>"+"uploadspee: "+thisObject.uploadspee+"<br>"+"uploadsp_1: "+thisObject.uploadsp_1+"<br>"+"uploadsp_2: "+thisObject.uploadsp_2+"<br>"+"uploadsp_3: "+thisObject.uploadsp_3+"<br>"+"uploadsp_4: "+thisObject.uploadsp_4+"<br>"+"uploadsp_5: "+thisObject.uploadsp_5+"<br>"+"uploadsp_6: "+thisObject.uploadsp_6+"<br>"+"uploadsp_7: "+thisObject.uploadsp_7+"<br>"+"uploadsp_8: "+thisObject.uploadsp_8+"<br>"+"uploadsp_9: "+thisObject.uploadsp_9+"<br>"+"uploadsp_10: "+thisObject.uploadsp10+"<br>"+"uploadsp_11: "+thisObject.uploadsp11+"<br>"+"uploadsp_12: "+thisObject.uploadsp12+"<br>"+"uploadsp_13: "+thisObject.uploadsp13+"<br>"+"wirelessdo: "+thisObject.wirelessdo+"<br>"+"wireless_1: "+thisObject.wireless_1+"<br>"+"wireless_2: "+thisObject.wireless_2+"<br>"+"wireless_3: "+thisObject.wireless_3+"<br>"+"wireless_4: "+thisObject.wireless_4+"<br>"+"wireless_5: "+thisObject.wireless_5+"<br>"+"wireless_6: "+thisObject.wireless_6+"<br>"+"wireless_7: "+thisObject.wireless_7+"<br>"+"wireless_8: "+thisObject.wireless_8+"<br>"+"wireless_9: "+thisObject.wireless_9+"<br>"+"wireless10: "+thisObject.wireless10+"<br>"+"wirelesste: "+thisObject.wirelesste+"<br>"+"wirelessup: "+thisObject.wirelessup+"<br>"+"wireless11: "+thisObject.wireless11+"<br>"+"wireless12: "+thisObject.wireless12+"<br>"+"wireless13: "+thisObject.wireless13+"<br>"+"wireless14: "+thisObject.wireless14+"<br>"+"wireless15: "+thisObject.wireless15+"<br>"+"wireless16: "+thisObject.wireless16+"<br>"+"wireless17: "+thisObject.wireless17+"<br>"+"wireless18: "+thisObject.wireless18+"<br>"+"wireless19: "+thisObject.wireless19+"<br>"+"wireless20: "+thisObject.wireless20+"<br>"+"wirelinedo: "+thisObject.wirelinedo+"<br>"+"wireline_1: "+thisObject.wireline_1+"<br>"+"wireline_2: "+thisObject.wireline_2+"<br>"+"wireline_3: "+thisObject.wireline_3+"<br>"+"wireline_4: "+thisObject.wireline_4+"<br>"+"wireline_5: "+thisObject.wireline_5+"<br>"+"wireline_6: "+thisObject.wireline_6+"<br>"+"wireline_7: "+thisObject.wireline_7+"<br>"+"wireline_8: "+thisObject.wireline_8+"<br>"+"wireline_9wireline10: "+thisObject.wireline_9+"<br>"+"wireline10: "+thisObject.wireline10+"<br>"+"wirelineup: "+thisObject.wirelineup+"<br>"+"wireline11: "+thisObject.wireline11+"<br>"+"wireline12: "+thisObject.wireline12+"<br>"+"wireline13: "+thisObject.wireline13+"<br>"+"wireline14: "+thisObject.wireline14+"<br>"+"wireline15: "+thisObject.wireline15+"<br>"+"wireline16: "+thisObject.wireline16+"<br>"+"wireline17: "+thisObject.wireline17+"<br>"+"wireline18: "+thisObject.wireline18+"<br>"+"wireline19: "+thisObject.wireline19+"<br>"+"wireline20: "+thisObject.wireline20+"<br>"+"counties_v: "+thisObject.counties_v)
*/
      ;
};

function printObesityInfo(thisObject){
      var _fips=[51001,51003,51005,51007,51009,51011,51013,51015,51017,51019,51021,51023,51025,51027,51029,51031,51033,51035,51036,51037,51041,51043,51045,51047,51049,51051,51053,51057,51059,51061,51063,51065,51067,51069,51071,51073,51075,51077,51079,51081,51083,51085,51087,51089,51091,51093,51095,51097,51099,51101,51103,51105,51107,51109,51111,51113,51115,51117,51119,51121,51125,51127,51131,51133,51135,51137,51139,51141,51143,51145,51147,51149,51153,51155,51157,51159,51161,51163,51165,51167,51169,51171,51173,51175,51177,51179,51181,51183,51185,51187,51191,51193,51195,51197,51199,51510,51515,51520,51530,51540,51550,51570,51580,51590,51595,51600,51610,51620,51630,51640,51650,51660,51670,51678,51680,51683,51685,51690,51700,51710,51720,51730,51735,51740,51750,51760,51770,51775,51790,51800,51810,51820,51830,51840];
      var _fipsobjects=[va_51001,va_51003,va_51005,va_51007,va_51009,va_51011,va_51013,va_51015,va_51017,va_51019,va_51021,va_51023,va_51025,va_51027,va_51029,va_51031,va_51033,va_51035,va_51036,va_51037,va_51041,va_51043,va_51045,va_51047,va_51049,va_51051,va_51053,va_51057,va_51059,va_51061,va_51063,va_51065,va_51067,va_51069,va_51071,va_51073,va_51075,va_51077,va_51079,va_51081,va_51083,va_51085,va_51087,va_51089,va_51091,va_51093,va_51095,va_51097,va_51099,va_51101,va_51103,va_51105,va_51107,va_51109,va_51111,va_51113,va_51115,va_51117,va_51119,va_51121,va_51125,va_51127,va_51131,va_51133,va_51135,va_51137,va_51139,va_51141,va_51143,va_51145,va_51147,va_51149,va_51153,va_51155,va_51157,va_51159,va_51161,va_51163,va_51165,va_51167,va_51169,va_51171,va_51173,va_51175,va_51177,va_51179,va_51181,va_51183,va_51185,va_51187,va_51191,va_51193,va_51195,va_51197,va_51199,va_51510,va_51515,va_51520,va_51530,va_51540,va_51550,va_51570,va_51580,va_51590,va_51595,va_51600,va_51610,va_51620,va_51630,va_51640,va_51650,va_51660,va_51670,va_51678,va_51680,va_51683,va_51685,va_51690,va_51700,va_51710,va_51720,va_51730,va_51735,va_51740,va_51750,va_51760,va_51770,va_51775,va_51790,va_51800,va_51810,va_51820,va_51830,va_51840];
//      $("#output").empty();
      var thisGEOID=thisObject.GEOID;

/*
      $("#output").append("JS va_51001.Obese_prev: "+_fipsobjects[_fips.indexOf(51003)].Obese_prev+"<br>");
      $("#output").append("thisGEOID: "+parseInt(thisObject.GEOID)+" | Obese_prev: "+_fipsobjects[_fips.indexOf(parseInt(thisObject.GEOID))].Obese_prev+"<br>");
      $("#output").append("GEOID: "+thisObject.GEOID+"<br>"+"State: "+thisObject.USAObesity+"<br>"+"County: "+thisObject.USAObesi_1);
*/
/*
      sendToPrint[sendToPrint.length]=_fipsobjects[_fips.indexOf(parseInt(thisObject.GEOID))].Obese_prev;
      printThis();
*/
};

function printPopInfo(thisObject){
  var thisState=thisObject.state;
//  $("#output").append("State: "+thisObject.state+" | County: "+thisObject.countyname+" | Population: "+thisObject.pop);
/*
      sendToPrint[sendToPrint.length]=thisObject.pop;
      printThis();  
*/
};
