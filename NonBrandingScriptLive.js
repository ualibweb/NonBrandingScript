console.log("non-branding script live!");

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-2255842-21', 'auto');
  ga('send', 'pageview');

function addTextCallNumberLinks(){

  $('.related-info-area:contains("Text a Call Number...")', window.parent.document).css('display','none');

  /* SET THE "from" AND "c" VARIABLES */
  var from = "Scout Text";
  var c = "us ca";

  var count = 0;
  var incount = 0;
  var refreshIntervalId = setInterval( function() {
    count++;
    if (count > 60) {
      clearInterval(refreshIntervalId);
    } else {
      if ($(".circulation tbody tr",window.top.document).length > 0) {
        $(".result-list-record",window.top.document).each(function(){
          var title = $(this).find(".title-link").text().trim();
          $(this).find(".circulation tbody tr").each(function(){
            var numcols = $(this).find("td").length;
            if (numcols > 2) {
              var due = 0;
              var callnumber = $(this).find("td:nth-child(2)").text().trim();
              var location = $(this).find("td:nth-child(1)").text().trim();
              var status = $(this).find("td:nth-child(3)").text().trim();
              if (numcols > 3) {
                due = 1;
                var duedate = $(this).find("td:nth-child(4)").text().trim();
              }
              var link = '<a onclick="ga(\'send\', \'event\', \'textCallNumber\', \'click\');" href="http://widgets.ebscohost.com/prod/customlink/text/v3/sms.php?c='+encodeURIComponent(c)+'&from='+encodeURIComponent(from)+'&callnumber='+encodeURIComponent(callnumber)+'&location='+encodeURIComponent(location)+'&status='+encodeURIComponent(status)+'&title='+encodeURIComponent(title);
              if (numcols > 3) {
                link += '&duedate='+encodeURIComponent(duedate);
              }
              link += '" target="_blank">Text Call #</a>';
              var callnumberhtml = $(this).find("td:nth-child(2)").html();
              newcallnumberhtml = callnumberhtml + link;
              if (callnumber.length > 0) {
                $(this).find("td:nth-child(2)").html(newcallnumberhtml);
              }
            }
          });
        });
        clearInterval(refreshIntervalId);
      } else {
      }
    }
  }, 500);

}



function disciplinesHide(speed){

    speed = speed || 10;
    console.log("DISCIPLINES HIDE");
    
    hideDisciplinesLink  = document.querySelector("#hideDisciplines"); 
    
    if (!hideDisciplinesLink){
      createHideDisciplinesLink();
    }
    
    jQuery('#disciplines').hide();
    jQuery('#hideDisciplines').html('&#x25BC;  Show topics');
    jQuery('#hideDisciplines').one('click', disciplinesShow);
    
    
    
}

function disciplinesShow(){
    console.log("DISCIPLIENS SHOW");
    jQuery('#disciplines').fadeIn(100);
    jQuery('#hideDisciplines').html('&#x25B2; Hide topics');
    jQuery('#hideDisciplines').one('click', disciplinesHide);
}

function createHideDisciplinesLink(){
  
  console.log("CREATE LINK FIRES");
  
  disciplines = document.querySelector("#ctl00_ctl00_MainContentArea_MainContentArea_ctrlLimiters_divDisciplines");
  
  if (!disciplines){
    disciplines = document.querySelector("#ctrlLimiters_divDisciplines");
  }
  
  hideDisciplines = document.createElement("a");
  hideDisciplines.setAttribute("href", "#");
  hideDisciplines.setAttribute("id", "hideDisciplines");
  disciplines.insertBefore(hideDisciplines, disciplines.firstChild)
}


