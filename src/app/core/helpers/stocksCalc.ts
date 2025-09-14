// src/utils/stock.ts

import { ValueAccessor } from '@ionic/angular/common';
import { Stock, Company } from '../models/stock.model';


export function mapApiDataToStockArray(pricingArray: any[], detailsArray: any[]): Stock[] {
    const detailsMap = new Map<string, any>();
    detailsArray.forEach(detail => {
        detailsMap.set(detail.symbol, detail);
    });


    return pricingArray
        .map(pricingItem => {

            const detail = detailsMap.get(pricingItem.symbol);
            if (!detail) return null;

            const price = pricingItem.close;
            const change = ((pricingItem.close - pricingItem.open) / pricingItem.open) * 100;
            return {
                symbol: pricingItem.symbol,
                companyName: detail.fullName,
                price: price,
                change: parseFloat(change.toFixed(2)),
                shares: Math.round(detail.marketCap / price),
                type: detail.type,
                logo: detail.logo,
                volume: detail.volume,
                marketCap: detail.marketCap,
                close: pricingItem.close,
                open: pricingItem.open
            };
        })
        .filter(Boolean) as Stock[];
}


export function getTopVolumeCompanies(companies: Company[], count = 3): Company[] {
    return [...companies].sort((a, b) => b.volume - a.volume).slice(0, count);
}


export function getTrendingCompanies(companies: Stock[]): Stock[] {// make sure if hsould be Stock or Comapny??????
    return companies.filter(c => c.close > c.open);
}

function calculateAmount(price: number, shares: number): number {
    return price * shares;
}


//in component:

// import { getTopVolumeCompanies } from './utils/company-utils';

// this.topCompanies = getTopVolumeCompanies(this.companies);

//search - ionic - storage

///
// $3M → Probably refers to small market activity, like low volume in millions or a small “raise” in millions.

// $1.2B → Big number → could be market cap or total valuation of the company.

// $30 → Could be the stock price, e.g.,


////Prepare a fast lookup for details:

// Instead of searching through the details array for every pricing entry, create a “map” (or dictionary) where each company’s symbol points directly to its details. This makes it super quick to get a company’s details later.

// Combine pricing and details:

// Go through your pricing data and for each item, pull the corresponding company details from the map.

// For each company, calculate the difference between open and close price, and collect all the info you need (price, logo, company name, market cap, volume, etc.).

// Pick the top 3 by volume:

// Once you have the combined data, sort it by the volume field in descending order.

// Take only the first three entries from that sorted list—these are your top 3 trending companies.

// Display/use the data:

// Now you have just the top 3 companies with all the information you need, ready to display in your app.

////
// To Do:
// 1. Buy /add to holding( add func, map teh holding array from what bought)
// 2. top trending (logic)
// 3.TOP volum (logic/UI)
// 4. UI overall needs to implement spacing , fonts
// 5. refactor and take care of best practices (consider future changes)
// 6.handle IPad
// 7. Write comments