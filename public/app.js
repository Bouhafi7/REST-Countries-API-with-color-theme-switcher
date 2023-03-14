let filteringMenu = document.querySelector('.filtering-menu');
let filteringMenuText = document.querySelector('.filtering-menu > p');
let menu = document.querySelector('.menu');
let menuLis = document.querySelectorAll('.menu li');
let overlay = document.querySelector('.overlay');
let cards = [];



filteringMenu.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuLis.forEach(li => {
        li.addEventListener('click', () => {
            filteringMenuText.innerText = li.innerText;
        });
    });
});


let countriesContainer = document.querySelector('main .container > div:last-child');
let detail = document.querySelector('.detail');
let counter = 0;
let url = 'data.json';

createElements();

async function createElements() {
    overlay.classList.add('active');
    let response = await fetch(url);
    let data = await response.json();
    try {
        let element;
        for (let i = 0; i < data.length; i++) {
            element = `<div data-country="${data[i].region}" data-details="${counter++}">
                                <img src="${data[i].flags.png}" alt="">
                                    <div class="content">
                                    <p class="country-name">${data[i].name}</p>
                                        <div class="info">
                                            <p>population: <span class="popuplation">${data[i].population}</span></p>
                                            <p>region: <span class="region">${data[i].region}</span></p>
                                            <p>capital: <span class="capital">${data[i].capital}</span></p>
                                            </div>
                                            </div>
                                            </div>`;
            cards.push(element);
            overlay.classList.remove('active');
        }
        countriesContainer.innerHTML = cards.join('');
        filterCountries();

        let elements = document.querySelectorAll('main .container > div:last-child > div');
        elements.forEach(el => {
            el.addEventListener('click', () => {
                detail.classList.add('active');
                countriesContainer.classList.add('hide');
                let dataCounter = el.dataset.details;
                let flag = data[dataCounter].flags.png;
                let countryName = data[dataCounter].name;
                let nativeName = data[dataCounter].nativeName;
                let population = data[dataCounter].population;
                let region = data[dataCounter].region;
                let subRegion = data[dataCounter].subregion;
                let capital = data[dataCounter].capital ? data[dataCounter].capital : 'no capital';
                let topLevelDomain = data[dataCounter].topLevelDomain;
                let currencies = data[dataCounter].currencies ? data[dataCounter].currencies[0].name : 'no curencies';
                let languages = data[dataCounter].languages[0].name;
                let bordersCountries = data[dataCounter].borders;
                countriesDetails(flag, countryName, nativeName, population, region, subRegion, capital, topLevelDomain, currencies, languages, bordersCountries, dataCounter);
            });
        });
    } catch (e) {
        console.log('error: ' + ' ' + e);
    }
}

let detailsContainer = document.querySelector('.details');

function countriesDetails(flag, countryName, nativeName, population, region, subRegion, capital, topLevelDomain, currencies, languages, bordersCountries) {
    let details = `<img src="${flag}" alt="">
                    <div>
                        <h3>${countryName}</h3>
                        <div class="detail-list">
                            <div>
                                <p>native name: <span>${nativeName}</span></p>
                                <p>population: <span>${population}</span></p>
                                <p>region: <span>${region}</span></p>
                                <p>sub region: <span>${subRegion}</span></p>
                                <p>capital: <span>${capital}</span></p>
                            </div>
                            <div>
                                <p>top level domain: <span>${topLevelDomain}</span></p>
                                <p>currencies: <span>${currencies}</span></p>
                                <p>languages: <span>${languages}</span></p>
                            </div>
                        </div>
                            <div>
                                <p class="border-countries">border countries :</p>
                            </div>
                    </div>`;
    
    setTimeout(() => {
        let borderHolder = document.querySelector('.detail-list+div > p');
        if (bordersCountries) {
            bordersCountries.forEach(borderCountry => {
                let bordersCountriesEl = document.createElement('span');
                bordersCountriesEl.innerHTML = borderCountry;
                borderHolder.appendChild(bordersCountriesEl);
            });
        } else {
            let bordersCountriesEl = document.createElement('span');
            bordersCountriesEl.innerHTML = 'no border countries';
            borderHolder.appendChild(bordersCountriesEl);
        }
    }, 10);

    detailsContainer.innerHTML = details;
}



let backBtn = document.querySelector('.back');

backBtn.addEventListener('click', () => {
    detail.classList.remove('active');
    countriesContainer.classList.remove('hide');
});



async function filterCountries() {
    let elements = document.querySelectorAll('main .container > div:last-child > div');
    menuLis.forEach(item => {
        elements.forEach(el => {
            item.addEventListener('click', () => {
                el.style.display = 'none';
                if (item.innerText.includes(el.children[1].children[1].children[1].children[0].innerText)) {
                    el.style.display = 'block';
                }
            });
        });
    });
}




let searchInput = document.querySelector('.search-input');
searchInput.addEventListener('keyup', () => {
    let elements = document.querySelectorAll('main .container > div:last-child > div');
    elements.forEach(el => {
        el.style.display = 'none';
        if (el.children[1].children[0].innerText.toLowerCase().includes(searchInput.value) ) {
            el.style.display = 'block';
        }
    });
});



let themeSwitcher = document.querySelector('.toggle-mode');

toggleMode();
function toggleMode() {
    themeSwitcher.addEventListener('click', () => {
        themeSwitcher.classList.toggle('active');
        themeSwitcher.classList.contains('active') ? document.body.parentElement.setAttribute('data-theme', 'dark') : document.body.parentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', JSON.stringify(themeSwitcher.classList.contains('active')));
    });
    
    if (JSON.parse(localStorage.getItem('theme'))) {
        themeSwitcher.classList.add('active');
        document.body.parentElement.setAttribute('data-theme', 'dark')
    } else {
        document.body.parentElement.removeAttribute('data-theme');
    }
}