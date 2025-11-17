async function getCountryInfo(countryName) {
    const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    const res = await fetch(url);
    const data = await res.json();

    const country = data[0];

    return {
        flag: country.flags.png,
        currency: Object.keys(country.currencies)[0] // always correct
    };
}

async function convertCurrency() {
    let amount = document.getElementById("amount").value;
    let fromCountry = document.getElementById("fromCountry").value;
    let toCountry = document.getElementById("toCountry").value;

    if (!amount) {
        alert("Enter amount");
        return;
    }

    try {
        // Fetch both country info
        let fromData = await getCountryInfo(fromCountry);
        let toData = await getCountryInfo(toCountry);

        // show flags
        document.getElementById("fromFlag").src = fromData.flag;
        document.getElementById("fromFlag").classList.remove("hidden");

        document.getElementById("toFlag").src = toData.flag;
        document.getElementById("toFlag").classList.remove("hidden");

        // Fetch conversion rate
        const api = `https://open.er-api.com/v6/latest/${fromData.currency}`;
        const res = await fetch(api);
        const data = await res.json();

        const rate = data.rates[toData.currency];
        const result = (amount * rate).toFixed(2);

        document.getElementById("result").innerText = result;

    } catch (err) {
        alert("Error fetching country data or rates");
    }
}
