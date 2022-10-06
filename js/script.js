$(() => {
  $("#navbarToggle").blur(
    () => {
      var scWidth = window.innerWidth;
      if (scWidth < 768)
        $("#navbarSupportedContent").collapse("hide");
    });
    
});

function setHeaderHeight(){
     let headerHeight = document.getElementsByTagName("header")[0].offsetHeight,
     callBoutton = document.getElementById("call-btn");
     headerHeight += 35;
     callBoutton.style.marginTop += headerHeight +"px";
  }
  
((main) => {
  const dc = {};
  var home = "snippets/home.html",
  allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json",
  categoriesTitle = "snippets/categories_title.html",
  categoriesHtml = "snippets/categories.html",
  allMenuItemUrls = "https://davids-restaurant.herokuapp.com/menu_items.json?category=",
  menuItem_title = "snippets/menuItem_title.html",
  menuItem="snippets/menuItem.html"


  document.addEventListener("DOMContentLoaded",
    (event) => {
      loading('#main-content');
      $ajaxUtils.sendGetRequest(home,
        (resp) => {
         insertHtml("#main-content",resp);
     }, false);
      });
    
      dc.loadMenuCategories = () => {
    switchActiveButton("#navMenuButton");
    loading("#main-content");
    $ajaxUtils.sendGetRequest(allCategoriesUrl,
      buildAndShowCategoriesHtml);
      goUp();
  };
  var insertProperty = (string, pName, pValue) => {
    var pToReplace = "{{"+pName+"}}";
    string = string.replace(new RegExp(pToReplace, "g"),
      pValue);
    return string;
  }

  function buildAndShowCategoriesHtml(categories) {
    $ajaxUtils.sendGetRequest(categoriesTitle,
      (categoriesTitle) => {
        $ajaxUtils.sendGetRequest(categoriesHtml, (categoriesHtml) => {
          var category = buildCatViewHtml(categories, categoriesTitle, categoriesHtml);
          //  category = "<h1>wggf</h1>";
          insertHtml("#main-content", category);
        }, false)
      },
      false)
  }

  function buildCatViewHtml(categories, categoriesTitle, categoriesHtml){
 var finalHtml = categoriesTitle +"<section class='row'>";
    for (var i = 0; i < categories.length; i++) {
      //console.log(i);
      var html = categoriesHtml;
      var name = ""+ categories[i].name;
      var short_name = categories[i].short_name;
      html = insertProperty(html, "name", name);
      html = insertProperty(html, "short_name", short_name);
      finalHtml += html;
    }
 finalHtml += "</section>";
    //console.log(finalHtml);
    return finalHtml;
  }

  dc.loadMenuItems = (CatShort_name) => {
    loading("#main-content");
    $ajaxUtils.sendGetRequest(allMenuItemUrls + CatShort_name, buildAndShowMenuItems);
    goUp();
  };

  function buildAndShowMenuItems(categoryMenuItem){
    $ajaxUtils.sendGetRequest(menuItem_title,
      (menuItem_title) => {
        $ajaxUtils.sendGetRequest(menuItem,
          (menuItem)  => {
            var menuItemVw = buildMenuItemView(categoryMenuItem,menuItem_title, menuItem);
            insertHtml("#main-content", menuItemVw);
          }, false);
      }, false);
  }

  function buildMenuItemView(categoryMenuItem, menuItem_title, menuItem){
    menuItem_title = insertProperty(menuItem_title, "name", categoryMenuItem.category.name);
    menuItem_title = insertProperty(menuItem_title, "special_instructions", categoryMenuItem.category.special_instructions);
   
    var finalHtml = menuItem_title + "<section class='row'>";

    var menuItems = categoryMenuItem.menu_items,
    CatShort_name = categoryMenuItem.category.short_name;
    for(var i = 0; i <menuItems.length; i++){
      var html = menuItem;
      
      html = insertProperty(html, "short_name", menuItems[i].short_name);
      html = insertProperty(html, "catShortName", CatShort_name);
      
      html = insertItemPrice(html, "price_small", menuItems[i].price_small);
      html = insertItemPortionName(html, "small_portion_name", menuItems[i].small_portion_name);
      html =insertItemPrice(html, "price_large", menuItems[i].price_large);
      html = insertItemPortionName(html, "large_portion_name", menuItems[i].large_portion_name);

      html = insertProperty(html, "name", menuItems[i].name);
      html = insertProperty(html, "description", menuItems[i].description);
     finalHtml += html;
    }
    finalHtml +="</section>";
    return finalHtml;
  }

  function insertItemPrice(html, pcePropName, pceValue){
    if(!pceValue){
      return insertProperty(html, pcePropName, "");
    }

    pceValue= "$" +pceValue.toFixed(2);
    html = insertProperty(html, pcePropName, pceValue);
    return html;
  }

  function insertItemPortionName(html, portPropName, portValue){
    if(!portValue)
      return insertProperty(html, portPropName, '');
    
      portValue = "("+portValue+")";
      html = insertProperty(html, portPropName, portValue);
      return html;
  }

  function switchActiveButton(toActive){
    //console.log("TA"+toActive);
    var hasActive =["#navHomeButton", "#navMenuButton", "#navSignButton", "#navAboutButton", "#navAwardsButton"];
   
    for(var i = 0; i<hasActive.length; i++){
      var classes;
      var clasHasActive = document.querySelector(hasActive[i]).className;
    
      if(document.querySelector(hasActive[i]).className.indexOf("active")){
        classes = document.querySelector(hasActive[i]).className;
    classes = classes.replace(new RegExp("active", "g"), "");
    document.querySelector(hasActive).className = classes;
}}
     var classes = document.querySelector(toActive).className;
    if(classes.indexOf("active") === -1){
      classes += " active";
      document.querySelector(toActive).className = classes;
    }}
    
function goUp(){
  window.onscroll = () => {
    var button = document.getElementById("goUp"),
  scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  //console.log(scrollTop)
  if(scrollTop > 550)
    button.style.display = "block";
     else 
      button.style.display = "none";
  }
}

  main.$dc = dc;
})(window);

  var loading = (selector) => {
    var imgHtml = "<div class='text-center'><img src='images/loading.gif'></div>";
    insertHtml(selector,
      imgHtml);}
var insertHtml = (selector, html) => {
    document.querySelector(selector).innerHTML = html;
  }
