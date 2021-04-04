require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Search",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/widgets/FeatureTable",
    "esri/widgets/LayerList",
    "esri/core/watchUtils",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "dojo/dom-construct",
    "dojo/dom",
    "dojo/on",
    "esri/core/watchUtils",
    "esri/widgets/Editor",
    "esri/widgets/Editor/CreateWorkflow",
    "esri/widgets/Editor/UpdateWorkflow",
    "esri/widgets/Locate",
    "esri/widgets/FeatureForm",
    "esri/widgets/FeatureTemplates",
    "dojo/dom-class",
    "esri/widgets/Popup",
    "esri/PopupTemplate",
    "esri/widgets/Home"

 ], function(esriConfig, Map, MapView, FeatureLayer, Search, QueryTask, Query, FeatureTable, LayerList, watchUtils, Expand,
  BasemapGallery, domConstruct, dom, on, watchUtils, Editor, CreateWorkflow, UpdateWorkflow, Locate, FeatureForm, FeatureTemplates, domClass,  Popup, PopupTemplate, Home) {

  esriConfig.apiKey = "AAPK09708988961a422ea5b425d3b6f0c29cdflrfU10ugyKjgMqzJPof0_5o4dCILkXhVFEdLunqo1Xyuej9fSD_GHhbvlrYpNK";

  //creating base map
  const map = new Map({
   basemap: "arcgis-topographic"
  });

  //creating map view
  const view = new MapView({
   container: "viewDiv",
   map: map,
   center: [-87.890, 43.1744], // longitude, latitude
   zoom: 15
  }
  );

  var homeBtn = new Home({
    view: view
  });

  const wetlandsRenderer = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      size: 6,
      color: "#038C73",
      outline: {
        width: 0.1,
        color: "black"
      }
    }
  };

  //school district feature layer (points)
  const wetlandsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/project2for777/FeatureServer/4",
    renderer: wetlandsRenderer,
    opacity: 0.1
  });

  map.add(wetlandsLayer);

  const pondsRenderer = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      size: 6,
      color: "#8AC5C0",
      outline: {
        width: 0.1,
        color: "black"
      }
    }
  };

  //school district feature layer (points)
  const pondsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/project2for777/FeatureServer/3",
    renderer: pondsRenderer,
    opacity: 0.1
  });

  map.add(pondsLayer);

  // Symbol for freeways
  const aspSym = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: "#000000",
    width: "1px",
    style: "solid"
  };

  // Symbol for U.S. Highways
  const boaSym = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: "#0D98BA",
    width: "1px",
    style: "solid"
  };

  // Symbol for other major highways
  const combSym = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: "#DC9456",
    width: "1px",
    style: "solid"
  };

  // Symbol for freeways
  const crusSym = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: "#333333",
    width: "1px",
    style: "short-dot"
  };

  // Symbol for U.S. Highways
  const resSym = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: "#68991C",
    width: "1px",
    style: "short-dot"
  };

  // Symbol for other major highways
  const uniSym = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: "#68991C",
    width: "1px",
    style: "solid"
  };

  // Symbol for other major highways
  const wooSym = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: "#8B4513",
    width: "1px",
    style: "solid"
  };

  //create trail types
  const trailsRenderer = {
    type: "unique-value",
    legendOptions: {
            title: "Trail Types"
          },
    defaultSymbol: combSym,
    defaultLabel: "combination",
    field: "Surface_Ty",
    uniqueValueInfos: [
      {
        value: "1", // code for interstates/freeways
        symbol: aspSym,
        label: "asphalt"
      },
      {
        value: "4", // code for U.S. highways
        symbol: boaSym,
        label: "boardwalk"
      },
      {
        value: "2", // code for interstates/freeways
        symbol: crusSym,
        label: "crushed stone"
      },
      {
        value: "6", // code for U.S. highways
        symbol: resSym,
        label: "research trail"
      },
      {
        value: "3", // code for interstates/freeways
        symbol: uniSym,
        label: "unimproved"
      },
      {
        value: "5", // code for U.S. highways
        symbol: wooSym,
        label: "wooden structure"
      }
    ]
  };

  //school district feature layer (points)
  const trailsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/project2for777/FeatureServer/1",
    renderer: trailsRenderer,
    opacity: 1,
  });

  map.add(trailsLayer);

  //create schools icon
  const burrowsRenderer = {
    "type": "simple",
    "symbol": {
      "type": "picture-marker",
      "url": "img/crayfish2.png",
      "width": "8px",
      "height": "8px"
    }
  }

  //schools feature layer (points)
  const burrowsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/project2for777/FeatureServer/5",
    renderer: burrowsRenderer
  });
  //hides crayfish burrows layer on page load
  burrowsLayer.visible = false;
  map.add(burrowsLayer);

  //adding icon types for infrastructure
  var infraRenderer = {
    type: "unique-value",  // autocasts as new UniqueValueRenderer()
    legendOptions: {
      title: "Infrastructure Types"
    },
    field: "TYPE_",  // values returned by this function will
                       // be used to render features by type
    uniqueValueInfos: [
      {
        value: "BW",  // features labeled as "High"
        label: "boardwalk",
        symbol: {
          "type": "picture-marker",
          "url": "img/boardwalk.png",
          "width": "12px",
          "height": "12px"
        }
      }, {
        value: "BE",  // features labeled as "Medium"
        label: "bench",
        symbol: {
          "type": "picture-marker",
          "url": "img/bench.png",
          "width": "12px",
          "height": "12px"
        }
      }, {
        value: "DE",  // features labeled as "Low"
        label: "deck",
        symbol: {
          "type": "picture-marker",
          "url": "img/deck.png",
          "width": "12px",
          "height": "12px"
        }
      }, {
        value: "FO",  // features labeled as "High"
        label: "fountain",
        symbol: {
          "type": "picture-marker",
          "url": "img/fountain.png",
          "width": "12px",
          "height": "12px"
        }
      }, {
        value: "GT",  // features labeled as "Medium"
        label: "gate",
        symbol: {
          "type": "picture-marker",
          "url": "img/gate.png",
          "width": "12px",
          "height": "12px"
        }
      }, {
        value: "PL",  // features labeled as "Low"
        label: "plaque",
        symbol: {
          "type": "picture-marker",
          "url": "img/plaque.png",
          "width": "12px",
          "height": "12px"
        }
      }, {
        value: "TR",  // features labeled as "High"
        label: "trash/recycing",
        symbol: {
          "type": "picture-marker",
          "url": "img/trash.png",
          "width": "12px",
          "height": "12px"
        }
      }, {
        value: "TW",  // features labeled as "Medium"
        label: "tower",
        symbol: {
          "type": "picture-marker",
          "url": "img/tower.png",
          "width": "16px",
          "height": "16px"
        }
      }, {
        value: "VI",  // features labeled as "Low"
        label: "vista",
        symbol: {
          "type": "picture-marker",
          "url": "img/vista.png",
          "width": "12px",
          "height": "12px"
        }
      }, {
        value: "WP",  // features labeled as "High"
        label: "sign",
        symbol: {
          "type": "picture-marker",
          "url": "img/sign.png",
          "width": "12px",
          "height": "12px"
        }
      }, {
        value: "BR",  // features labeled as "Medium"
        label: "bridge",
        symbol: {
          "type": "picture-marker",
          "url": "img/bridge.png",
          "width": "12px",
          "height": "12px"
        }
      }
    ]
  };

  //school district feature layer (points)
  const infrastructureLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/project2for777/FeatureServer/0",
    renderer: infraRenderer
  });

  map.add(infrastructureLayer);

  // Define a pop-up for stands
  const popupStands = {
    "title": "Stand Number {STAND} </br>Habitat Type: {cover_grou}"
  }

  const standsRenderer = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      size: 6,
      color: "#8C2703",
      outline: {
        color: [128, 128, 128, 0.5],
        width: "0.5px"
      }
    }
  };

  //school district feature layer (polygons)
  const standsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/project2for777/FeatureServer/2",
    renderer: standsRenderer,
    opacity: 0.2,
    outFields: ["STAND","cover_grou"],
    popupTemplate: popupStands
  });

  map.add(standsLayer, 0);

  //create location widget
  const locate = new Locate({
    view: view,
    useHeadingEnabled: false,
    goToOverride: function(view, options) {
      options.target.scale = 1500;
      return view.goTo(options.target);
    }
  });

