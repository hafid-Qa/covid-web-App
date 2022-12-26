// *** Map display ***//
const KEY =
  "pk.eyJ1IjoiaGFmaWQxMDAiLCJhIjoiY2xidWk3MWRkMXA2ZzN3cGs0cDRlbnpzMSJ9.WFkGyQqKh7BglSV3jrSuzw";
const statsPage = document.querySelector("#stats-page");
const countriesList = document.querySelector("#countries-list");
const countryStatInfo = document.querySelector("#country-info");
const mapEl = document.querySelector("#map");

// ** Display map on load **  //
if (statsPage) {
  document.addEventListener("DOMContentLoaded", (event) => {
    displayMap();
  });
}

// ** Display map **  //

const displayMap = (coordinates) => {
  mapboxgl.accessToken = KEY;
  let mapOptions = {};
  if (coordinates === undefined || coordinates[0] === -74.01084309969329) {
    mapOptions = {
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [31.235726, 30.044388],
      zoom: 1,
    };
  } else {
    mapOptions = {
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: coordinates,
      zoom: 4,
    };
  }
  const map = new mapboxgl.Map(mapOptions);
  map.addControl(new mapboxgl.NavigationControl());
  if (coordinates != undefined) {
    if (coordinates[0] != -74.01084309969329) {
      new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    }
  }
};

//  ** fetch coordinates of selected country and display the map ** //
const fetchCoordinates = (country) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=${KEY}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const coordinates = data.features[0].geometry.coordinates;
      displayMap(coordinates);
    });
};

//  calculate the recovery rate
const CalculateRecoveryPercentage = (recoveredCases, totalCases) => {
  let recoveredCasesToNumber = parseInt(recoveredCases.replace(/,/g, ""));
  let totalCasesToNumber = parseInt(totalCases.replace(/,/g, ""));
  const recoveryPercentage = (
    (recoveredCasesToNumber / totalCasesToNumber) *
    100
  ).toFixed(2);
  if (recoveryPercentage === "NaN") {
    return { message: "Sorry Data is missing 😔", class: "warning" };
  } else {
    return { message: ` ${recoveryPercentage}%`, class: "success" };
  }
};

// update covid data as per the selected country and request for the coordinates from mapbox api

// ** display the country stats ** //
const displayStatistics = (data) => {
  const recoveryRate = CalculateRecoveryPercentage(
    data["Total Recovered_text"],
    data["Total Cases_text"]
  );
  countryStatInfo.innerHTML = "";
  let covidData = ` 
          <div class="text-center">
            <h3>${data.Country_text}</h3>
          </div>
          <div class="d-flex justify-content-between border align-items-center p-1 my-2 rounded">
            <p>Total Cases</p> <span>${data["Total Cases_text"]}</span>
          </div> 
          <div class="d-flex justify-content-between align-items-center p-1 border my-2 rounded">
            <p>Deaths</p> <span>${data["New Deaths_text"]}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center p-1 border my-2 rounded">
           <p>Recovered</p> <span>${data["Total Recovered_text"]}</span>
          </div><div class="d-flex justify-content-between align-items-center p-1 border my-2 rounded">
           <p>Active Cases</p><span>${data["New Cases_text"]}</span></div>
          <div class="d-flex justify-content-between align-items-center p-1 border my-2 rounded">
            <p>Last Updated</p><span>${data["Last Update"].split(" ")[0]}</span>
          </div>
          <div class="text-center p-2 bg-${
            recoveryRate.class
          } bg-gradient my-2 rounded badge bg-primary text-wrap">
            <h6> Recovery Rate </h6>
            <p class="mt-1 fs-3">${recoveryRate.message} </p>
          </div>
      `;
  countryStatInfo.insertAdjacentHTML("beforeend", covidData);
};

const fetchData = (country) => {
  const url = `https://covid-19.dataflowkit.com/v1/${country}`;
  fetchCoordinates(country);
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      displayStatistics(data);
    })
    .catch(() => {
      countryStatInfo.innerHTML = "";
      alert("Sorry something went wrong,Try again");
    });
};

// get the select country and fetch the statistics
const update = () => {
  let value = countriesList.options[countriesList.selectedIndex].value;
  fetchData(value);
};

///** form submission logic **///
// submitting the contact us form
const form = document.querySelector("form");
const messageDiv = document.getElementById("feedback-message");
const submitMessage = (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(form));
  const options = {
    method: form.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  sendEmail(options);
};
// display send feedback email notification

const displayMessage = (message) => {
  messageDiv.classList.add("alert", "alert-success");
  messageDiv.insertAdjacentHTML("afterbegin", `<p>${message}</p>`);
  setTimeout(() => {
    messageDiv.classList.remove("alert", "alert-success");
    messageDiv.innerHTML = "";
  }, 2000);
};

const sendEmail = (options) => {
  fetch("/api/send", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      form.reset();
      displayMessage(data.message);
    })
    .catch((error) => {
      displayMessage("Error: " + error.message);
    });
};
if (form) {
  form.addEventListener("submit", submitMessage);
}
