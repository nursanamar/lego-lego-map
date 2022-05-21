// import { foods, tenants } from "./menu"

export function getFoodsWithTenant(foods =[],tenants = []) {
    let result = []
    let memo = {};

    foods.forEach(food => {
        if(!food.name){
            return;
        }
        if (memo[food.tenantId]) {
            food.tenant = memo[food.tenantId]
        }else{
            let tenant = tenants.find(tenant => tenant.id === food.tenantId)
            food.tenant = tenant
            memo[tenant.id] = tenant
        }

        result.push(food)
    })

    return shuffle(result)
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array?page=1&tab=trending#tab-top
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }