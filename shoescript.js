//Intro animation
setTimeout(function() {
    document.body.style.opacity = 1;
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundColor = "#ffffff";
}, 1500);

function introAnimation() {
    document.body.style.opacity = 0;
    document.body.style.backgroundImage = "url('images/vershologo.png')";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "300px";
}
introAnimation();

//Constantly looping scaling function, repositions many elements according to viewport size
setInterval(function() {
    let sidebar = document.getElementsByClassName('s-sidebar__nav')[0];
    let nikemodal = document.getElementById("nikemodal");
    let stockxmodal = document.getElementById("stockxmodal");
    let logo = document.getElementById('logoid');
    let search = document.getElementById('searchbar');
    let searchbtn = document.getElementById('searchsvg');
    let popularmodal = document.getElementById('popularmodalcontent');
    let stockchartmodal = document.getElementById('stockchartmodal');
    if(sidebar.getBoundingClientRect().width >= 56) {
        popularmodal.style.marginLeft = '267px';
        stockchartmodal.style.marginLeft = `${popularmodal.getBoundingClientRect().width+30}px`;
        nikemodal.style.marginLeft = '220px';
        search.style.marginLeft = '95px';
        search.style.verticalAlign = '-15px';
        search.style.fontSize = '1.25em';
        searchbtn.style.verticalAlign = '-17px';
        searchbtn.style.marginLeft = '30px';
        stockxmodal.style.height = '80%';
        nikemodal.style.height = '80%';
        stockxmodal.style.width = '37%';
        nikemodal.style.width = '37%';
        stockxmodal.style.marginLeft = `${nikemodal.getBoundingClientRect().width + nikemodal.offsetLeft+30}px`;
        stockxmodal.style.marginTop = `100px`;
        logo.src = "images/vershologo.png";
        logo.style.height = '65px';
        if(document.body.contains(document.getElementsByClassName('css-4qyi6t-BannerPaddingWrapper')[0]))
            document.getElementsByClassName('css-4qyi6t-BannerPaddingWrapper')[0].style.paddingTop = '40px';
    }
    if (sidebar.getBoundingClientRect().width <= 56) {
        popularmodal.style.marginLeft = '90px';
        stockchartmodal.style.marginLeft = `${popularmodal.getBoundingClientRect().width+30}px`;
        nikemodal.style.marginLeft = '70px';
        search.style.marginLeft = '30px';
        search.style.fontSize = '1em';
        searchbtn.style.marginLeft = '50px';
        stockxmodal.style.height = '55%';
        nikemodal.style.height = '45%';
        stockxmodal.style.width = '87%';
        nikemodal.style.width = '90%';
        stockxmodal.style.marginLeft = `${nikemodal.offsetLeft+20}px`;
        stockxmodal.style.marginTop = `${nikemodal.offsetHeight+110}px`;
        logo.src = "images/flyingshoes.png";
        logo.style.height = '45px';
        if(document.body.contains(document.getElementsByClassName('css-4qyi6t-BannerPaddingWrapper')[0]))
            document.getElementsByClassName('css-4qyi6t-BannerPaddingWrapper')[0].style.paddingTop = '100px';
    }
    
}, 0);

