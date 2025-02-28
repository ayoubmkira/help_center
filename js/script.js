
const navbarElm = document.getElementById("navbar");
const contentDiv = document.getElementById("content"); // Content div to show the clicked category content

const dispalyArticleContent = (articleLiElm, article) => {
    // Get the article File when click on it:
    articleLiElm.addEventListener("click", async () => {
        try {
            const response = await fetch(`./pages/${article.fileName}.html`);
            if(!response.ok) {
                throw new Error("Article not Found.");
            }
            const html = await response.text();
            contentDiv.innerHTML = html;
        } catch (error) {
            contentDiv.innerHTML = ``;
        }
    });
};

// Recursive function to create the nested dropdown menu for navbar
function traverseCategories(categories) {
    const ul = document.createElement('ul');

    categories.forEach(category => {
        const li = document.createElement('li');

        // Create category link
        const categoryLink = document.createElement('a');
        categoryLink.textContent = category.name;
        // add href attribute:
        categoryLink.href = "#" + category.name.split(" ").join("-");
        categoryLink.addEventListener('click', function() {
            // Clear content div before adding new content
            contentDiv.innerHTML = '';
            // Show the content for this category
            displayCategoryContent(category);
            li.classList.toggle('open');
        });
        li.appendChild(categoryLink);

        // If there are subcategories, recurse into them (just show names in the navbar)
        if (category.subcategories && category.subcategories.length > 0) {
            li.appendChild(traverseCategories(category.subcategories));
        }

        // If there are articles, add them as a nested <ul> inside this <li>
        if (category.articles && category.articles.length > 0) {
            const articleList = document.createElement('ul');
            category.articles.forEach(article => {
                const articleLi = document.createElement('li');
                articleLi.className = "article";
                // articleLi.innerHTML = `<a href="#">${article.title}</a>`;
                articleLi.innerHTML = `
                    <a>
                        <span class="icon">
                            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.9538 12.0996C12.999 11.6009 13 10.953 13 10V8C13 7.04698 12.999 6.39908 12.9538 5.90036C12.9099 5.41539 12.8305 5.17051 12.7321 5C12.5565 4.69596 12.304 4.44349 12 4.26795C11.8295 4.16951 11.5846 4.09011 11.0996 4.04616C10.6009 4.00096 9.95302 4 9 4C8.04698 4 7.39908 4.00096 6.90036 4.04616C6.41539 4.09011 6.17051 4.16951 6 4.26795C5.69596 4.44349 5.44349 4.69596 5.26795 5C5.16951 5.17051 5.09011 5.41539 5.04616 5.90036C5.00096 6.39908 5 7.04698 5 8V10C5 10.953 5.00096 11.6009 5.04616 12.0996C5.09011 12.5846 5.16951 12.8295 5.26795 13C5.44349 13.304 5.69596 13.5565 6 13.7321C6.17051 13.8305 6.41539 13.9099 6.90036 13.9538C7.39908 13.999 8.04698 14 9 14C9.95302 14 10.6009 13.999 11.0996 13.9538C11.5846 13.9099 11.8295 13.8305 12 13.7321C12.304 13.5565 12.5565 13.304 12.7321 13C12.8305 12.8295 12.9099 12.5846 12.9538 12.0996ZM4.40192 4.5C4 5.19615 4 6.13077 4 8V10C4 11.8692 4 12.8038 4.40192 13.5C4.66523 13.9561 5.04394 14.3348 5.5 14.5981C6.19615 15 7.13077 15 9 15C10.8692 15 11.8038 15 12.5 14.5981C12.9561 14.3348 13.3348 13.9561 13.5981 13.5C14 12.8038 14 11.8692 14 10V8C14 6.13077 14 5.19615 13.5981 4.5C13.3348 4.04394 12.9561 3.66523 12.5 3.40192C11.8038 3 10.8692 3 9 3C7.13077 3 6.19615 3 5.5 3.40192C5.04394 3.66523 4.66523 4.04394 4.40192 4.5ZM7 6.5C7 6.22386 7.22386 6 7.5 6H10.5C10.7761 6 11 6.22386 11 6.5C11 6.77614 10.7761 7 10.5 7H7.5C7.22386 7 7 6.77614 7 6.5ZM7.5 8C7.22386 8 7 8.22386 7 8.5C7 8.77614 7.22386 9 7.5 9H8.5C8.77614 9 9 8.77614 9 8.5C9 8.22386 8.77614 8 8.5 8H7.5Z" fill="#000000"></path></svg>
                        </span>
                        <span>${article.title}</span>
                    </a>
                `;
                articleList.appendChild(articleLi);
                dispalyArticleContent(articleLi, article);
            });
            li.appendChild(articleList);
        }

        ul.appendChild(li);
    });

    return ul;
}

