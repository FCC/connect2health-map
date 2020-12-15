/* 
  Code provided by Connect2HealthFCC Task Force 
*/

var legendPop = {
    labels: ['10,000', '100,000'],
    colors: ['#f1f6ae', '#ecd57d', '#ed9c52', '#ec6d44', '#d8463a', '#b23341'],
};

var legendBBS = {
    labels: ['1,000', '0.2'],
    colors: ['#1b5c01', '#94d639', '#adde63', '#ff9473', '#ff6342', '#ff3118', '#ff0000', '#d60000'],
};

var legendObesity = {
    labels: ['20%', '40%'],
    colors: ['#22b14c', '#ffffb2', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026'],
};

var legendPCPRatio = {
    labels: ['2,000', '20,000'],
    colors: ['#4ca54d', '#ffff00', '#ffcc00', '#ff9900', '#ff6600', '#ff3300', '#ff0000'],
};

var legendInfoAccess = {
    labels: ['100', '5'],
    colors: ['#cc0202', '#cc0202', '#cc0202', '#cc0202', '#cc0202'],
};

var legendPhysicians = {
    labels: ['> 2,000', '10'],
    colors: ['#396a9c', '#396a9c', '#396a9c', '#396a9c', '#396a9c'],
};

$(document).ready(function() {
    $('[data-toggle="collapse"]').click(function(e) {
        e.preventDefault();

        if ($(this).is('.collapsed')) {
            $(this).find('.glyphicon').removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');
        } else {
            $(this).find('.glyphicon').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
        }
    });

    $('.layer-switch').on('click', 'a', function(e) {
        var $this = $(this),
            id = $this.attr('id');

        e.preventDefault();

        story();

        if (id === 'story') {
            $('.list-detailMaps').addClass('hide');
            $('.list-connectivityMaps').removeClass('hide');
            $('#cb1').click();
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

});

//FROM: http://danzel.github.io/Leaflet.utfgrid/example/layers.html
L.mapbox.accessToken = 'pk.eyJ1IjoiZmNjIiwiYSI6IlA5cThBQTQifQ.EbifLm_7JkQ1uI_0_qYEAA';

function story() {
    $("#maptitle").empty();
    $("#freqsTD").empty();

    $("#legend_bbs").empty().addClass('hide');
    $("#legend_obesity").empty().addClass('hide');
    $("#legend_pop").empty().addClass('hide');
    $("#legend_infoaccess").empty().addClass('hide');
    $("#legend_physicians").empty().addClass('hide');
    clearMap();

    function updateMapTitle(title) { 
      $("#maptitle").empty();
      $("#maptitle").append('<strong class="maptitle">' + title + '</strong>');

      
    }

    $('.list-connectivityMaps').on('click', 'input[type="radio"]', function() {
     var title = $(this).next('label').text();
      updateMapTitle(title);
    });

    $('.list-connectivityMaps').on('click', '.controlButton', function() {
        var title = $(this).text();
          updateMapTitle(title);
    });
};


function explore() {
    $("#legend_bbs").empty().addClass('hide');
    $("#legend_obesity").empty().addClass('hide');
    $("#legend_pop").empty().addClass('hide');
    $("#legend_infoaccess").empty().addClass('hide');
    $("#legend_physicians").empty().addClass('hide');
    $("#legend_pcpratio").empty().addClass('hide');

    $("#maptitle").empty();
    $("#notes").empty();
    renderIntro();
    renderNavMenu("explore");
    $("#freqsTD").empty();
    $("#freqsTD").append("<table><tr><td class='tr2'><div id='freqandcounties'><div id='rpc' onClick='resetPopCount()'>RESET POP. COUNTER</div><div id='popfreq'></div><hr><div id='popcounties'><strong>Counties Selected:</strong></div></div></td></tr></table>");

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

var map = L.map('map',  {
    detectRetina: true,
    zoomControl: true,
    scrollWheelZoom: false
}).setView([37.95, -79.5], 7);

L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10').addTo(map);

var vamap = L.mapbox.tileLayer('fcc.wnbwewmi');
var vamap_gridLayer = L.mapbox.gridLayer('fcc.wnbwewmi');
var interactiveLayerGroupVamap = L.layerGroup([
    vamap,
    vamap_gridLayer
]);
interactiveLayerGroupVamap.addTo(map);
L.control.scale().addTo(map);
vamap_gridLayer.on('click', function(e) {
    if (e.data) {
        printVamapInfo(JSON.parse(JSON.stringify(e.data)));
        document.getElementById('click').innerHTML = 'click: ' + JSON.stringify(e.data);
    } else {
        document.getElementById('click').innerHTML = 'click: nothing';
    }
});

var populationcount = 0;
var _selectedCounties = []

function printVamapInfo(thisObject) {
    var counties_match = 0;
    var countyName = JSON.parse(JSON.stringify(thisObject)).countyname;

    for (i = 0; i <= _selectedCounties.length; i++) {
        if (countyName == _selectedCounties[i]) {
            counties_match = 1;
        };
    };
    if (counties_match == 0) {
        _selectedCounties[_selectedCounties.length] = countyName;
        populationcount = populationcount + parseInt(JSON.parse(JSON.stringify(thisObject)).pop);
        $("#popcounties").append(countyName + " | " + JSON.parse(JSON.stringify(thisObject)).pop + "<br>");
        $("#popfreq").empty();
        $("#popfreq").append(populationcount);
    };
    counties_match = 0;
};

function resetPopCount() {
    populationcount = 0;
    _selectedCounties = [];
    $("#popfreq").empty();
    $("#popcounties").empty();
};


/* BBS */
var BBS = L.mapbox.tileLayer('fcc.icrw9udi');
var BBS_gridLayer = L.mapbox.gridLayer('fcc.icrw9udi');
var interactiveLayerGroupBBS = L.layerGroup([
    BBS,
    BBS_gridLayer
]);

BBS_gridLayer.on('click', function(e) {
    if (e.data) {
        printBBSInfo(JSON.parse(JSON.stringify(e.data)));
        document.getElementById('click').innerHTML = 'click: ' + JSON.stringify(e.data);
    } else {
        document.getElementById('click').innerHTML = 'click: nothing';
    }
});
BBS_gridLayer.on('mouseover', function(e) {
    if (e.data) {
        var this_mbps = JSON.parse(JSON.stringify(e.data)).mostcommon;
        var mbps;
        if (this_mbps == 2) {
            mbps = ">200 kbps and <768 kbps";
        } else if (this_mbps == 3) {
            mbps = ">768 kbps and <1.5 mbps"
        } else if (this_mbps == 4) {
            mbps = ">1.5 mbps and <3 mbps"
        } else if (this_mbps == 5) {
            mbps = ">3 mbps and <6 mbps"
        } else if (this_mbps == 6) {
            mbps = ">6 mbps and <10 mbps"
        } else if (this_mbps == 7) {
            mbps = ">10 mbps and <25 mbps"
        } else if (this_mbps == 8) {
            mbps = ">25 mbps and <50 mbps"
        } else if (this_mbps == 9) {
            mbps = ">50 mbps and <100 mbps"
        } else if (this_mbps == 10) {
            mbps = ">100 mbps and <1 gbps"
        } else if (this_mbps == 11) {
            mbps = ">1 gbps"
        };

        $("#mainoutput").empty();
        $("#mainoutput").append("<div class='thisoutput'><strong>County: </strong>" + JSON.parse(JSON.stringify(e.data)).geographyn + "<br><strong>Most Common Download Speed (Mbps): </strong>" + mbps + "</div>");
        document.getElementById('hover').innerHTML = 'hover: ' + JSON.stringify(e.data);
    } else {
        document.getElementById('hover').innerHTML = 'hover: nothing';
    }
});

BBS_gridLayer.on('mouseout', function(e) {
    $("#mainoutput").empty();
});

/* OBESITY */
var obesity = L.mapbox.tileLayer('fcc.ke2ymn29', {
    opacity: 0.75
});
var obesity_gridLayer = L.mapbox.gridLayer('fcc.ke2ymn29');

var interactiveLayerGroupObesity = L.layerGroup([
    obesity,
    obesity_gridLayer
]);

obesity_gridLayer.on('click', function(e) {
    if (e.data) {
        document.getElementById('click').innerHTML = 'click: ' + JSON.stringify(e.data);
        printObesityInfo(JSON.parse(JSON.stringify(e.data)));
    } else {
        document.getElementById('click').innerHTML = 'click: nothing';
    }
});
obesity_gridLayer.on('mouseover', function(e) {
    if (e.data) {
        $("#mainoutput").empty();
        $("#mainoutput").append("<div class='thisoutput'><strong>County: </strong>" + JSON.parse(JSON.stringify(e.data)).NAME + "<br><strong>Obesity Prevalence (%): </strong>" + JSON.parse(JSON.stringify(e.data)).USAObesi_2 + "</div>");
        document.getElementById('hover').innerHTML = 'hover: ' + JSON.stringify(e.data);
    } else {
        document.getElementById('hover').innerHTML = 'hover: nothing';
    }
});
obesity_gridLayer.on('mouseout', function(e) {
    $("#mainoutput").empty();
});

/* PCP RATIO */
var pcpratio = L.mapbox.tileLayer('fcc.jvwpnwmi', {
    opacity: 0.75
});
var pcpratio_gridLayer = L.mapbox.gridLayer('fcc.jvwpnwmi');

var interactiveLayerGroupPCP = L.layerGroup([
    pcpratio,
    pcpratio_gridLayer
]);

pcpratio_gridLayer.on('click', function(e) {
    if (e.data) {
        document.getElementById('click').innerHTML = 'click: ' + JSON.stringify(e.data);
        printPopInfo(JSON.parse(JSON.stringify(e.data)));
    } else {
        document.getElementById('click').innerHTML = 'click: nothing';
    }
});
pcpratio_gridLayer.on('mouseover', function(e) {
    if (e.data) {
        $("#mainoutput").empty();
        $("#mainoutput").append("<div class='thisoutput'><strong>County: </strong>" + JSON.parse(JSON.stringify(e.data)).countyname + "<br><strong>Number of PCPs in County: </strong>" + JSON.parse(JSON.stringify(e.data)).pcp_num + "<br><strong>PCP Ratio: </strong>" + JSON.parse(JSON.stringify(e.data)).pcp_ratio + "</div>");
        document.getElementById('hover').innerHTML = 'hover: ' + JSON.stringify(e.data);
    } else {
        document.getElementById('hover').innerHTML = 'hover: nothing';
    }

});
pcpratio_gridLayer.on('mouseout', function(e) {
    $("#mainoutput").empty();
});

/* POPULATION */
var pop = L.mapbox.tileLayer('fcc.n2iysyvi', {
    opacity: 0.75
});
var pop_gridLayer = L.mapbox.gridLayer('fcc.n2iysyvi');

var interactiveLayerGroupPop = L.layerGroup([
    pop,
    pop_gridLayer
]);

pop_gridLayer.on('click', function(e) {
    if (e.data) {
        document.getElementById('click').innerHTML = 'click: ' + JSON.stringify(e.data);
        printPopInfo(JSON.parse(JSON.stringify(e.data)));
    } else {
        document.getElementById('click').innerHTML = 'click: nothing';
    }
});
pop_gridLayer.on('mouseover', function(e) {
    if (e.data) {
        $("#mainoutput").empty();
        $("#mainoutput").append("<div class='thisoutput'><strong>County: </strong>" + JSON.parse(JSON.stringify(e.data)).countyname + "<br><strong>Population: </strong>" + JSON.parse(JSON.stringify(e.data)).pop + "</div>");
        document.getElementById('hover').innerHTML = 'hover: ' + JSON.stringify(e.data);
    } else {
        document.getElementById('hover').innerHTML = 'hover: nothing';
    }
});
pop_gridLayer.on('mouseout', function(e) {
    $("#mainoutput").empty();
});

/* INFO ACCESS */
function infoAccess_LC() {
    $("#output").append("layerStatus.infoAccess: " + layerStatus.infoAccess);
    if (layerStatus.infoAccess == 1) {
        layerStatus.infoAccess = 0;
        $("#legend_infoaccess").empty().addClass('hide');
        $("#output").append(" | layerStatus.infoAccess=1");
        $("#infoAccessdiv-outter").empty();
        $("#infoAccessdiv-outter").append("<div id='infoAccessdiv' class='inactive'>Use of online resources: chronic disease information</div>");
        map.removeLayer(tileLayers.infoAccess);
        map.removeLayer(gridLayers.infoAccess);
    } else {
        layerStatus.infoAccess = 1;
        //$("#legend_infoaccess").append("<strong>Access to Chronic Disease Information (score)</strong><br><img src='images/infoaccess.png' width='156' height='57'>")
        $("#legend_infoaccess").append("<strong>Access to Chronic Disease Information (score)</strong><br>");
        legendCircle($("#legend_infoaccess"), legendInfoAccess);

        $("#output").append(" | layerStatus.infoAccess=0");
        $("#infoAccessdiv-outter").empty();
        $("#infoAccessdiv-outter").append("<div id='infoAccessdiv' class='active'>Use of online resources: chronic disease information</div>");
        tileLayers.infoAccess.addTo(map).bringToFront();
        gridLayers.infoAccess.addTo(map);

        gridLayers.infoAccess.on('click', function(e) {
            if (e.data) {
                document.getElementById('click').innerHTML = 'click: ' + JSON.stringify(e.data);
            } else {
                document.getElementById('click').innerHTML = 'click: nothing';
            }
        });
        gridLayers.infoAccess.on('mouseover', function(e) {
            if (e.data) {
                $("#mainoutput").empty();
                $("#mainoutput").append("<div class='thisoutput'><strong>City: </strong>" + JSON.parse(JSON.stringify(e.data)).cities + "<br><strong>Chronic Disease Information Access Score: </strong>" + JSON.parse(JSON.stringify(e.data)).relative_s + "</div>");
                document.getElementById('hover').innerHTML = 'hover: ' + JSON.stringify(e.data);
            } else {
                document.getElementById('hover').innerHTML = 'hover: nothing';
            }
        });
        gridLayers.infoAccess.on('mouseout', function(e) {
            $("#mainoutput").empty();
        });
    };
};

/* PROVIDERS */
function providers_LC() {
    $("#output").append("layerStatus.providers: " + layerStatus.providers);
    if (layerStatus.providers == 1) {
        layerStatus.providers = 0;
        $("#legend_physicians").empty().addClass('hide');
        $("#output").append(" | layerStatus.providers=1");
        $("#providersdiv-outter").empty();
        $("#providersdiv-outter").append("<div id='providersdiv' class='inactive'>Numbers of Providers by County</div>");
        map.removeLayer(tileLayers.providers);
        map.removeLayer(gridLayers.providers);

    } else {
        layerStatus.providers = 1;
        //$("#legend_physicians").append("<strong>Number of Physicians</strong><br><img src='images/physicians.png' width='174' height='63'>")
        $("#legend_physicians").append("<strong>Number of Physicians</strong><br>");
        legendCircle($("#legend_physicians"), legendPhysicians);

        $("#output").append(" | layerStatus.providers=0");
        $("#providersdiv-outter").empty();
        $("#providersdiv-outter").append("<div id='providersdiv' class='active'>Numbers of Providers by County</div>");
        tileLayers.providers.addTo(map).bringToFront();
        gridLayers.providers.addTo(map);

        gridLayers.providers.on('click', function(e) {
            if (e.data) {
                document.getElementById('click').innerHTML = 'click: ' + JSON.stringify(e.data);
            } else {
                document.getElementById('click').innerHTML = 'click: nothing';
            }
        });
        gridLayers.providers.on('mouseover', function(e) {
            if (e.data) {
                $("#mainoutput").empty();
                $("#mainoutput").append("<div class='thisoutput'><strong>City: </strong>" + JSON.parse(JSON.stringify(e.data)).city + "<br><strong>Physicians: </strong>" + JSON.parse(JSON.stringify(e.data)).providers + "</div>");
                document.getElementById('hover').innerHTML = 'hover: ' + JSON.stringify(e.data);
            } else {
                document.getElementById('hover').innerHTML = 'hover: nothing';
            }
        });
        gridLayers.providers.on('mouseout', function(e) {
            $("#mainoutput").empty();
        });
    };
};


/* LAYERS CONTROLS */
var maps = {
    infoAccess: 'fcc.1vfmkj4i',
    providers: 'fcc.vvn7y14i',
    pop: 'fcc.n2iysyvi'
};
var tileLayers = {
    infoAccess: L.mapbox.tileLayer(maps.infoAccess),
    providers: L.mapbox.tileLayer(maps.providers)
};
var gridLayers = {
    infoAccess: L.mapbox.gridLayer(maps.infoAccess),
    providers: L.mapbox.gridLayer(maps.providers),
    pop: L.mapbox.gridLayer(maps.pop)
};
var gridControlLayers = {
    infoAccess: L.mapbox.gridControl(gridLayers.infoAccess),
    providers: L.mapbox.gridControl(gridLayers.providers),
    pop: L.mapbox.gridControl(gridLayers.pop)
};
var layerStatus = {
    infoAccess: 0,
    providers: 0,
    ObesityLayer: 0,
    BBSLayer: 0,
    PopLayer: 0,
    PCPRatioLayer: 0
};

/* ADD/REMOVE FUNCTIONS */
function clearMap() {
    map.removeLayer(interactiveLayerGroupObesity);
    map.removeLayer(interactiveLayerGroupBBS);
    map.removeLayer(interactiveLayerGroupPop);
    map.removeLayer(interactiveLayerGroupPCP);

    map.removeLayer(tileLayers.providers);
    map.removeLayer(gridLayers.providers);
    map.removeLayer(tileLayers.infoAccess);
    map.removeLayer(gridLayers.infoAccess);

    layerStatus.infoAccess = 0;
    layerStatus.providers = 0;
    layerStatus.ObesityLayer = 0;
    layerStatus.BBSLayer = 0;
    layerStatus.PopLayer = 0;
    layerStatus.PCPRatioLayer = 0;

    $("#legend_bbs").empty().addClass('hide');
    $("#legend_obesity").empty().addClass('hide');
    $("#legend_pop").empty().addClass('hide');
    $("#legend_infoaccess").empty().addClass('hide');
    $("#legend_physicians").empty().addClass('hide');
    $("#legend_pcpratio").empty().addClass('hide');
};


function ObesityLayer_LC() {
    if (layerStatus.ObesityLayer == 0) {
        interactiveLayerGroupObesity.addTo(map);
        layerStatus.ObesityLayer = 1;
        //$("#legend_obesity").append("<strong>Obesity Prevalence (%)</strong><br><img src='images/obesity.png' width='221' height='48'>")
        $("#legend_obesity").append("<strong>Obesity Prevalence (%)</strong><br>");
        legendSquare($("#legend_obesity"), legendObesity);
    } else {
        map.removeLayer(interactiveLayerGroupObesity);
        layerStatus.ObesityLayer = 0;
        $("#legend_obesity").empty().addClass('hide');
    };
};

function PCPRatio_LC() {
    if (layerStatus.PCPRatioLayer == 0) {
        interactiveLayerGroupPCP.addTo(map);
        layerStatus.PCPRatioLayer = 1;
        //$("#legend_pcpratio").append("<strong>PCP Ratio</strong><br><img src='images/pcp_ratio.png' width='221' height='48'>")
        $("#legend_pcpratio").append("<strong>PCP Ratio</strong><br>");
        legendSquare($("#legend_pcpratio"), legendPCPRatio);
    } else {
        map.removeLayer(interactiveLayerGroupPCP);
        layerStatus.PCPRatioLayer = 0;
        $("#legend_pcpratio").empty().addClass('hide');
    };
};


function BBSLayer_LC() {
    if (layerStatus.BBSLayer == 0) {
        interactiveLayerGroupBBS.addTo(map);
        layerStatus.BBSLayer = 1;
        //$("#legend_bbs").append("<strong>Most Common Download Speed (Mbps)</strong><br><img src='images/connectivity2.png' width='200' height='44'>")
        $("#legend_bbs").append("<strong>Most Common Download Speed (Mbps)</strong><br>");
        legendSquare($("#legend_bbs"), legendBBS);
    } else {
        map.removeLayer(interactiveLayerGroupBBS);
        layerStatus.BBSLayer = 0;
        $("#legend_bbs").empty().addClass('hide');
    };

};

function PopLayer_LC() {
    if (layerStatus.PopLayer == 0) {
        interactiveLayerGroupPop.addTo(map);
        layerStatus.PopLayer = 1;
        //$("#legend_pop").append("<strong>Population Distribution</strong><br><img src='images/pop.png' width='192' height='56'>")
        $("#legend_pop").append("<strong>Population Distribution</strong><br>");
        legendSquare($("#legend_pop"), legendPop);
    } else {
        map.removeLayer(interactiveLayerGroupPop);
        layerStatus.PopLayer = 0;
        $("#legend_pop").empty();
    };
};

var thisLayer = "";

function getRidOfPreviousLayers(callingLayer) {
    if (thisLayer == "") {
        thisLayer = callingLayer;
    } else if (thisLayer == callingLayer) {
        thisLayer = "";
    } else {
        if (thisLayer == "ProvidersxInfoAccess") {
            ProvidersxInfoAccess_rid()
        } else if (thisLayer == "ProvidersxBBS") {
            ProvidersxBBS_rid()
        } else if (thisLayer == "ProvidersxObesity") {
            ProvidersxObesity_rid()
        } else if (thisLayer == "ProvidersxPop") {
            ProvidersxPop_rid()
        } else if (thisLayer == "InfoAccessxBBS") {
            InfoAccessxBBS_rid()
        } else if (thisLayer == "InfoAccessxObesity") {
            InfoAccessxObesity_rid()
        } else if (thisLayer == "InfoAccessxPop") {
            InfoAccessxPop_rid()
        } else if (thisLayer == "Pop") {
            Pop_rid()
        } else if (thisLayer == "BBS") {
            BBSLayer_rid()
        } else if (thisLayer == "Providers") {
            Providers_rid()
        } else if (thisLayer == "InfoAccess") {
            InfoAccess_rid()
        } else if (thisLayer == "Obesity") {
            ObesityLayer_rid()
        } else if (thisLayer == "PCPRatio") {
            PCPRatio_rid()
        };
        thisLayer = callingLayer;
    };
};


function ObesityLayer_LC_LC() {
    getRidOfPreviousLayers("Obesity");
    ObesityLayer_LC();
};

function InfoAccess_LC_LC() {
    getRidOfPreviousLayers("InfoAccess");
    infoAccess_LC();
};

function PopLayer_LC_LC() {
    getRidOfPreviousLayers("Pop");
    PopLayer_LC();
};

function PCPRatio_LC_LC() {
    getRidOfPreviousLayers("PCPRatio");
    PCPRatio_LC();
};

function BBSLayer_LC_LC() {
    getRidOfPreviousLayers("BBS");
    BBSLayer_LC();
};

function Providers_LC_LC() {
    getRidOfPreviousLayers("Providers");
    providers_LC();
};

function ProvidersxInfoAccess_LC() {
    getRidOfPreviousLayers("ProvidersxInfoAccess");
    providers_LC();
    infoAccess_LC();
};

function ProvidersxBBS_LC() {
    getRidOfPreviousLayers("ProvidersxBBS");
    BBSLayer_LC();
    providers_LC();
};

function ProvidersxObesity_LC() {
    getRidOfPreviousLayers("ProvidersxObesity");
    ObesityLayer_LC();
    providers_LC();
};

function ProvidersxPop_LC() {
    getRidOfPreviousLayers("ProvidersxPop");
    PopLayer_LC();
    providers_LC();
};

function InfoAccessxBBS_LC() {
    getRidOfPreviousLayers("InfoAccessxBBS");
    BBSLayer_LC();
    infoAccess_LC();
};

function InfoAccessxObesity_LC() {
    getRidOfPreviousLayers("InfoAccessxObesity");
    ObesityLayer_LC();
    infoAccess_LC();
};

function InfoAccessxPop_LC() {
    getRidOfPreviousLayers("InfoAccessxPop");
    PopLayer_LC();
    infoAccess_LC();
};


function PCPRatio_rid() {
    clearMap()
};

function ObesityLayer_rid() {
    clearMap()
};

function InfoAccess_rid() {
    clearMap()
};

function Pop_rid() {
    clearMap()
};

function BBSLayer_rid() {
    clearMap()
};

function Providers_rid() {
    clearMap()
};

function ProvidersxInfoAccess_rid() {
    clearMap()
};

function ProvidersxBBS_rid() {
    clearMap()
};

function ProvidersxObesity_rid() {
    clearMap()
};

function ProvidersxPop_rid() {
    clearMap()
};

function InfoAccessxBBS_rid() {
    clearMap()
};

function InfoAccessxObesity_rid() {
    clearMap()
};

function InfoAccessxPop_rid() {
    clearMap()
};

/* PRINT FUNCTIONS */
function printBBSInfo(thisObject) {
    var this_mbps = JSON.parse(JSON.stringify(thisObject)).mostcommon;
    var mbps;
    if (this_mbps == 2) {
        mbps = ">200 kbps and <768 kbps";
    } else if (this_mbps == 3) {
        mbps = ">768 kbps and <1.5 mbps"
    } else if (this_mbps == 4) {
        mbps = ">1.5 mbps and <3 mbps"
    } else if (this_mbps == 5) {
        mbps = ">3 mbps and <6 mbps"
    } else if (this_mbps == 6) {
        mbps = ">6 mbps and <10 mbps"
    } else if (this_mbps == 7) {
        mbps = ">10 mbps and <25 mbps"
    } else if (this_mbps == 8) {
        mbps = ">25 mbps and <50 mbps"
    } else if (this_mbps == 9) {
        mbps = ">50 mbps and <100 mbps"
    } else if (this_mbps == 10) {
        mbps = ">100 mbps and <1 gbps"
    } else if (this_mbps == 11) {
        mbps = ">1 gbps"
    };

};

function printObesityInfo(thisObject) {
    var _fips = [51001, 51003, 51005, 51007, 51009, 51011, 51013, 51015, 51017, 51019, 51021, 51023, 51025, 51027, 51029, 51031, 51033, 51035, 51036, 51037, 51041, 51043, 51045, 51047, 51049, 51051, 51053, 51057, 51059, 51061, 51063, 51065, 51067, 51069, 51071, 51073, 51075, 51077, 51079, 51081, 51083, 51085, 51087, 51089, 51091, 51093, 51095, 51097, 51099, 51101, 51103, 51105, 51107, 51109, 51111, 51113, 51115, 51117, 51119, 51121, 51125, 51127, 51131, 51133, 51135, 51137, 51139, 51141, 51143, 51145, 51147, 51149, 51153, 51155, 51157, 51159, 51161, 51163, 51165, 51167, 51169, 51171, 51173, 51175, 51177, 51179, 51181, 51183, 51185, 51187, 51191, 51193, 51195, 51197, 51199, 51510, 51515, 51520, 51530, 51540, 51550, 51570, 51580, 51590, 51595, 51600, 51610, 51620, 51630, 51640, 51650, 51660, 51670, 51678, 51680, 51683, 51685, 51690, 51700, 51710, 51720, 51730, 51735, 51740, 51750, 51760, 51770, 51775, 51790, 51800, 51810, 51820, 51830, 51840];
    var _fipsobjects = [va_51001, va_51003, va_51005, va_51007, va_51009, va_51011, va_51013, va_51015, va_51017, va_51019, va_51021, va_51023, va_51025, va_51027, va_51029, va_51031, va_51033, va_51035, va_51036, va_51037, va_51041, va_51043, va_51045, va_51047, va_51049, va_51051, va_51053, va_51057, va_51059, va_51061, va_51063, va_51065, va_51067, va_51069, va_51071, va_51073, va_51075, va_51077, va_51079, va_51081, va_51083, va_51085, va_51087, va_51089, va_51091, va_51093, va_51095, va_51097, va_51099, va_51101, va_51103, va_51105, va_51107, va_51109, va_51111, va_51113, va_51115, va_51117, va_51119, va_51121, va_51125, va_51127, va_51131, va_51133, va_51135, va_51137, va_51139, va_51141, va_51143, va_51145, va_51147, va_51149, va_51153, va_51155, va_51157, va_51159, va_51161, va_51163, va_51165, va_51167, va_51169, va_51171, va_51173, va_51175, va_51177, va_51179, va_51181, va_51183, va_51185, va_51187, va_51191, va_51193, va_51195, va_51197, va_51199, va_51510, va_51515, va_51520, va_51530, va_51540, va_51550, va_51570, va_51580, va_51590, va_51595, va_51600, va_51610, va_51620, va_51630, va_51640, va_51650, va_51660, va_51670, va_51678, va_51680, va_51683, va_51685, va_51690, va_51700, va_51710, va_51720, va_51730, va_51735, va_51740, va_51750, va_51760, va_51770, va_51775, va_51790, va_51800, va_51810, va_51820, va_51830, va_51840];

    var thisGEOID = thisObject.GEOID;

};

function printPopInfo(thisObject) {
    var thisState = thisObject.state;
};

function legendSquare(container, legendData) {
    var i = 0,
        size = legendData.colors.length,
        span = '',
        width = 250 / size + 'px';

    for (var i = 0; i < size; i++) {
        span += '<span style="background-color: ' + legendData.colors[i] + '; width: ' + width + '"></span>';
    }

    legendLabel1 = '<span class="legend-label">' + legendData.labels[0] + '</span>';
    legendLabel2 = '<span class="legend-label">' + legendData.labels[1] + '</span>';

    container.append('<div class="legend-sq">' + span + '<div class="label-row">' + legendLabel1 + legendLabel2 + '</div></div>');
    container.removeClass('hide');
}

function legendCircle(container, legendData) {
    var i = 0,
        size = legendData.colors.length,
        span = '',
        height = 60,
        width = 250 / size + 'px';

    for (var i = 0; i < size; i++) {
        height = height - 10;
        span += '<span class="circle" style="background-color: ' + legendData.colors[i] + '; height: ' + height + 'px; width: ' + height + 'px"></span>';
    }

    legendLabel1 = '<span class="legend-label">' + legendData.labels[0] + '</span>';
    legendLabel2 = '<span class="legend-label">' + legendData.labels[1] + '</span>';

    container.append('<div class="legend-circle">' + span + '<div class="label-row">' + legendLabel1 + legendLabel2 + '</div></div>');
    container.removeClass('hide');
}
