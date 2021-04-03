let data = {
    name: "Thiago",
    avatar: "https://github.com/thiagobcoelho25.png",
    'monthly-budget': 3000,
    'hours-per-day': 5,
    'days-per-week': 5,
    'vacation-per-year': 4,
    'value-hour': 75
}

module.exports = {
    get(){
        return data
    },
    update(newData){
        data = newData;
    }
}