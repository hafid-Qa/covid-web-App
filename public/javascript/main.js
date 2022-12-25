// Map display
const KEY =
  "pk.eyJ1IjoiaGFmaWQxMDAiLCJhIjoiY2xidWk3MWRkMXA2ZzN3cGs0cDRlbnpzMSJ9.WFkGyQqKh7BglSV3jrSuzw";

window.addEventListener("load", (event) => {
  displayMap([-74.01084309969329, 40.71074359563446]);
});
const displayMap = (coordinates) => {
  mapboxgl.accessToken = KEY;
  let mapOptions = {};
  if (coordinates[0] === -74.01084309969329) {
    mapOptions = {
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      // center: coordinates,
      zoom: 0,
    };
  } else {
    mapOptions = {
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: coordinates,
      zoom: 3,
    };
  }
  const map = new mapboxgl.Map(mapOptions);
  map.addControl(new mapboxgl.NavigationControl());
  if (coordinates[0] != -74.01084309969329) {
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
  }
};

//  fetch coordinates of selected country and display the map
const fetchCoordinates = (country) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=${KEY}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const coordinates = data.features[0].geometry.coordinates;
      displayMap(coordinates);
    });
};

// update covid data as per the selected country and request for the coordinates from mapbox api
const CalculateRecoveryPercentage = (recoveredCases, totalCases) => {
  let recoveredCasesToNumber = parseInt(recoveredCases.replace(/,/g, ""));
  let totalCasesToNumber = parseInt(totalCases.replace(/,/g, ""));

  const recoveryPercentage = (
    (recoveredCasesToNumber / totalCasesToNumber) *
    100
  ).toFixed(2);
  console.log(recoveredCasesToNumber, totalCasesToNumber);
  console.log(recoveryPercentage);
  if (recoveryPercentage === "NaN") {
    return { message: "Sorry Data is missing 😔", class: "warning" };
  } else {
    return { message: ` ${recoveryPercentage}%`, class: "success" };
  }
};
const fetchData = (country) => {
  const url = `https://covid-19.dataflowkit.com/v1/${country}`;
  const countryStatInfo = document.querySelector("#country-info");
  const mapEl = document.querySelector("#map");
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
            CalculateRecoveryPercentage(
              data["Total Recovered_text"],
              data["Total Cases_text"]
            ).class
          }  bg-gradient my-2 rounded badge bg-primary text-wrap">
            <h6> Recovery Percentage </h6>
            <p class="mt-1 fs-3">${
              CalculateRecoveryPercentage(
                data["Total Recovered_text"],
                data["Total Cases_text"]
              ).message
            } </p>
          </div>
      `;
      countryStatInfo.insertAdjacentHTML("beforeend", covidData);
    })
    .catch((error) => {
      console.log(error);
    });
};

// get the select country and fetch the statistics
const update = () => {
  const countriesList = document.querySelector("#countries-list");
  let value = countriesList.options[countriesList.selectedIndex].value;
  fetchData(value);
};

///////////////////////////////////////////////////////////////
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
      messageDiv.classList.add("alert", "alert-success");
      messageDiv.insertAdjacentHTML("afterbegin", `<p>${data.message}</p>`);
      setTimeout(() => {
        messageDiv.classList.remove("alert", "alert-success");
        messageDiv.innerHTML = "";
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
    });
};

form.addEventListener("submit", submitMessage);
