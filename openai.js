(function(ext) {

// Initialize the OpenAI API
var apiKey = "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";
var endpoint = "https://api.openai.com/v1/engines/gpt-3/jobs";

var answer = "";

// Helper function to make API calls to OpenAI
function makeApiCall(data, callback) {
$.ajax({
url: endpoint,
type: "POST",
headers: {
"Authorization": "Bearer " + apiKey,
"Content-Type": "application/json"
},
data: JSON.stringify(data),
success: function(response) {
callback(response);
},
error: function(jqXHR, textStatus, errorThrown) {
console.error("OpenAI API error: " + textStatus);
console.error("Error: " + errorThrown);
}
});
}

// Scratch block to make API call to OpenAI
ext.ask_question = function(question, callback) {
var data = {
prompt: question,
max_tokens: 100,
temperature: 0.5
};
makeApiCall(data, function(response) {
// Process the API response here
answer = response.choices[0].text;
callback();
});
};

// Scratch block to return the answer
ext.answer = function() {
return answer;
};

// Register the Scratch blocks
var descriptor = {
blocks: [
['w', 'Ask GPT-3: %s', 'ask_question', 'What is the capital of France?'],
['r', 'GPT-3 answer', 'answer']
]
};

// Initialize the extension
ScratchExtensions.register('OpenAI API', descriptor, ext);

})({});