// Function to display category content (articles or nested subcategories)
function displayCategoryContent(category) {
    // Create a div to contain the category content
    const categoryContent = document.createElement('div');

    // Show the subcategory name:
    contentDiv.innerHTML = `<h1 class="">${category.name}</h1>`;

    // If there are articles in the category, show them
    if (category.articles && category.articles.length > 0) {
        categoryContent.className = "article-content";
        categoryContent.innerHTML += `<h2 class="h2">Articles</h2>`;
        const articleList = document.createElement('ul');
        articleList.className = "list-articles";
        category.articles.forEach(article => {
            const articleLi = document.createElement('li');
            articleLi.innerHTML = `<a href="#">
                <span class="icon icon-article">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 14V10C18 8.57473 17.9988 7.58104 17.9209 6.81505C17.8446 6.06578 17.7034 5.64604 17.4944 5.33329C17.2755 5.00572 16.9943 4.72447 16.6667 4.50559C16.354 4.29662 15.9342 4.15535 15.1849 4.07913C14.419 4.00121 13.4253 4 12 4C10.5747 4 9.58104 4.00121 8.81505 4.07913C8.06578 4.15535 7.64604 4.29662 7.33329 4.50559C7.00572 4.72447 6.72447 5.00572 6.50559 5.33329C6.29662 5.64604 6.15535 6.06578 6.07913 6.81505C6.00121 7.58104 6 8.57473 6 10V14C6 15.4253 6.00121 16.419 6.07913 17.1849C6.15535 17.9342 6.29662 18.354 6.50559 18.6667C6.72447 18.9943 7.00572 19.2755 7.33329 19.4944C7.64604 19.7034 8.06578 19.8446 8.81505 19.9209C9.58104 19.9988 10.5747 20 12 20C13.4253 20 14.419 19.9988 15.1849 19.9209C15.9342 19.8446 16.354 19.7034 16.6667 19.4944C16.9943 19.2755 17.2755 18.9943 17.4944 18.6667C17.7034 18.354 17.8446 17.9342 17.9209 17.1849C17.9988 16.419 18 15.4253 18 14ZM5.67412 4.77772C5 5.78661 5 7.19108 5 10V14C5 16.8089 5 18.2134 5.67412 19.2223C5.96596 19.659 6.34096 20.034 6.77772 20.3259C7.78661 21 9.19108 21 12 21C14.8089 21 16.2134 21 17.2223 20.3259C17.659 20.034 18.034 19.659 18.3259 19.2223C19 18.2134 19 16.8089 19 14V10C19 7.19108 19 5.78661 18.3259 4.77772C18.034 4.34096 17.659 3.96596 17.2223 3.67412C16.2134 3 14.8089 3 12 3C9.19108 3 7.78661 3 6.77772 3.67412C6.34096 3.96596 5.96596 4.34096 5.67412 4.77772Z" fill="#000000"></path><line x1="8.5" y1="6.5" x2="13.5" y2="6.5" stroke="#000000" stroke-linecap="round"></line><line x1="8.5" y1="9.5" x2="11.5" y2="9.5" stroke="#000000" stroke-linecap="round"></line></svg>
                </span>
                <span class="text">${article.title}</span>
                <span class="icon icon-link">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M17.2928932,13 L5,13 L5,12 L17.2928932,12 L13.1452179,7.86036606 C12.9499557,7.66510391 12.9499557,7.34852142 13.1452179,7.15325928 C13.34048,6.95799713 13.6570625,6.95799713 13.8523247,7.15325928 L19.2071068,12.5 L13.8523247,17.8553162 C13.6570625,18.0505783 13.34048,18.0505783 13.1452179,17.8553162 C12.9499557,17.660054 12.9499557,17.3434715 13.1452179,17.1482094 L17.2928932,13 Z"></path></svg>
                </span>
            </a>`;
            dispalyArticleContent(articleLi, article);
            articleList.appendChild(articleLi);
        });
        categoryContent.appendChild(articleList);
    }

    // If there are subcategories, create cards for each one (just show their names)
    if (category.subcategories && category.subcategories.length > 0) {
        categoryContent.className = "category-content";
        category.subcategories.forEach(subcategory => {
            const subcategoryCard = createSubcategoryCard(subcategory);
            categoryContent.appendChild(subcategoryCard);
        });
    }

    // Append the category content div to the content div
    contentDiv.appendChild(categoryContent);
}