var oneSearchLoading = function() {
        var self = this;
        
        var coverScreen = jQuery("<div>").attr("id", "modal-screen").addClass("ui-widget-overlay").css("z-index", 9000).hide();;
        var loadingMessage = jQuery("<div>").attr({
            id: "modal-loading",
            tabIndex: "0",
            "data-auto": "spinner"
          }).hide();
        
        // Show loading screen background
        jQuery("body").append(coverScreen);

          var h = {
            height: jQuery(window).height(),
            width: jQuery(window).width()
          };
          var j = {
            height: jQuery(document).height(),
            width: jQuery(document).width()
          };
          j.height = j.height > h.height ? j.height : h.height;
          j.width = j.width > h.width ? j.width : h.width;
          coverScreen.css({
            top: "0",
            left: "0px",
            height: j.height + "px",
            width: j.width + "px"
          });
          coverScreen.fadeTo(200, 0.5);
           

               
        this.showLoadingMessage = function(){
          var a = jQuery("<div>").addClass("container").append("<span>Updating...</span>");
          var i = {
            lines: 9,
            length: 4,
            width: 2,
            radius: 2,
            corners: 1,
            rotate: 13,
            direction: 1,
            color: "#000",
            speed: 0.8,
            trail: 65,
            shadow: false,
            hwaccel: false,
            className: "spinner",
            zIndex: 2000000000,
            top: "0px",
            left: "auto"
          };
          var g = new Spinner(i).spin(a.get(0));
          loadingMessage.append(a);

          jQuery("body").append(loadingMessage);
          loadingMessage.addClass("modal-loading").css({
            position: "fixed",
            top: ((h.height / 2) - (loadingMessage.outerHeight() / 2)) + "px",
            left: ((h.width / 2) - (loadingMessage.outerWidth() / 2)) + "px"
          });
          
          loadingMessage.show();
        }

        // Display loading message when Spinner library is loaded
        var spinnerLoading = whenLoaded('Spinner', function(){
          self.showLoadingMessage();
        });
        
        this.hideLoadingScreen = function(){
          // cancel displaying loading message - Spinner takes a long time to load sometimes. this prevents
          // the loadingMessage from displaying if the loading screen needs to be hidden before Spinner loads.
          clearTimeout(spinnerLoading);
          loadingMessage.hide();
          coverScreen.hide();  
        }
    }

 
    function whenLoaded(service, callback){
      var timeout;

      (function checkService() {
        console.log("Waiting on " + service);
        if (window[service] || (service == 'checkoutModal' && (apVideo = document.querySelector('#CheckoutDownloadModal')))) { 
            clearTimeout(timeout);
            callback();
        } else {
            timeout = setTimeout(checkService, 100);
        }
      })(timeout, service, callback);
      
      // Return timeout so it can be canceled by other methods
      return timeout;
    }
      
    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1);
          if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
      }
      return "";
    }

    function updateFacets() {

      console.log("updateFacets called");

      /* Use Example: getFacets(['Books', 'AcademicJournals', 'PrimarySourceDocuments']) */
      function getFacets(params) {
        return params.map(function(facet) {
            return Facets[facet];
        })
      };

      var Facets = {
        Books: "430BK",
        AcademicJournals: "160MN",
        News: "350NP",
        Magazines: "250MN",
        Reviews: "450BR",
        Biographies: "610BG",
        ConferenceMaterials: "530CN",
        eBooks: "432BK",
        ElectronicResources: "845ER",
        TradePublications: "165MN",
        NonPrintResources: "847NP",
        Audio: "848NP",
        MusicScores: "437MS",
        DissertationsTheses: "550DS",
        PrimarySourceDocuments: "641PD",
        Reports: "470RP",
        Videos: "849NP",
        Maps: "846MA",
        Audiobooks: "434BK",
      };

      var loading = new oneSearchLoading();

      var sourceTypeUrl = ep.utilities.replaceEPCommand("MultiSelectDocType/ExpandedPanel").replace(/(.+bquery=.+?)([\s+]?OR.+)(&.+)/, function(match, p1, p2, p3) {
                  return p1 + p3;
              });
      var updateUrl = ep.utilities.replaceEPCommand("MultiSelectDocType/Update");

      facet_vals = getFacets(facetArray); 

      jQuery.get(sourceTypeUrl, function(data) {

        console.log('jQuery get called');

        // Create jQuery DOM object from return HTML
        var form = jQuery(data);

        // Check all source boxes defined from processing the facetType
        form.find('input[name="_doc_type_"]').each(function(i, e) {
            var facet = jQuery(this);

            if (jQuery.inArray(facet.val(), facet_vals) > -1) {

                facet.prop('checked', true);
            } else {
                facet.removeAttr('checked');
            }
        })

        form.appendTo('body');
        f = form.get(0);

        if (f) {    

            console.log("We has form;")              
            var _url = window.location.href;

            
            var newUrl = _url.replace(/(.+bquery=.+?)([\s+]?OR.+)(&.+)/, function(match, p1, p2, p3) {
                return p1 + p3;
            });


            document.location.replace(newUrl);

            f.action = updateUrl;

            f.method = "post";
            f.submit();
        }     
      });  
    }       

    re = /\/eds\/search/;
    found = location.pathname.match(re);

    if (found){
      whenLoaded('jQuery', disciplinesHide);
    }

    facetCookie = getCookie('onesearchfacets');

   
    facetArray = [];

    if (facetCookie != ''){
      facets = decodeURIComponent(facetCookie);
      facetArray  = facets.split(",");

      console.log("array of facets to be updated below!");
      console.log(facetArray);

      //Unset cookie. 
      document.cookie="onesearchfacets=;expires=Thu, 01 Jan 1970 00:00:00 UTC;domain=.ebscohost.com;path=/"
      facetCookie = '';

      whenLoaded('jQuery', updateFacets);
    }

    //RegExp for detail page
    re = /\/detail\/detail/;
    found = location.pathname.match(re);

    searchTerm = getCookie('onesearchquery');
    searchTerm = decodeURIComponent(searchTerm.replace(/\+/g, '%20'));

    console.log("ONESEARCH QUERY IS");
    console.log(searchTerm)

    if ((searchTerm != '') && (found)){
        searchBox = document.querySelectorAll('#SearchTerm1')[0];

        if (typeof(searchBox) != 'undefined') {
            searchBox.setAttribute("value", searchTerm);
        }

        resultListLink = document.querySelectorAll('#ctl00_ctl00_MainContentArea_MainContentArea_topNavControl_linkResult')[0];

        newResultListHref = 'http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&scope=site&type=0&custid=s4594951&groupid=main&profid=eds&mode=and&authtype=ip,guest&bquery=' + searchTerm;
        
        if (typeof(resultListLink) != 'undefined') {
            resultListLink.setAttribute('href', newResultListHref);
        }
        
        searchBox =  document.querySelectorAll('#findFieldOuter .find-field-inner .find-field-inputs')[0];
        if (typeof(searchBox) != 'undefined') {
          searchBox.setAttribute('style' , 'display: none;');
        }
        
        searchLinks = document.querySelector('#findFieldLinks');
        if (typeof(searchLinks) != 'undefined') {
             searchLinks.outerHTML = '<div style="margin-bottom: 10px;"><a href="http://search.ebscohost.com/login.aspx?direct=true&amp;site=eds-live&amp;scope=site&amp;type=0&amp;custid=s4594951&amp;groupid=main&amp;profid=eds&amp;mode=and&amp;authtype=ip,guest&amp;bquery=' + searchTerm + '" style="font-size: 16px;border-radius: 3px;background-color: #428bca;border-color: #357ebd;line-height: 1.5;color: white;padding: 5px 10px;box-shadow: 3px 3px 3px #888888;">See all results!</a></div>' + searchLinks.outerHTML;
        }

         //Unset cookie. 
        document.cookie="onesearchquery=;expires=Thu, 01 Jan 1970 00:00:00 UTC;domain=.ebscohost.com;path=/"
    }

    //RegExp pattern for results page
    re = /\/results/;
    
    //search current path for pattern
    found = location.pathname.match(re);
    if (found){
      //whenLoaded('apVideo', moveAPCarousel);
      whenLoaded('jQuery', addTextCallNumberLinks);
      whenLoaded('jQuery', resultsAfterAjaxComplete);
    }

    re = /\/detail\/detail/;  

    //search current path for pattern
    found = location.pathname.match(re);
    if (found){
      whenLoaded('jQuery', mlaNotYetUpdated);
    }
	
    whenLoaded('jQuery', addNewSearchLink);
    whenLoaded('jQuery', addFeedbackLink);
    whenLoaded('jQuery', updateLanguageMetadata)
   
    

    function moveAPCarousel(){
    var apVideo = window.parent.document.querySelector('.apvideo');
      if (apVideo)
      {
        window.parent.document.querySelector('.result-list').appendChild(apVideo);
        // this part checks whether format or db limiters have been set
        var sourceTypeInputs = window.parent.document.querySelectorAll('#multiSelectDocType input:checked');
        var dbInputs = window.parent.document.querySelectorAll('#multiSelectDbFilterContent input:checked');
        var videoSource = window.parent.getElementById('_doc_type_849NP'); // for when Videos is actually selected by the user
        var newsSource = window.parent.getElementById('_doc_type_350NP'); //for when News is actually selected by the user
        if (sourceTypeInputs.length > 0)
        {
          if (videoSource)
          {
            if (videoSource.checked !== true)
            {
              console.log("VIDEO SOURCE");
              apVideo.style.display = 'none';
            }
          }
          else if (window.parent.document.getElementById('_doc_type_ALL').checked !== true)
          { // the all sources limiter is checked when no others are, so need to control for that
            console.log("ALL NOT CHECKED");
            apVideo.style.display = 'none';
          }
          if (newsSource)
             if (newsSource.checked == true){
                console.log("NEWS SOURCE");
                apVideo.style.display = 'block';
             }  
          }  
        if (dbInputs.length > 0)
        {
          if (window.parent.document.getElementById('_db_filter__all_dbs_').checked !== true)
          { // the all databases limiter is checked when no others are, so need to control for that
            apVideo.style.display = 'none';
          }
        }
      }  
    }


