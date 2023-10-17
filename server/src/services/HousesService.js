import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class HousesService {
    async getHouses() {
        const houses = await dbContext.Houses.find()
        return houses
    }

    async getHouseById(houseId) {
        const house = await dbContext.Houses.findById(houseId)

        if (!house) {
            throw new BadRequest(`${houseId} is not a valid ID fam`)
        }
        return house
    }

    async createHouse(houseData) {
        const house = await dbContext.Houses.create(houseData)
        return house
    }
    async destroyHouse(houseId, userId) {
        const houseToBeDestroyed = await this.getHouseById(houseId)

        if (houseToBeDestroyed.creatorId.toString() != userId) {
            throw new Forbidden("Not yours fam, get out of here.")
        }

        await houseToBeDestroyed.remove()
        return houseToBeDestroyed
    }
    async updateHouse(houseId, userId, houseData) {
        const houseUpdate = await this.getHouseById(houseId)

        if (houseUpdate.creatorId.toString() != userId) {
            throw new Forbidden("Not your house fam, get out")
        }
        houseUpdate.bathrooms = houseData.bathrooms || houseUpdate.bathrooms
        houseUpdate.bedrooms = houseData.bedrooms || houseUpdate.bedrooms
        houseUpdate.price = houseData.price != undefined ? houseData.price : houseUpdate.price


        await houseUpdate.save()
        return houseUpdate
    }
}

export const housesService = new HousesService()