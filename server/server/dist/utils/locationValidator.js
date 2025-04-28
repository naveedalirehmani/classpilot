"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class LocationValidator {
    constructor() {
        this.country_list = null; // Cache the country list
        this.cities_list = null; // Cache the country list
    }
    fetchCountriesOnce() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.country_list)
                return; // If data is already fetched, return
            try {
                const response = yield fetch('https://restcountries.com/v3.1/all');
                const data = yield response.json();
                // Map the country data to the required structure
                this.country_list = data.reduce((acc, country) => {
                    const countryName = country.name.common.toLowerCase();
                    const cityNames = country.capital || []; // Fallback to an empty array if no capital
                    acc[countryName] = cityNames;
                    return acc;
                }, {});
            }
            catch (error) {
                console.error('Error fetching countries:', error);
                throw new Error('Failed to fetch country list');
            }
        });
    }
    // Method to validate if the country exists (case-insensitive)
    validateCountry(country) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!country)
                return true; // Allow empty country value to be valid
            yield this.fetchCountriesOnce(); // Fetch country data if not already done
            const normalizedCountry = country.toLowerCase();
            return !!((_a = this.country_list) === null || _a === void 0 ? void 0 : _a[normalizedCountry]); // Check if the country exists in the list
        });
    }
    // Private method to fetch cities for a given country
    fetchCities(country) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.cities_list && this.cities_list[country])
                return; // If cities for this country are already fetched, return
            try {
                const response = yield fetch('https://countriesnow.space/api/v0.1/countries/cities', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ country })
                });
                const data = yield response.json();
                if (!data.error) {
                    if (!this.cities_list) {
                        this.cities_list = {};
                    }
                    this.cities_list[country] = data.data || [];
                }
                else {
                    throw new Error('Failed to retrieve cities');
                }
            }
            catch (error) {
                console.error('Error fetching cities:', error);
                throw new Error('Failed to fetch city list');
            }
        });
    }
    // Method to validate if the city exists in the specified country (case-insensitive)
    validateCityInCountry(country, city) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!country || !city)
                return false; // Country and city must be provided
            // Fetch cities for the given country if not already fetched
            yield this.fetchCities(country);
            const normalizedCity = city.toLowerCase();
            const cities = this.cities_list[country] || [];
            // Check if the city exists in the list
            return cities.some(c => c.toLowerCase() === normalizedCity);
        });
    }
}
exports.default = LocationValidator;
