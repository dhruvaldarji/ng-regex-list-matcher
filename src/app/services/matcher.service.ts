import { Injectable } from '@angular/core';

import { Match } from '../interfaces/match.interface';

@Injectable()
export class MatcherService {
  getSources() {
    return [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten'
    ];
  }

  getDataset() {
    return [
      'one for all',
      'all for one',
      'all four one',
      'four all one',
      'two peas in a pod',
      'a tale of two cities',
      'three musketeers',
      'three little pigs',
      'five six seven',
      'eightnineten'
    ];
  }

  /**
   * This method is the primary focus on this example.
   * By using a regular expression which represents the set of all possible matches,
   * We are able to efficiently validate whether some piece of data matches a known source.
   * This approach helps avoid nested loops of n^2 complexity.
   */
  getMatches(sources: string[], dataset: string[]): Match[] {
    // Convert our source list into a `|` delimited regular expression.
    const sourceRegexp = new RegExp(
      sources.map(value => `^${value}`).join('|'),
      'i'
    );
    // Iterate over the data using a map and find our matches.
    // This can be futher optimized based on the needs of the implementation.
    // For example, if we only need unique matches, then we can use an object instead of a map and filter.
    // That would also reduce the complexity of this loop to `n`, instead of more.
    return (
      dataset
        .map(data => {
          const result = `${data}`.match(sourceRegexp);
          // We only need the first match, so we pop and then trim.
          const source = result && result.length ? result.pop().trim() : null;
          if (source) {
            // The extra logic which requires us to use a map and a filter,
            // is due to returning the source and the data here.
            return { source, data } as Match;
          }
          return null;
        })
        // Remove the data we don't want.
        .filter(data => !!data)
    );
  }
}
