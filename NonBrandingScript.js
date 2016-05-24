/*whenLoaded defined in earlier script*/
whenLoaded('jQuery', updateLanguageModal);
console.log("non-branding script loaded!");
function updateLanguageModal(){
jQuery( document ).ajaxComplete(function( event, xhr, settings ) {
  
  var languageURLSegment = 'panelId=multiSelectCluster_Language'; 
  var URL = settings.url;
  
  searchResult = URL.search(languageURLSegment);
  if (searchResult == -1){
    return;
  }
  else {
    //console.log("searchResult is not equal to -1");
    undeterminedLink = document.querySelectorAll('label[for="modal__cluster_Language%24undetermined"] a')[0];
    undeterminedLink.innerHTML = 'english or other';
  }
});
}
