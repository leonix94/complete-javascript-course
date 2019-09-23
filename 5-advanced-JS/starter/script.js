var Person = function(name, lastname, birthYear, job) {
    this.name = name;
    this.lastname = lastname;
    this.birthYear = birthYear;
    this.job = job;
}

Person.prototype.calculateAge = function() {
    console.log(2019 - this.birthYear)
};


var p1 = new Person('leo', 2003, 'studente');

p1.hasOwnProperty('lastname');

var personProto = {
    name: undefined,
    lastname: undefined
};

//create an obj with empty attributes
var p2 = Object.create(personProto)

var p3 = Object.create(personProto,
    {
        name: {value: 'Jane'},
        lastname: {value: 'sux'}
    });

//la variabile è solo un riferimento all'oggetto

function changeName(n,s) {
    n = 'lello';
    s.lastname = 'lollo';
}

var provaNome = 'nonCambia';

//le funzioni possono cambiare valori agli attibuti degli oggetti passati come argomento
changeName(provaNome, p3);

console.log(provaNome);
console.log(p3);

//le funzioni sono istanze di Objects e si comportano come tali, per questo salviamo funzioni in variabili
var years = [1990, 1965, 1937, 2005, 1998];

//si possono passare funzioni come argomenti ad altre funzioni
function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes
}

function calcAge(el) {
    return 2019 - el;
}

function isFullAge(el) {
    return el >= 18;
}

function maxHR(el) {
    return Math.round(206.9 - (0.67 * el))
}

var ages = arrayCalc(years, calcAge);
console.log(ages);

var legal = arrayCalc(ages, isFullAge);
console.log(legal);

var heartRates = arrayCalc(ages, maxHR);
console.log(heartRates);

//possiamo far ritornare una funzione ad un'altra funzione

function interviewQuestion(answ) {
    if (answ == 'rich') {
        return function(name) {
            console.log(name + ' is it your income greater than 35000 p/y?')
        }
    } else if (answ == 'middle') {
        return function(name) {
            console.log(name + ' is it your income between 26000 and 35000 p/y?')
        }
    } else {
        return function(name) {
            console.log(name + ' is it your income less than 26000 p/y?')
        }
    }
}

var recruiterQ = interviewQuestion('rich');

recruiterQ('John');

//si possono anche passare gli argomenti alla funzione restituita da quella chiamata per prima

interviewQuestion('middle')('Leo');

//IIFE Immediately Invoked Function Expression, non mi interessa diciarare var o salvare i risultati intermedi

(function (goodluck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodluck);
})(5);

//tra le parentesi non possono essere dichiarazioni, ma solo espressioni
//per chiamarla sono poi necessarie le parentesi finali
//le variabili create risulteranno inaccessibili dall'esterno, è utile solo per privacy