//Customizations that occur after AJAX is complete -on the results page-
function resultsAfterAjaxComplete(){
jQuery( document ).ajaxComplete(function( event, xhr, settings ) {
  
  var languageURLSegment = 'panelId=multiSelectCluster_Language'; 
  var URL = settings.url;

  searchResult = URL.search(languageURLSegment);
  if (searchResult != -1){   
    //console.log("searchResult is not equal to -1");
    undeterminedLink = document.querySelectorAll('label[for="modal__cluster_Language%24undetermined"] a')[0];
    undeterminedLink.innerHTML = 'english or other';
  }
  
  //Hide disciplines if search options menu is being loaded
  //Search options are accessible by "Show more" under publication date in the results list of Scout
  var searchOptionSegment = 'searchoptions?';
  
  searchResult = URL.search(searchOptionSegment);
  
  if (searchResult != -1){   
    disciplinesHide(1);
  }
  
  console.log("beginning of new HTML");
  var searchOptionSegment = '/CheckoutDialog/CheckBookAvailability';
  
  searchResult = URL.search(searchOptionSegment);
  
  if (searchResult != -1){  
    console.log("searchResult found!"); 
     whenLoaded('checkoutModal', downloadMessageEbook);
    
  }

});
}



function downloadMessageEbook(){
  console.log("downloadMessageEbook fires");
  var lastParagraph = document.querySelector("#CheckoutDownloadModal .modal-content p:nth-child(3)");
  lastParagraph.outerHTML = lastParagraph.outerHTML + '<p style="background: yellow; padding: 5px; border-radius:4px; background-color: #fcf8e3;">Checking out this eBook may keep another user from accessing it.  When you are done with the eBook, please make sure to return it in Adobe Digital Editions.</p>'
  var headerText = document.querySelector("#CheckoutDownloadModal h2");
  headerText.innerHTML = headerText.innerHTML.replace('Download', 'Checkout');
    
}

