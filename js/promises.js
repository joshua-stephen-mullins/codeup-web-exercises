'use strict';


function retrieveLastCommit(username) {
    return fetch(`https://api.github.com/users/${username}/events/public`, {headers: {'Authorization': githubToken}}).then((response) => {
        return response.json().then((data) => {
            let commit = data.filter(event => event.type === "PushEvent");
            console.log(commit[0].created_at)
        });
    });
}

console.log(retrieveLastCommit('joshua-stephen-mullins'))


function wait(milliseconds){
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
                if(!isNaN(parseInt(milliseconds))){
                    resolve(`You'll see this after ${milliseconds/1000} seconds.`);
                } else {
                    reject(`${milliseconds} is not a numeric value`)
                }
        }, milliseconds);
    })
}


wait(1000).then(() => console.log('You\'ll see this after 1 second'));
wait(3000).then(() => console.log('You\'ll see this after 3 seconds'));
wait('yoyo').then(() => console.log('You\'ll see this after 3 seconds'));
