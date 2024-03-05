let advertLinks = document.querySelectorAll("#presell-container a, #barebones-wrapper a, .custom_pages-template-template-offer-blank a");
for (let i = 0; i < advertLinks.length; i++) {
    //if we're set to overwrite everything we set the href to all a's
    if (promoScript.link_overwrite && advertLinks[i].target !== '_blank')
    {
        if(~advertLinks[i].href.indexOf('#')){
            let href = advertLinks[i].href.split('#');
            advertLinks[i].href = promoScript.destination_url + '#' + href[1];
        }else{
            advertLinks[i].href = promoScript.destination_url;
        }
    }
    //if we're not overwriting then we only set the href if there isn't one already
    else {
        if (!advertLinks[i].href)
        {
            advertLinks[i].href = promoScript.destination_url;
        }
    }

}

let advertImages = document.querySelectorAll(".single-presell img");
for (let i = 0; i < advertImages.length; i++) {

    if (!advertImages[i].closest('a') && promoScript.link_overwrite)
    {
        let wrappedImg = "<a href='" + promoScript.destination_url + "'>" + advertImages[i].outerHTML + "</a>";
        advertImages[i].outerHTML = wrappedImg;
    }
}


//build out obj based on query string
if (window.gu_qs && window.gu_qs.gutheme) {

    //get theme index specified
    let themeIndex = gu_qs['gutheme'];
    //get theme json
    let selectedTheme = JSON.parse(promoScript.themes)[themeIndex - 1];

    if (selectedTheme) {
        console.log(/*"Applying theme: " + */selectedTheme/*.name*/);

        //if theme is valid, apply styles
        document.body.style.backgroundColor = selectedTheme.bgColor;

        let header = document.getElementById('header');
        header.style.backgroundColor = selectedTheme.bgColor;
        header.style.color = selectedTheme.textColor;

        let footer = document.getElementById('footer');
        footer.style.backgroundColor = selectedTheme.bgColor;
        footer.style.color = selectedTheme.textColor;

        let innerContainer = document.getElementById("presell-container").getElementsByClassName("container")[0];
        innerContainer.className = "container";
        innerContainer.classList.add("heading-" + selectedTheme.headingFont);
        innerContainer.classList.add("base-" + selectedTheme.baseFont);
        innerContainer.style.backgroundColor = selectedTheme.contentBgColor;
        innerContainer.style.color = selectedTheme.textColor;
        innerContainer.style.maxWidth = selectedTheme.contentWidth;

    }
    else {
        console.log("Theme index is invalid");
    }



}