/*
  // New FeatureForm and set its layer to Crayfish Burrows FeatureLayer.
  const featureForm = new FeatureForm({
    container: "formDiv",
    layer: burrowsLayer,
    fieldConfig: [
      {
        name: "STATUS",
        label: "Burrow Status"
      },
      {
        name: "CHIMNEYHEI",
        label: "Chimney Height"
      }
    ],
  });

  // Listen to the feature form's submit event.
  // Update feature attributes shown in the form.
  //for add features "Add" adds the feature, for update feature "Update" updates the feature
  featureForm.on("submit", function() {
    if (editFeature) {
      // Grab updated attributes from the form.
      const updated = featureForm.getValues();

      // Loop through updated attributes and assign
      // the updated values to feature attributes.
      Object.keys(updated).forEach(function(name) {
        editFeature.attributes[name] = updated[name];
      });

      // Setup the applyEdits parameter with updates.
      const edits = {
        updateFeatures: [editFeature]
      };
      applyEditsToIncidents(edits);
      document.getElementById("viewDiv").style.cursor = "auto";
    }
  });
*/

  //create editor panel
  const editor = new Editor({
    view: view,
    label: "Crayfish Burrow",
    allowedWorkflows: ["create", "update"],
    layerInfos: [{
      view: view,
      layer: burrowsLayer,
      fieldConfig: [
        {
          name: "STATUS",
          label: "Burrow Status"
        },
        {
          name: "CHIMNEYHEI",
          label: "Chimney Height"
        }],
      enabled: true, // default is true, set to false to disable editing functionality
      addEnabled: true, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: true, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: true // default is true, set to false to disable the ability to delete features
    },
    {
      view: view,
      layer: wetlandsLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },
    {
      view: view,
      layer: trailsLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },
    {
      view: view,
      layer: pondsLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },
    {
      view: view,
      layer: infrastructureLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },
    {
      view: view,
      layer: standsLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    }
  ]
  });

  //changes text of editor widget, TRY AND FIND WAY TO CHANGE TEXT OF INNER TOOLS
  editor.viewModel.watch('state', function(state){
    if(state === 'ready'){
      setTimeout(function(){
        document.getElementsByClassName('esri-editor__title esri-heading')[0].innerHTML = 'Crayfish Burrow Survey';
        var actions = document.getElementsByClassName("esri-editor__feature-list-name");
        Array.from(actions).forEach(function(ele){
          if(ele.innerHTML==='Edit feature'){
            ele.innerHTML = 'Update/Delete Crayfish Burrow Location';
          }
      	  if(ele.innerHTML==='Add feature'){
            ele.innerHTML = 'Add Crayfish Burrow Location';
          }
        });
      }, 50);
    }
  });

  //create node for content panel
  var node = domConstruct.create("div", {
    className: "myPanel",
    innerHTML: "<b>Application Information:</b><br>" +
    '<a class="none" href="https://www.schlitzaudubon.org/" target="_blank"><img class="SANC" src="img/SANC.png" alt="SANC" style="width:100px;height:75px;"></a>' +
    "<p>Welcome to SANC, the purpose of this application is to allow visitors to maximize the center's resources by understanding the property layout. This will enable our visitors to learn about nature while respecting it at the same time. Our nature center is managed based on property stand areas. Each stand area is displayed on the map and is selectable by search or click to allow users to understand which type of habitat is dominant in that stand area. For more information on SANC, please click the image of the SANC sign above. Please stay on SANC's trails during your visit and thank you for visiting.</p></b>" +
    '<a class="none" href="https://dnr.wi.gov/topic/EndangeredResources/Animals.asp?mode=detail&SpecCode=ICMAL14310" target="_blank"><img class="SANC" src="img/crayfishPic.png" alt="Prairie Crayfish" style="width:100px;height:60px;"></a>' +
    "<p>This application allows vistors to participate in the monitoring of Wisconsin's Threatened Prairie Crayfish species. These crayfish live in burrows in the soil. If you have found a potential crayfish burrow and would like to participate in monitoring, please turn the Crayfish Burrows layer on and add a burrow location to the map by inputting required observations about the burrow. You also have the ability to edit previous burrows you've plotted. For more information about Prairie Crayfish, please click the image of the crayfish above. Thank you for helping to manage this species. </p></b>"
  });

  const purpose = new Expand({
   expandIconClass: "esri-icon-description",
   view: view,
   expanded: false,
   expandTooltip: "Application Purpose",
   content: node
  });

  watchUtils.whenTrueOnce(purpose, 'expanded', function(){
   on(dom.byId("btnSubmit"), 'click', function(){
     console.log("submit clicked");
   });
  });

 //creating basemap widget and setting its container to a div
  var basemapGallery = new BasemapGallery({
   view: view,
   container: document.createElement("div")
  });

  //creates an expand instance and sets content properpty to DOM node of basemap gallery widget with an Esri
  //icon font to represent the content inside the expand widget
  var bgExpand = new Expand({
   view: view,
   content: basemapGallery,
   expandTooltip: "Change Basemap"
  });

  // close the expand whenever a basemap is selected
  basemapGallery.watch("activeBasemap", function() {
   var mobileSize = view.heightBreakpoint === "xsmall" || view.widthBreakpoint === "xsmall";

   if (mobileSize) {
     bgExpand.collapse();
   }
  });

  // Add the expand instance to the ui
  view.ui.add(bgExpand, "top-left");

  //create layer lists widget to make layers visiblie or invisible
  var layerList = new LayerList({
   view: view,
   // executes for each ListItem in the LayerList
   listItemCreatedFunction: function (event) {

     // The event object contains properties of the
     // layer in the LayerList widget.

     var item = event.item;

     if (item.title === "Project2for777 - Wetlands1") {
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Wetlands";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
     if (item.title === "Project2for777 - Ponds1") {
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Ponds";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
     if (item.title === "Project2for777 - Trails1") {
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Trails";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
     if (item.title === "Project2for777 - TrailInfrastructure1") {
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Trail Infrastructure";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
     if (item.title === "Project2for777 - CrayfishBurrows1") {
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Crayfish Burrows";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
     if (item.title === "Project2for777 - ManagementStands1") {
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Management Stands";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
   }
  });

  //adds expand button to map TRY TO CHANGE ICON AND WORDS OF EXPAND BOX
  layerListExpand = new Expand({
   expandIconClass: "esri-icon-layer-list",  // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
   // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
   view: view,
   content: layerList,
   expandTooltip: "Layer Visibility/Layer Legend"
  });

  view.ui.add(layerListExpand, "top-left");

  //adds expand button to map TRY TO CHANGE ICON AND WORDS OF EXPAND BOX
  editorExpand = new Expand({
   expandIconClass: "esri-icon-visible",  // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
   // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
   view: view,
   content: editor,
   expandTooltip: "Threatened Prairie Crayfish Monitoring"
  });

  view.ui.add(editorExpand, "top-left");

  //add location button to map
  view.ui.add(locate, "top-left");

  // Add the home button to the top left corner of the view
  view.ui.add(homeBtn, "top-left");

  //pop up for stand  being searched
  var standsSearch = new FeatureLayer({
   url:
     "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/project2for777/FeatureServer/2",
   popupTemplate: {
     // autocasts as new PopupTemplate()
     title: "Stand Number {STAND} </br>Habitat Type: {cover_grou}",
     overwriteActions: true
   }
  });

  //change place holder for school districts
  //adding search widget for school districts to map (addresses too?)
  //fix pops up for trails, schools, and addressess to display name and which school district it SHOULD fall within
  var searchWidget = new Search({
    view: view,
    allPlaceholder: "Enter Stand Number",
    sources: [
      {
        layer: standsSearch,
        searchFields: ["STAND"],
        displayField: "STAND",
        exactMatch: false,
        outFields: ["STAND", "Cover_grou"],
        name: "SANC Management Stands",
        placeholder: "Stand Search(ex: 67)"
      }
  /*            {
        layer: featureLayerSenators,
        searchFields: ["Name", "Party"],
        suggestionTemplate: "{Name}, Party: {Party}",
        exactMatch: false,
        outFields: ["*"],
        placeholder: "example: Casey",
        name: "Senators",
        zoomScale: 500000,
        resultSymbol: {
          type: "picture-marker", // autocasts as new PictureMarkerSymbol()
          url: "https://developers.arcgis.com/javascript/latest/sample-code/widgets-search-multiplesource/live/images/senate.png",
          height: 36
        }
      } */

    ],
    includeDefaultSources: false

  });

  // Add the search widget to the top left corner of the view
  view.ui.add(searchWidget, {
    position: "top-right"
  });

  view.ui.add(purpose, "top-right");

});
