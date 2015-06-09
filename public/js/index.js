var DelphiData = DelphiData || (function() {
  var self = {};

  // Takes query string and passes it into the database to be processed
  self.getDelphiData = function() {
    console.log("INDEXJS: ------trying to retrieve delphi data------------------");
    console.log("this is the (filter | category | region) we are sending to query");
    console.log(window.filters);
    console.log(window.category);
    console.log(window.regions);

    
    //send AJAX GET request to get delphi data with chosen filters
    $.ajax({
      url: "/delphidata",
      data: {f: window.filters, c: window.category, r: window.regions},

      // THIS IS JUST FOR TESTING, SHOULD PRINT TO WEB CONSOLE
      success: function(data) {
        console.log("Successfully sent the query! Here is your data:");
        console.log(data);
      }
    });
  };

  // initialize
  self.init = function() {
    self.getDelphiData();
  };
  return self;
})();

//button listener for DB selection
$("#side_nav .col-sm-12").click(function() {  
  window.filters = '';
  window.category = '';
  window.regions = [];

  //set global variables to be set which database to be queried
  if ($(this).attr('id') == "Marital_Status_Button") {
    window.category = "Marital Status";
  }
  else {
    window.category = $(this).attr('id').replace('_Button', '');
  }
  console.log(window.category);

}); 


//INTRO JS STARTER
$(document).ready(function() {
  console.log("aye we loadin intros up in here");
  parent.document.getElementById("help_button").onclick = function() { 
    console.log("aye we tryin to start intros up in this");

    var intro = introJs();

    intro.setOptions({
      steps: [
        {
          intro: "Welcome to Mygreat! Mygreat is a tool aimed to " +
          "assist families and young professionals in making informed " + 
          "decisions about moving to San Diego!"
        },
        {
          intro: "Here, you'll be able to select the filters and data " +
          "that suit your personal needs."
        },
        {
          element: document.querySelector("#side_nav"),
          intro: "To get started, click on a category of information you'd like to " +
          "filter. Select what's relevant to you, and what you seek out of a potential "+
          "new home!",
          position: 'right'
        },
        {
          element: document.querySelector("#Education_Button"),
          intro: "If you have kids and want to know of the educational opportunities " +
          "and demographics of a particular area, select this button.",
          position: 'right'
        },
        {
          element: document.querySelector("#Industry_Button"),
          intro: "Or, if you are seeking an area based on what best suits your " +
          "professional goals and potential career opportunities, click here!",
          position: 'right'
        },
        {
          element: document.querySelector("#Marital_Status_Button"),
          intro: "Looking for other families? Click here to view the marital " +
          "status demographics!",
          position: 'right'
        },
        {
          intro: "<center><img src='img/psyduck.png'<Br></center>Woah! "+ 
          "Did you see that color change?! After you select a filter, the page " +
          "will be colored the same as the selected filter...."
        },
        {
          intro: "This way, you'll always know what data you're looking at!"
        },
        {
          intro: "Narrow down your filters by selecting the prospective " + 
          "region for your new home... <center><img src='img/arrow.png'></center>",
          position: 'left'
        },
        {
          intro: "and when you're done, you'll be able to a visual representation " +
          "of the data you chose!"
        }

        /** Can't even do this because imagemapster is the worst library ever,
        {
          element: document.querySelector("map #Coronado"),
          intro: "Whether you'll want to live by the beach..."
        },
        {
          element: document.querySelector("map #North San Diego"),
          intro: "...or central to all the action..."
        },
        {
          element: document.querySelector("map #Miramar"),
          intro: "you can pick one or more regions you want to consider!"
        } **/
      ]
    });



    //Selects the DB button to enable map
    intro.onafterchange(function(target) {
      if (target.id == "Marital_Status_Button") {
        console.log("THIS IS WHERE WE WANT CHANGE!");
        $("#Marital_Status_Button").trigger("click");
      }

      if (target.id == "mapster_wrap_0"){
        $("#Carlsbad").mapster('select');
      }
    });
    // intro.start();

    //testing
    intro.goToStep(5).start();
  };
});




