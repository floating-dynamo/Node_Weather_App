const searchForm = document.getElementById("search-form");
const searchInput = document.querySelector("input");
const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchInput.value;

  message1.textContent = "Loading...";

  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message2.textContent = data.address;
        message1.textContent = data.forecast;
      }
    }); // response is a promise
  });
});
