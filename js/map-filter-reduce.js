'use strict';

const users = [
    {
        id: 1,
        name: 'ryan',
        email: 'ryan@codeup.com',
        languages: ['clojure', 'javascript'],
        yearsOfExperience: 5
    },
    {
        id: 2,
        name: 'luis',
        email: 'luis@codeup.com',
        languages: ['java', 'scala', 'php'],
        yearsOfExperience: 6
    },
    {
        id: 3,
        name: 'zach',
        email: 'zach@codeup.com',
        languages: ['javascript', 'bash'],
        yearsOfExperience: 7
    },
    {
        id: 4,
        name: 'fernando',
        email: 'fernando@codeup.com',
        languages: ['java', 'php', 'sql'],
        yearsOfExperience: 8
    },
    {
        id: 5,
        name: 'justin',
        email: 'justin@codeup.com',
        languages: ['html', 'css', 'javascript', 'php'],
        yearsOfExperience: 9
    }
];


let usersLanguageFilter = users.filter(function (user) {
    return user.languages.length >= 3;
})
console.log(usersLanguageFilter)

let emailAddresses = users.map(function (user) {
    return user.email;
})
console.log(emailAddresses)


function averageExperience(array) {
    let averageExperience = users.reduce(function (total, user) {
        return total + user.yearsOfExperience;
    }, 0);
    return averageExperience / users.length
}

let longestEmailAddress = emailAddresses.reduce((email1, email2) => {
    if (email1.length > email2.length) {
        return email1
    } else {
        return email2
    }
})

console.log(longestEmailAddress);

let instructors = users.reduce((beginning, user) => {
    if (user )
    return beginning + user.name + ', '
}, 'Your instructors are: ');
console.log(instructors);