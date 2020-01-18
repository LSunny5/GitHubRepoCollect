'use strict';

//GET request for Repos
function getRepos(handleName) {
    const setUrl = `https://api.github.com/users/${handleName}/repos`;
    let name = handleName;
    fetch(setUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(handleName => displayList(handleName, name))
        .catch(error => {
            $('.results').html(`<p class="error">Sorry, we have encountered an error...</p>
            <p class="error">${error}</p>`)
            $('.results').removeClass('hidden');
        });
}

//show the list
function displayList(userList, uName) {
    if (displayList.status == "error") {
        alert('Sorry there is an error, please try again...');
    } else {
        let infoDisplay =
            `<p> ${uName} has ${userList.length} repositories.</p>
            <p> Here is ${uName}\'s Repository List:  </p>
            <ul class="repoList"></ul>`;
        $('.results').append(infoDisplay);

        //print repos with name and link to repo URL
        for (let i = 0; i < userList.length; i++) {
            let repo =
                `<li><p class="repoName">${userList[i].name}
                <a href="${userList[i].html_url}" target='_blank'>${userList[i].html_url}</a></p>
                </li>`;
            $('.repoList').append(repo);
        }
        $('.results').removeClass('hidden');
    }
}

//starting the app, after user submits
function startApp() {
    $('form').submit(event => {
        event.preventDefault();

        //variable with handle name
        let userName = $('#handle').val();
        getRepos(userName);

        //clear results section
        $('.results').empty().addClass('hidden');
    });
}

//App ready and waiting for user to enter numbers
$(function () {
    console.log("App is ready, waiting for user...");
    startApp();
}); 