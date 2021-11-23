function debouncer(func, delay) {
  let debounce;
  return function () {
    debounce && clearTimeout(debounce);
    debounce = setTimeout(() => func.call(this, "Hello"), delay);
  };
}

var btn = document.getElementById("query");
btn.addEventListener("input", debouncer(searchResults, 1000));

function searchResults(a) {
  console.log(a);
  return;
}

