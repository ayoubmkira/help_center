
window.addEventListener("DOMContentLoaded", async () => {

    const navbarElm = document.getElementById('top_navbar');
    const footerElm = document.getElementById('footer');
    // const formSearchContainerElm = document.getElementById('form-search-container');

    if(navbarElm)
        navbarElm.innerHTML = await fetch('./partials/navbar.html').then(res => res.text());
    if(footerElm)
        footerElm.innerHTML = await fetch('./partials/footer.html').then(res => res.text());
    // if(formSearchContainerElm) {
    //     formSearchContainerElm.innerHTML = await fetch('./partials/form-search.html').then(res => res.text());

        // // Submit the Search form:
        // const formSeach = document.getElementById("form-search");
        // const inputSearch = document.getElementById("input-search");
        // formSeach.addEventListener("submit", (e) => {
        //     e.preventDefault();
        //     const searchValue = inputSearch.value.trim();
        //     (searchValue.length > 2)? window.location.assign(`./search.html?search=${searchValue}`): e.stopPropagation();
        // });

        // // For not loosing the search word:
        // const urlParams = new URLSearchParams(window.location.search);
        // const searchValue = urlParams.get("search");
        // if(searchValue) {
        //     inputSearch.value = searchValue;
        // }
    // }
    
});