// Function to create a subcategory card (just the name of the subcategory)
function createSubcategoryCard(subcategory) {
    const card = document.createElement('div');
    card.className = 'card';

    const cardHeader = document.createElement('h3');
    cardHeader.className = "card-header text-ellipsis";
    cardHeader.textContent = subcategory.name;
    card.appendChild(cardHeader);

    // If this subcategory has articles, display them
    if (subcategory.articles && subcategory.articles.length > 0) {
        const articleList = document.createElement('ul');
        articleList.className = "card-list";
        subcategory.articles.forEach(article => {
            const articleLi = document.createElement('li');
            articleLi.className = "card-list-item";
            // articleLi.innerHTML = `<a href="#">${article.title}</a>`;
            articleLi.innerHTML = `
                    <a>
                        <span class="icon">
                            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.9538 12.0996C12.999 11.6009 13 10.953 13 10V8C13 7.04698 12.999 6.39908 12.9538 5.90036C12.9099 5.41539 12.8305 5.17051 12.7321 5C12.5565 4.69596 12.304 4.44349 12 4.26795C11.8295 4.16951 11.5846 4.09011 11.0996 4.04616C10.6009 4.00096 9.95302 4 9 4C8.04698 4 7.39908 4.00096 6.90036 4.04616C6.41539 4.09011 6.17051 4.16951 6 4.26795C5.69596 4.44349 5.44349 4.69596 5.26795 5C5.16951 5.17051 5.09011 5.41539 5.04616 5.90036C5.00096 6.39908 5 7.04698 5 8V10C5 10.953 5.00096 11.6009 5.04616 12.0996C5.09011 12.5846 5.16951 12.8295 5.26795 13C5.44349 13.304 5.69596 13.5565 6 13.7321C6.17051 13.8305 6.41539 13.9099 6.90036 13.9538C7.39908 13.999 8.04698 14 9 14C9.95302 14 10.6009 13.999 11.0996 13.9538C11.5846 13.9099 11.8295 13.8305 12 13.7321C12.304 13.5565 12.5565 13.304 12.7321 13C12.8305 12.8295 12.9099 12.5846 12.9538 12.0996ZM4.40192 4.5C4 5.19615 4 6.13077 4 8V10C4 11.8692 4 12.8038 4.40192 13.5C4.66523 13.9561 5.04394 14.3348 5.5 14.5981C6.19615 15 7.13077 15 9 15C10.8692 15 11.8038 15 12.5 14.5981C12.9561 14.3348 13.3348 13.9561 13.5981 13.5C14 12.8038 14 11.8692 14 10V8C14 6.13077 14 5.19615 13.5981 4.5C13.3348 4.04394 12.9561 3.66523 12.5 3.40192C11.8038 3 10.8692 3 9 3C7.13077 3 6.19615 3 5.5 3.40192C5.04394 3.66523 4.66523 4.04394 4.40192 4.5ZM7 6.5C7 6.22386 7.22386 6 7.5 6H10.5C10.7761 6 11 6.22386 11 6.5C11 6.77614 10.7761 7 10.5 7H7.5C7.22386 7 7 6.77614 7 6.5ZM7.5 8C7.22386 8 7 8.22386 7 8.5C7 8.77614 7.22386 9 7.5 9H8.5C8.77614 9 9 8.77614 9 8.5C9 8.22386 8.77614 8 8.5 8H7.5Z" fill="#000000"></path></svg>
                        </span>
                        <span>${article.title}</span>
                    </a>
                `;
            articleList.appendChild(articleLi);

            dispalyArticleContent(articleLi, article);
        });
        card.appendChild(articleList);
    }

    // If this subcategory has further subcategories, just list their names (no recursion)
    if (subcategory.subcategories && subcategory.subcategories.length > 0) {
        const subcategoryList = document.createElement('ul');
        subcategoryList.className = "card-list";
        subcategory.subcategories.forEach(subSubcategory => {
            const subSubcategoryLi = document.createElement('li');
            subSubcategoryLi.className = "card-list-item";
            // subSubcategoryLi.textContent = subSubcategory.name;
            subSubcategoryLi.innerHTML = `
                <a href="#${subSubcategory.name.split(" ").join("-")}">
                    <span class="icon">
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 5.5C4.77614 5.5 5 5.72386 5 6V9C5 9.82843 5.67157 10.5 6.5 10.5H12.2929L9.96447 8.17157C9.7692 7.97631 9.7692 7.65973 9.96447 7.46447C10.1597 7.2692 10.4763 7.2692 10.6716 7.46447L13.8536 10.6464C14.0488 10.8417 14.0488 11.1583 13.8536 11.3536L10.6716 14.5355C10.4763 14.7308 10.1597 14.7308 9.96447 14.5355C9.7692 14.3403 9.7692 14.0237 9.96447 13.8284L12.2929 11.5H6.5C5.11929 11.5 4 10.3807 4 9V6C4 5.72386 4.22386 5.5 4.5 5.5Z" fill="currentcolor"></path></svg>
                    </span>
                    <span>${subSubcategory.name}</span>
                </a>
            `;
            subcategoryList.appendChild(subSubcategoryLi);
        });
        card.appendChild(subcategoryList);
    }

    return card;
}

const getData = async () => {
    const response = await fetch("search-index.json");
    const data = await response.json();
    const categories = data.subcategories;

    // Start traversal with the top-level categories and append it to the navbar:
    navbarElm.appendChild(traverseCategories(categories));

    // Display the First Categories:
    displayCategoryContent({name: "Help Center", subcategories: categories});
};

getData();

