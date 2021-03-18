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
    "esri/widgets/FeatureTemplates"

 ], function(esriConfig, Map, MapView, FeatureLayer, Search, QueryTask, Query, FeatureTable, LayerList, watchUtils, Expand,
  BasemapGallery, domConstruct, dom, on, watchUtils, Editor, CreateWorkflow, UpdateWorkflow, Locate, FeatureForm, FeatureTemplates) {

  //ADD LOAD SYMBOL TILL MAMP AND FEATURES ARE FULLY LOADED???????

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

  //school district feature layer (points)
  const wetlandsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/project2for777/FeatureServer/4"
  });

  map.add(wetlandsLayer);

  //school district feature layer (points)
  const pondsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/project2for777/FeatureServer/3"
  });

  map.add(pondsLayer);

  //school district feature layer (points)
  const trailsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/project2for777/FeatureServer/1"
  });

  map.add(trailsLayer);

  //schools feature layer (points)
  const burrowsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/project2for777/FeatureServer/5"
  });

  map.add(burrowsLayer);

  //school district feature layer (points)
  const infrastructureLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/project2for777/FeatureServer/0"
  });

  map.add(infrastructureLayer);

  //school district feature layer (polygons)
  const standsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/project2for777/FeatureServer/2"
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
  view.ui.add(locate, "top-left");

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

  //adds expand button to map TRY TO CHANGE ICON AND WORDS OF EXPAND BOX
  editorExpand = new Expand({
   expandIconClass: "esri-icon-layer-list",  // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
   // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
   view: view,
   content: editor,
   expandTooltip: "Add Crayfish Burrow Location"
  });

  view.ui.add(editorExpand, "top-left");

  //create node for content panel
  var node = domConstruct.create("div", {
    className: "myPanel",
    innerHTML: "Select files: <input type='file' multiple><br>" +
    "<input type='submit' id='btnSubmit'>"
  });

  const addAttach = new Expand({
   view: view,
   expanded: false,
   expandTooltip: "Add Attachment",
   content: node
  });

  view.ui.add(addAttach, "top-left");

  watchUtils.whenTrueOnce(addAttach, 'expanded', function(){
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

  //pop up for school district being searched
  var standsSearch = new FeatureLayer({
   url:
     "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/project2for777/FeatureServer/2",
   popupTemplate: {
     // autocasts as new PopupTemplate()
     title: "Stand Number {STAND} </br>Cover Type: {Cover_type}",
     overwriteActions: true
   }
  });

  //change place holder for school districts
  //adding search widget for school districts to map (addresses too?)
  //fix pops up for trails, schools, and addressess to display name and which school district it SHOULD fall within
  var searchWidget = new Search({
    view: view,
    allPlaceholder: "Enter School District, Public Library, Public School, or Address",
    sources: [
      {
        layer: standsSearch,
        searchFields: ["STAND"],
        displayField: "STAND",
        exactMatch: false,
        outFields: ["STAND", "Cover_type"],
        name: "SANC Management Stands",
        placeholder: "example: 3708"
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

    ]

  });

  // Add the search widget to the top left corner of the view
  view.ui.add(searchWidget, {
    position: "top-right"
  });

});