function showshopmodals () {
    let nikemodal = document.getElementById('nikemodal');
    let stockxmodal = document.getElementById('stockxmodal');
    let popularmodal = document.getElementById('popularmodal');
    let stocks = document.getElementById('stockchartmodal');
    let sidebar = document.getElementsByClassName('s-layout__sidebar')[0];
    nikemodal.style.display = 'block';
    stockxmodal.style.display = 'block';
    popularmodal.style.display = 'none';
    stocks.style.display = 'none';
    sidebar.style.zIndex = 0;
}
function showtrends () {
    let nikemodal = document.getElementById('nikemodal');
    let stockxmodal = document.getElementById('stockxmodal');
    let popularmodal = document.getElementById('popularmodal');
    let stocks = document.getElementById('stockchartmodal');
    let sidebar = document.getElementsByClassName('s-layout__sidebar')[0];
    nikemodal.style.display = 'none';
    stockxmodal.style.display = 'none';
    popularmodal.style.display = 'block';
    stocks.style.display = 'block';
    sidebar.style.zIndex = 99999;
}
//Callback to nike store XMLHTTPREQUEST
function nikereqListener () {
    e = document.getElementById('nikemodalcontent');
    var child = e.lastElementChild; 
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
    //Unecessary GUI removal
    document.getElementById('nikemodalcontent').insertAdjacentHTML('beforeend', this.responseText);
    document.getElementById('MobileMenuButton').remove();
    document.getElementById('gen-nav-footer').remove();
    //Specific html node removals
    document.getElementsByClassName('pre-l-wrapper mauto-sm d-sm-flx flx-dir-sm-r flx-jc-sm-sb flx-wr-sm-nw')[0].remove();
    document.getElementsByClassName('pre-l-brand-header d-sm-h d-lg-b z3')[0].remove();
    document.getElementsByClassName('icon-btn ripple d-sm-b')[0].remove();
    document.getElementsByClassName('pre-btn-header ripple mr3-sm d-sm-h d-lg-ib')[0].remove();
    document.getElementsByClassName('pre-search-input-box d-sm-b flx-dir-lg-c flx-ai-lg-fe d-lg-flx flx-gro-sm-1 flx-gro-lg-0')[0].remove();
    
    //Image card removals
    let imagecards = document.getElementsByClassName('product-card__hero-image');
    while(imagecards.length > 0) {
        for(let n = 0; n < imagecards.length; n++)
            imagecards[n].remove();
    }
}
function stockxreqListener () {
    e = document.getElementById('stockxmodalcontent');
    var child = e.lastElementChild; 
    while (child) {
        if(child == document.getElementById('stockxlogoid')) {
            break;
        }
        e.removeChild(child);
        child = e.lastElementChild;
    }
    document.getElementById('stockxmodalcontent').insertAdjacentHTML('beforeend', this.responseText);
}
function popularreqListener () {
    document.getElementById('popularmodalitems').insertAdjacentHTML('beforeend', this.responseText);
    document.getElementById('site-header').remove();
    document.getElementsByClassName('css-g10a-StyledBrowseHeader')[0].remove();
    document.getElementsByClassName('css-1ed78i8-StyledSkipToContent')[0].remove();
    document.getElementsByClassName('css-8th5f9')[0].remove();
    document.getElementsByClassName('css-b1ilzc')[0].remove();
    document.getElementsByClassName('col-md-2 col-xs-12 side-filters hidden-xs hidden-sm')[0].remove();
    document.getElementsByClassName('hidden-xs hidden-sm')[0].remove();
    document.getElementsByClassName('css-104arvh')[0].remove();
    document.getElementsByClassName('css-zfbjl9-PaginationContainer')[0].remove();
    document.getElementsByClassName('css-18kmo86-ButtonRow')[0].remove();
    document.getElementsByClassName('css-16q9pr7')[0].remove();
    document.getElementsByClassName('css-4qyi6t-BannerPaddingWrapper')[0].style.paddingTop = '40px';
    document.getElementsByClassName('chakra-container css-bu55a7')[0].style.padding = '0px';
    document.getElementsByClassName('col-md-10')[0].style.padding = '0px';
    document.getElementsByClassName('page-container')[0].style.position = 'inherit';
    let imagecards = document.getElementsByClassName('css-1c5ij41');
    let mainfavicon = document.getElementsByTagName('link')[1].cloneNode();
    document.head.append(mainfavicon);
    while(imagecards.length > 0) {
        for(let n = 0; n < imagecards.length; n++)
            imagecards[n].remove();
    }
}

function onsearch () {
    let querystring = document.getElementsByClassName('searchelement')[0].value.toString();
    console.log(querystring);
    var nikereq = new XMLHttpRequest();
    var stockxreq = new XMLHttpRequest();

    nikereq.addEventListener("load", nikereqListener);
    nikereq.open("GET", `https://www.nike.com/w?q=${querystring}&vst=${querystring}`);
    nikereq.send();
    
    stockxreq.addEventListener("load", stockxreqListener);
    stockxreq.open("GET", `https://sleepy-waters-67122.herokuapp.com/getstockx/${querystring}`);
    stockxreq.send();
}
function getpopularsales () {
    var popularreq = new XMLHttpRequest();
    popularreq.addEventListener("load", popularreqListener);
    popularreq.open("GET", `https://stockx.com/sneakers/most-popular`);
    popularreq.send();
}
onsearch();
getpopularsales();

function search() {
    if(event.key === 'Enter') {
        onsearch();     
    }
}
//Sidebar functions
function leavefunc (textid, iconid, iconurl) {
    document.getElementById(textid).style.color = '#333333';
    document.getElementById(iconid).src = iconurl;
}
function hoverfunc (textid, iconid, iconurl) {
    document.getElementById(textid).style.color = 'white';
    document.getElementById(iconid).src = iconurl;
}
