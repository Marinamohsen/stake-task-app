import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
    standalone: true
})
export class SearchPipe implements PipeTransform {
    transform<T>(items: T[], searchText: string, key: keyof T): T[] {
        if (!items || !searchText) return [];
        const lowerSearch = searchText.toLowerCase();
        return items.filter(item =>
            String(item[key]).toLowerCase().includes(lowerSearch)
        );
    }

}