function addAlertMessage(){
	jQuery( document ).ready(function(){
		
		var newHTML  = '<div class="alert" style="margin-top: 10px;  margin-bottom: 10px; max-width: 510px; padding: 15px; border-radius: 4px; color: #a94442; background-color: #f2dede;">Scout is experiencing occasional issues with access from off campus. Before searching off campus, log in via the yellow bar on the top of the screen to help keep this issue from occurring. (No action is needed on campus.)</div>'; 
		jQuery('#findFieldOuter').prepend(newHTML);
	});
}

function mlaNotYetUpdated(){
  
  console.log("mlaNotYetUpdated called");
  
  jQuery( document ).ajaxComplete(function( event, xhr, settings ) {
  
    var languageURLSegment = 'citepanel'; 
    var URL = settings.url;
    searchResult = URL.search(languageURLSegment);
    
    if (searchResult != -1){
      var MLAFound = false; 
      
      $('dl.cite-list').children().each(function(){
         if (MLAFound == true){
             console.log("MLA FOUND IS TRUE!");
             $(this).children('.cite-header').each(function(){
                 //console.log("CITE-HEADER EACH");
                 $(this).html('<p><strong>This citation is an old version of MLA (7th edition)</strong>.</p>');
             });
             $(this).children('.cite-indent').each(function(){
                 //console.log("CITE-INDENT EACH");
                 oldCitation = $(this).html();
                 $(this).html('<p class="body-paragraph">You will want to <a href="https://owl.english.purdue.edu/owl/resource/747/01/" target="_blank">cite 8th edition (opens in new tab)</a> for your classes. The MLA 7th edition citation is included for reference below: ' + oldCitation + '</p>');
             }); 
             return false;
         }
         
         $(this).children('a').each(function(){

             if ($(this).attr('title')=='MLA'){
                 //console.log("SETTING MLA FOUND TO TRUE!");
                 MLAFound = true;
             }
         });
        });
    
    }
  });
}

