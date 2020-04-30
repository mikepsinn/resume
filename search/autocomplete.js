// autoComplete.js on type event emitter
document.querySelector("#autoComplete").addEventListener("autoComplete", function(event) {
    console.log(event.detail);
});

var keyToSearch = [ // Array of Strings Required if src is Object, for search to point to desired keys
    'name',
];

//  Cache: true for static data src & false for dynamic data src "API" with queries
var cache = false;

var inputFieldId = "#search-toggle"

new autoComplete({
    data: {                              // Data src [Array, Function, Async] | (REQUIRED)
        src: async () => {
            // API key token
            const token = "this_is_the_API_token_number";
            // User search query
            const query = document.querySelector(inputFieldId).value;
            // Fetch External Data Source
            //const source = await fetch(`https://tarekraafat.github.io/autoComplete.js/demo/db/generic.json`);
            const source = await fetch(`https://app.quantimo.do/api/v1/variables?q=${query}`);
            // Format data into JSON
            const data = await source.json();
            // Return Fetched data
            return data;
        },
        key: keyToSearch,
        cache: cache
    },
    // query: {                               // Query Interceptor               | (Optional)
    //     manipulate: (query) => {
    //         return query.replace("pizza", "burger");
    //     }
    // },
    // sort: (a, b) => {                    // Sort rendered results ascendingly | (Optional)
    //     if (a.match < b.match) return -1;
    //     if (a.match > b.match) return 1;
    //     return 0;
    // },
    placeHolder: "Food & Drinks...",     // Place Holder text                 | (Optional)
    //selector: "#autoComplete",           // Input field selector              | (Optional)
    selector: inputFieldId,           // Input field selector              | (Optional)
    threshold: 1,                        // Min. Chars length to start Engine | (Optional)
    debounce: 300,                       // Post duration for engine to start | (Optional)
    searchEngine: "strict",              // Search Engine type/mode           | (Optional)
    resultsList: {                       // Rendered results list object      | (Optional)
        render: true,
        container: source => {
            source.setAttribute("id", "autoComplete_list");
        },
        destination: document.querySelector("#autoComplete_list"),
        position: "afterend",
        element: "ul"
    },
    maxResults: 5,                         // Max. number of rendered results | (Optional)
    highlight: true,                       // Highlight matching results      | (Optional)
    resultItem: {                          // Rendered result item            | (Optional)
        content: (data, source) => {
            //debugger
            console.log("data", data)
            console.log("source", source)
            source.innerHTML = '<img src="'+data.value.imageUrl+'"  alt="">'+data.match;
        },
        element: "li"
    },
    noResults: () => {                     // Action script on noResults      | (Optional)
        const result = document.createElement("li");
        result.setAttribute("class", "no_result");
        result.setAttribute("tabindex", "1");
        result.innerHTML = "No Results";
        document.querySelector("#autoComplete_list").appendChild(result);
    },
    onSelection: feedback => {             // Action script onSelection event | (Optional)
        console.log(feedback.selection.value.image_url);
    }
});
