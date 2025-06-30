let searchInp = document.querySelector(".searchInput input");


var arr = [];
function display(cityName) {
  let cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    if (!arr[i]) continue;

    let date = new Date(arr[i].date).toLocaleDateString("EG", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    let cartona = `
      <div class="title d-flex justify-content-between align-items-center w-100">
        <h3 class="h6"><span>${
          i === 0 ? "اليوم" : i === 1 ? "غدًا" : "بعد غد"
        }</span></h3>
        <h4 class="h6"><span>${date}</span></h4>
      </div>
      <div class="inner text-center">
        <h5 class="fw-bold"><span>${cityName}</span></h5>
        <h5 class="fw-bold temperature"><span>${
          arr[i].day.avgtemp_c
        }°C</span></h5>
        <img class="border-1 border-danger" src="${
          arr[i].day.condition.icon
        }" alt="${arr[i].day.condition.text}">
        <div class="clear text-primary"><span>${
          arr[i].day.condition.text
        }</span></div>
        <div class="icons d-flex justify-content-around align-items-center gap-4 w-50 mx-auto mt-3">
          <div class="d-flex align-items-center">
            <img src="./images/icon-umberella@2x.png" alt="Umbrella icon" width="24">
            ${
              i === 0
                ? `<span class="second">${arr[i].day.daily_chance_of_rain}%</span>`
                : `<span></span>`
            }
          </div>
          <div class="d-flex align-items-center">
            <img src="./images/icon-wind@2x.png" alt="Wind icon" width="24">
            ${
              i === 0
                ? `<span class="second">${arr[i].day.maxwind_kph} km/h</span>`
                : `<span></span>`
            }
          </div>
          <div class="d-flex align-items-center ">
            <img src="./images/icon-compass@2x.png" alt="Compass icon" width="24">
            ${
              i === 0
                ? `<span class="second">${arr[i].hour[12].wind_dir}</span>`
                : `<span></span>`
            }
          </div>
        </div>
      </div>
    `;

    cards[i].innerHTML = cartona;
  }
}




async function getcountry(country) {
  try {
    const res = await fetch(
       `https://api.weatherapi.com/v1/forecast.json?key=2f37f5ca374d466380213546252906&q=${country}&days=3&lang=en`
    );
    const data = await res.json();
    console.log(data);

    arr = data.forecast.forecastday; 
    await search(country);
    display(data.location.name);
  } catch (error) {
    let cards = document.querySelectorAll(".card");
    cards.forEach((c) => {
      c.innerHTML = `<p class="text-danger">حدث خطأ أثناء جلب البيانات</p>`;
    });
    console.error("حدث خطأ أثناء جلب البيانات:", error);
  }
}


async function search(country) {
  try {
    var res = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=2f37f5ca374d466380213546252906&q=${country}`
    );

  
    var data = await res.json();
    console.log(data)
    if (data.length > 0) {
      searchInp.value = data[0].name;
    }
  } catch (error) {
    console.error("خطأ في البحث:", error);
  }
}

searchInp.addEventListener("change", () => {
  let city = searchInp.value.trim();
  if (city) {
    getcountry(city);
  }
});



