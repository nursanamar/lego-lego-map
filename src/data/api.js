
export async function getFoodsTenants() {
    return fetch("menuAndTenant.json").then(res => res.json())
}