function addNewSearchLink(){
  jQuery(document).ready(function(){
    var noResults = document.querySelector('#UserMessageLabel .std-warning-text');
    if (noResults != undefined){
        var newSearchHref = document.querySelector('a[title="New Search"]').getAttribute('href');

        if (newSearchHref != undefined){
            var newSearchLink = '<a href=' + newSearchHref + ' style="margin-left: 5px;">Start A New Search</a>';
            var trimmedNoResults = noResults.outerHTML.replace('</span>', '');
            //console.log(trimmedNoResults);
            noResults.outerHTML = trimmedNoResults + newSearchLink + '</span>';
        }
    }
  });
}

function addFeedbackLink(){
  jQuery(document).ready(function(){
    findFieldLinks = document.querySelectorAll("#findFieldLinks")[0];

    feedback = document.createElement("li");
    feedback.setAttribute("class", "find-field-link");

    feedbackLink = document.createElement("a");
    feedbackLink.setAttribute("href", "https://www.lib.ua.edu/library-help/kacecontact-form/");
    feedbackLink.setAttribute("target", "_blank");
    feedbackLink.innerHTML = 'Report Scout issue';

    feedback.appendChild(feedbackLink);

    findFieldLinks.appendChild(feedback);
 });
}
  
 function updateLanguageMetadata(){
   jQuery(document).ready(function(){
   
       /*Update language facet information*/
      language = document.querySelectorAll('label[for="_cluster_Language%24undetermined"] a')[0]; 
      if (typeof(language) != 'undefined'){
        language.innerHTML = 'english or other'; 
      }
      
      language = document.querySelectorAll('.selected-limiters a[title^="Language (ZL)"]')[0];
      if (typeof(language) != 'undefined'){
        if (language.innerHTML == 'undetermined'){
            language.innerHTML = 'english or other';
        }
      }
      
      [].forEach.call(document.querySelectorAll('#citationFields strong'), function(item){
        if (item.innerHTML == 'Undetermined'){
          item.innerHTML = 'English or other';
        }
      });

      
      /*This section handles the detailed record users see when they drill down*/
      //Usually, the language field is the 4th child 
      languageDetailed = document.querySelectorAll('#citationFields dd:nth-child(5)')[0]; 
      if (typeof(languageDetailed) != 'undefined'){
        if (languageDetailed.innerHTML == 'Undetermined' || languageDetailed.innerHTML == '<strong>Undetermined</strong>'){
          languageDetailed.innerHTML = 'English or other'; 
        }
      }

      //Sometimes also appears as nth child 5
      languageDetailed = document.querySelectorAll('#citationFields dd:nth-child(4)')[0]; 
      if (typeof(languageDetailed) != 'undefined'){
        if (languageDetailed.innerHTML == 'Undetermined' || languageDetailed.innerHTML == '<strong>Undetermined</strong>'){
          languageDetailed.innerHTML = 'English or other'; 
        }
      }

      //Edit descriptions that appear in search results
      recordDescriptions = document.querySelectorAll('.display-info');
      Array.prototype.forEach.call(recordDescriptions, function(el){

      el.innerHTML = el.innerHTML.replace("Language: Undetermined", "Language: English or other");

      el.innerHTML = el.innerHTML.replace("Language: <strong>Undetermined</strong>", "Language: <strong>English or other</strong>");

      });  
   });
 }

 //Save PDF to Cloud removed for eBook results
function EBSCOEBookCustomizations(){



$(window).load(function(){

  console.log("HIDE SAVE PDF!");

  //Iterate through each Scout result
  $('.display-info').each(function(){

      var removePDFToCloud = false;

      console.log("DISPLAY INFO!");  

      //Select database text in specific result to check if it's an EBSCO eBook.  This selector is relative to the display-info markup.  
      $(this).find('.record-icon ~ span').each(function(){
          console.log("BOOK JACKET!");               
         if (this.innerHTML == ', Database: eBook Collection (EBSCOhost)'){
            removePDFToCloud = true;
            return false; //equivalent to break -- which jQuery doesn't support
          }
      });

      if (removePDFToCloud == true){

          //Hide "Save PDF to Cloud"
           $(this).find('.externalLinks a[href^="http://www.lib.ua.edu/externalWidgets/eds/savePDFtocloud"]').each(function(){
                  //console.log('found!')
                  $(this).css('display', 'none');
           });
           
            $(this).find('a[title="Download (Offline)"').each(function(){
                  var innerHTML = $(this).html();
                  $(this).html('Checkout (Offline)');

            });
      }
    
  });
});


}



