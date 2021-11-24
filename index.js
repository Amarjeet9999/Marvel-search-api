function debouncer(func, delay) {
  let debounce;
  return function () {
    debounce && clearTimeout(debounce);
    debounce = setTimeout(() => func.apply(this, arguments), delay);
  };
}

var btn = document.getElementById("query");
btn.addEventListener("input", debouncer(searchResults, 400));

async function searchResults() {
  try {
    await fetch(
      `https://superheroapi.com/api/115579674276732/search/${btn.value}`
    )
      .then((res) => res.json())
      .then((res) => {
        appendData(res.results);
      });
  } catch (err) {
    console.log("Error", err);
  }
}

const searchSuggestions = document.getElementById("searchSuggestions");

const appendData = (data) => {
  searchSuggestions.innerHTML = null;
  let searchDiv = document.getElementById("searchDiv");
  if (data) {
    searchDiv.style.borderRadius = "15px 15px 0 0";
  } else {
    searchDiv.style.borderRadius = "15px";
  }

  data &&
    data.forEach((el) => {
      let suggestions = document.createElement("div");
      suggestions.setAttribute("class", "suggestions");

      let first = document.createElement("div");
      let name = document.createElement("p");
      name.setAttribute("class", "name");
      name.innerHTML = el.name;
      first.append(name);
      let second = document.createElement("div");
      let gender = document.createElement("p");
      gender.setAttribute("class", "gender");
      gender.innerHTML = el.appearance.gender;
      second.append(gender);
      suggestions.append(first, second);
      suggestions.addEventListener("click", () => {
        localStorage.setItem("hero", JSON.stringify(el));
        window.location.href = "./detailsPage.html";
        btn.value = "";
      });
      searchSuggestions.append(suggestions);
    });
};
